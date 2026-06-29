'use client';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

type Row = {
  id: string;
  title: string;
  original_composer: string | null;
  description: string | null;
  lyrics: string | null;
  voice_parts: string | null;
  pdf_url: string | null;
  video_url: string | null;
  audio_url: string | null;
};

type Form = {
  title: string;
  original_composer: string;
  description: string;
  lyrics: string;
  voice_parts: string;
  pdf_url: string;
  video_url: string;
  audio_url: string;
};

const empty: Form = { title: '', original_composer: '', description: '', lyrics: '', voice_parts: '', pdf_url: '', video_url: '', audio_url: '' };

function toForm(row: Row): Form {
  let vp: string[] = [];
  try { vp = JSON.parse(row.voice_parts ?? '[]'); } catch { /* empty */ }
  return {
    title: row.title,
    original_composer: row.original_composer ?? '',
    description: row.description ?? '',
    lyrics: row.lyrics ?? '',
    voice_parts: vp.join(', '),
    pdf_url: row.pdf_url ?? '',
    video_url: row.video_url ?? '',
    audio_url: row.audio_url ?? '',
  };
}

function toBody(f: Form) {
  return {
    title: f.title,
    original_composer: f.original_composer || null,
    description: f.description || null,
    lyrics: f.lyrics || null,
    voice_parts: f.voice_parts ? f.voice_parts.split(',').map(s => s.trim()).filter(Boolean) : [],
    pdf_url: f.pdf_url || null,
    video_url: f.video_url || null,
    audio_url: f.audio_url || null,
  };
}

function voiceParts(row: Row): string[] {
  try { return JSON.parse(row.voice_parts ?? '[]'); } catch { return []; }
}

export default function ArrangementsAdminPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Row | null>(null);
  const [deleteItem, setDeleteItem] = useState<Row | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Form>(empty);

  const load = async () => {
    const r = await fetch('/api/admin/arrangements');
    setItems(await r.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function saveAdd() {
    setSaving(true);
    await fetch('/api/admin/arrangements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(toBody(form)) });
    setSaving(false); setAdding(false); load();
  }

  async function saveEdit() {
    if (!editItem) return;
    setSaving(true);
    await fetch(`/api/admin/arrangements/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(toBody(form)) });
    setSaving(false); setEditItem(null); load();
  }

  async function confirmDelete() {
    if (!deleteItem) return;
    setSaving(true);
    await fetch(`/api/admin/arrangements/${deleteItem.id}`, { method: 'DELETE' });
    setSaving(false); setDeleteItem(null); load();
  }

  const formFields = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField label="Title *" value={form.title} onChange={set('title')} fullWidth size="small" />
      <TextField label="Original Composer" value={form.original_composer} onChange={set('original_composer')} fullWidth size="small" />
      <TextField label="Description" value={form.description} onChange={set('description')} fullWidth multiline rows={3} size="small" />
      <TextField label="Lyrics" value={form.lyrics} onChange={set('lyrics')} fullWidth multiline rows={4} size="small" />
      <TextField label="Voice Parts (comma-separated, e.g. SATB, SSA)" value={form.voice_parts} onChange={set('voice_parts')} fullWidth size="small" />
      <TextField label="PDF URL" value={form.pdf_url} onChange={set('pdf_url')} fullWidth size="small" />
      <TextField label="Video URL" value={form.video_url} onChange={set('video_url')} fullWidth size="small" />
      <TextField label="Audio URL" value={form.audio_url} onChange={set('audio_url')} fullWidth size="small" />
    </Box>
  );

  return (
    <Box className="section-pattern" sx={{ minHeight: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #1d6db3 0%, #2a7bc4 100%)', py: { xs: 5, md: 7 }, px: 3 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700 }}>Arrangements</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setForm(empty); setAdding(true); }}
            sx={{ backgroundColor: 'white', color: 'primary.dark', fontWeight: 700, '&:hover': { backgroundColor: '#f0f0f0' } }}>
            Add Arrangement
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map(item => (
              <Card key={item.id} elevation={1}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', p: { xs: 2, sm: 2.5 } }}>
                  <MusicNoteIcon sx={{ color: 'primary.light', fontSize: 28, flexShrink: 0 }} />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', fontSize: { xs: '1rem', sm: '1.15rem' } }}>
                      {item.title}
                    </Typography>
                    {item.original_composer && (
                      <Typography variant="caption" sx={{ color: 'secondary.dark', fontWeight: 600, display: 'block' }}>
                        Original by {item.original_composer}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary"
                      sx={{ mb: 1, mt: 0.25, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {voiceParts(item).map(p => (
                        <Chip key={p} label={p} size="small" sx={{ backgroundColor: '#C5DEF9', color: 'primary.dark', fontWeight: 600 }} />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                    <IconButton onClick={() => { setForm(toForm(item)); setEditItem(item); }} aria-label={`Edit ${item.title}`} size="small" sx={{ color: 'primary.main' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setDeleteItem(item)} aria-label={`Delete ${item.title}`} size="small" sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
            {items.length === 0 && (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>No arrangements yet.</Typography>
            )}
          </Box>
        )}
      </Container>

      <Dialog open={adding} onClose={() => setAdding(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add Arrangement</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveAdd} disabled={saving || !form.title}>
            {saving ? 'Saving…' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editItem} onClose={() => setEditItem(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Arrangement</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setEditItem(null)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit} disabled={saving || !form.title}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Arrangement?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteItem?.title}</strong>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDeleteItem(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete} disabled={saving}>
            {saving ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
