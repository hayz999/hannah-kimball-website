import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

export async function GET() {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await db.execute('SELECT * FROM events ORDER BY start_date ASC');

  return Response.json(result.rows);
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO events (id, title, description, start_date, end_date, location, event_details_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    args: [
      id,
      body.title ?? '',
      body.description ?? null,
      body.start_date ?? '',
      body.end_date ?? '',
      body.location ?? null,
      body.event_details_url ?? null,
    ],
  });
  
  return Response.json({ id }, { status: 201 });
}
