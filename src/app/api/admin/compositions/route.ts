import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

export async function GET() {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await db.execute('SELECT * FROM compositions ORDER BY rowid');

  return Response.json(result.rows);
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const id = crypto.randomUUID();

  await db.execute({
    sql: 'INSERT INTO compositions (id, title, description, lyrics, voice_parts, pdf_url, video_url, audio_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    args: [
      id,
      body.title ?? '',
      body.description ?? null,
      body.lyrics ?? null,
      body.voice_parts ? JSON.stringify(body.voice_parts) : null,
      body.pdf_url ?? null,
      body.video_url ?? null,
      body.audio_url ?? null,
    ],
  });
  
  return Response.json({ id }, { status: 201 });
}
