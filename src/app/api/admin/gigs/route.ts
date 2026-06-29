import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

export async function GET() {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const result = await db.execute('SELECT * FROM gigs ORDER BY start_date DESC');
  return Response.json(result.rows);
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const id = crypto.randomUUID();
  await db.execute({
    sql: 'INSERT INTO gigs (id, choir_name, start_date, end_date, summary, video_url) VALUES (?, ?, ?, ?, ?, ?)',
    args: [
      id,
      body.choir_name ?? '',
      body.start_date ?? '',
      body.end_date ?? '',
      body.summary ?? null,
      body.video_url ?? null,
    ],
  });
  return Response.json({ id }, { status: 201 });
}
