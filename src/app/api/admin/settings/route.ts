import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

export async function GET() {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await db.execute('SELECT key, value FROM site_settings');
  const map: Record<string, string> = {};

  for (const row of result.rows) {
    map[row.key as string] = row.value as string;
  }

  return Response.json(map);
}

export async function PUT(request: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json() as Record<string, string>;

  for (const [key, value] of Object.entries(body)) {
    await db.execute({
      sql: 'INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',
      args: [key, value],
    });
  }
  
  return Response.json({ ok: true });
}
