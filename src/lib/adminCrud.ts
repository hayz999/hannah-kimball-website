import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';
import { uploadFile, deleteBlobIfManaged } from '@/lib/blob';

type ColumnConfig = {
  column: string;
  field: string;
  default: string | null;
  json?: boolean;
  file?: boolean;
};

export type CrudConfig = {
  table: string;
  orderBy: string;
  columns: ColumnConfig[];
};

type Params = Promise<{ id: string }>;

function toArgs(body: Record<string, unknown>, columns: ColumnConfig[]): (string | null)[] {
  return columns.map(({ field, default: fallback, json }) => {
    const value = body[field];
    if (value == null) return fallback;
    return json ? JSON.stringify(value) : (value as string);
  });
}

async function parseFormBody(
  request: Request,
  columns: ColumnConfig[],
  existingRow?: Record<string, unknown> | null,
): Promise<{ body: Record<string, unknown>; filesToDelete: string[] }> {
  const formData = await request.formData();
  const body: Record<string, unknown> = {};
  const filesToDelete: string[] = [];

  for (const c of columns) {
    if (c.file) {
      const existingValue = existingRow?.[c.column] as string | null | undefined;
      const clear = formData.get(`${c.field}__clear`) === '1';
      const uploaded = formData.get(c.field);

      if (clear) {
        body[c.field] = null;
        if (existingValue) filesToDelete.push(existingValue);
      } else if (uploaded instanceof File && uploaded.size > 0) {
        body[c.field] = await uploadFile(uploaded, c.column);
        if (existingValue) filesToDelete.push(existingValue);
      } else {
        const kept = formData.get(`${c.field}__existing`);
        body[c.field] = typeof kept === 'string' && kept ? kept : null;
      }
      continue;
    }

    const raw = formData.get(c.field);
    const value = typeof raw === 'string' && raw ? raw : null;
    body[c.field] = c.json ? JSON.parse(value ?? 'null') : value;
  }

  return { body, filesToDelete };
}

const unauthorized = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
const invalidBody = () => Response.json({ error: 'Invalid form body' }, { status: 400 });

export function createCollectionRoutes({ table, orderBy, columns }: CrudConfig) {
  async function GET() {
    if (!(await requireAdmin())) return unauthorized();

    try {
      const result = await db.execute(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
      return Response.json(result.rows);
    } catch {
      return Response.json({ error: `Failed to load ${table}` }, { status: 500 });
    }
  }

  async function POST(request: Request) {
    if (!(await requireAdmin())) return unauthorized();

    const hasFiles = columns.some((c) => c.file);
    let body: Record<string, unknown>;
    try {
      body = hasFiles ? (await parseFormBody(request, columns)).body : await request.json();
    } catch {
      return invalidBody();
    }

    const id = crypto.randomUUID();
    const columnNames = columns.map((c) => c.column).join(', ');
    const placeholders = columns.map(() => '?').join(', ');

    try {
      await db.execute({
        sql: `INSERT INTO ${table} (id, ${columnNames}) VALUES (?, ${placeholders})`,
        args: [id, ...toArgs(body, columns)],
      });
      return Response.json({ id }, { status: 201 });
    } catch {
      return Response.json({ error: `Failed to create ${table} record` }, { status: 500 });
    }
  }

  return { GET, POST };
}

export function createItemRoutes({ table, columns }: CrudConfig) {
  async function PUT(request: Request, { params }: { params: Params }) {
    if (!(await requireAdmin())) return unauthorized();

    const { id } = await params;
    const hasFiles = columns.some((c) => c.file);

    let body: Record<string, unknown>;
    let filesToDelete: string[] = [];
    try {
      if (hasFiles) {
        const existing = await db.execute({ sql: `SELECT * FROM ${table} WHERE id=?`, args: [id] });
        const existingRow = existing.rows[0] as Record<string, unknown> | undefined;
        ({ body, filesToDelete } = await parseFormBody(request, columns, existingRow ?? null));
      } else {
        body = await request.json();
      }
    } catch {
      return invalidBody();
    }

    const setClause = columns.map((c) => `${c.column}=?`).join(', ');

    try {
      await db.execute({
        sql: `UPDATE ${table} SET ${setClause} WHERE id=?`,
        args: [...toArgs(body, columns), id],
      });
      await Promise.all(filesToDelete.map((url) => deleteBlobIfManaged(url)));
      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: `Failed to update ${table} record` }, { status: 500 });
    }
  }

  async function DELETE(_request: Request, { params }: { params: Params }) {
    if (!(await requireAdmin())) return unauthorized();

    const { id } = await params;
    const fileColumns = columns.filter((c) => c.file).map((c) => c.column);

    try {
      const existing = fileColumns.length
        ? await db.execute({ sql: `SELECT * FROM ${table} WHERE id=?`, args: [id] })
        : null;
      const row = existing?.rows[0] as Record<string, unknown> | undefined;

      await db.execute({ sql: `DELETE FROM ${table} WHERE id=?`, args: [id] });

      if (row) {
        await Promise.all(
          fileColumns.map((col) => deleteBlobIfManaged(row[col] as string | null)),
        );
      }
      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: `Failed to delete ${table} record` }, { status: 500 });
    }
  }

  return { PUT, DELETE };
}
