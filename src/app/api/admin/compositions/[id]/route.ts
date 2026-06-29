import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  await db.execute({
    sql: 'UPDATE compositions SET title=?, description=?, lyrics=?, voice_parts=?, pdf_url=?, video_url=?, audio_url=? WHERE id=?',
    args: [
      body.title ?? '',
      body.description ?? null,
      body.lyrics ?? null,
      body.voice_parts ? JSON.stringify(body.voice_parts) : null,
      body.pdf_url ?? null,
      body.video_url ?? null,
      body.audio_url ?? null,
      id,
    ],
  });
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await db.execute({ sql: 'DELETE FROM compositions WHERE id=?', args: [id] });
  return Response.json({ ok: true });
}
