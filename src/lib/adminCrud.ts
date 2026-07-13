import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

type ColumnConfig = {
  column: string;
  field: string;
  default: string | null;
  json?: boolean;
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

const unauthorized = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
const invalidBody = () => Response.json({ error: 'Invalid JSON body' }, { status: 400 });

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

    let body: Record<string, unknown>;
    try {
      body = await request.json();
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

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return invalidBody();
    }

    const setClause = columns.map((c) => `${c.column}=?`).join(', ');

    try {
      await db.execute({
        sql: `UPDATE ${table} SET ${setClause} WHERE id=?`,
        args: [...toArgs(body, columns), id],
      });
      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: `Failed to update ${table} record` }, { status: 500 });
    }
  }

  async function DELETE(_request: Request, { params }: { params: Params }) {
    if (!(await requireAdmin())) return unauthorized();

    const { id } = await params;

    try {
      await db.execute({ sql: `DELETE FROM ${table} WHERE id=?`, args: [id] });
      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: `Failed to delete ${table} record` }, { status: 500 });
    }
  }

  return { PUT, DELETE };
}
