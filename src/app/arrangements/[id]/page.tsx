import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ContactModal from '@/app/components/ContactModal';
import NavButton from '@/app/components/NavButton';
import arrangementsData from '@/app/data/arrangements.json';

type Song = (typeof arrangementsData.songs)[number];

export async function generateStaticParams() {
  return arrangementsData.songs.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = arrangementsData.songs.find((s) => s.id === id);
  return { title: song ? `${song.title} | Arrangements | Hannah Kimball` : 'Arrangement Not Found' };
}

export default async function ArrangementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const song: Song | undefined = arrangementsData.songs.find((s) => s.id === id);

  if (!song) notFound();

  return (
    <Box>
      {/* Header bar */}
      <Box sx={{ background: 'linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)', py: { xs: 5, md: 7 }, px: 3 }}>
        <Container maxWidth="lg">
          <NavButton
            href="/arrangements"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, '&:hover': { color: 'white' } }}
            aria-label="Back to arrangements list"
          >
            All Arrangements
          </NavButton>
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
            className="animate-fade-in-up"
          >
            {song.title}
          </Typography>
          {'originalComposer' in song && (
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 2, fontStyle: 'italic' }}>
              Original by {song.originalComposer} · Arranged by Hannah Kimball
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="list" aria-label="Voice parts">
            {song.voiceParts.map((part) => (
              <Chip
                key={part}
                label={part}
                role="listitem"
                sx={{ backgroundColor: 'rgba(245,158,11,0.25)', color: '#F59E0B', fontWeight: 700, border: '1px solid rgba(245,158,11,0.45)' }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 380px' }, gap: { xs: 5, md: 6 }, alignItems: 'flex-start' }}>
          {/* Main content */}
          <Box>
            {/* Description */}
            <Box className="animate-fade-in-up" sx={{ mb: 5 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                About This Arrangement
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.85, fontSize: '1.05rem' }}>
                {song.description}
              </Typography>
            </Box>

            {/* Lyrics */}
            <Box className="animate-fade-in-up stagger-1" sx={{ mb: 5 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                Lyrics
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#F3EEF9',
                  borderLeft: '4px solid',
                  borderColor: 'secondary.main',
                  borderRadius: '0 8px 8px 0',
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    m: 0,
                    color: 'text.primary',
                  }}
                >
                  {song.lyrics}
                </Typography>
              </Box>
            </Box>

            {/* Embedded Video */}
            {song.videoUrl && (
              <Box className="animate-fade-in-up stagger-2" sx={{ mb: 5 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                  Video
                </Typography>
                <Box
                  className="responsive-iframe-wrapper"
                  sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 24px rgba(91,45,142,0.15)' }}
                  role="region"
                  aria-label={`Video: ${song.title}`}
                >
                  <iframe
                    src={song.videoUrl}
                    title={`${song.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}

            {/* Audio */}
            {song.audioUrl && (
              <Box className="animate-fade-in-up stagger-3" sx={{ mb: 5 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                  Audio Preview
                </Typography>
                <Box
                  component="audio"
                  controls
                  src={song.audioUrl}
                  sx={{ width: '100%', borderRadius: 1 }}
                  aria-label={`Audio preview of ${song.title}`}
                />
              </Box>
            )}

            {/* PDF Viewer */}
            {song.pdfUrl && (
              <Box className="animate-fade-in-up stagger-4" sx={{ mb: 5 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
                  Score Preview
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(91,45,142,0.1)',
                    height: { xs: 400, md: 600 },
                  }}
                  role="region"
                  aria-label={`Score preview for ${song.title}`}
                >
                  <Box
                    component="iframe"
                    src={song.pdfUrl}
                    title={`${song.title} score`}
                    sx={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          <Box className="animate-fade-in-up stagger-2">
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#FAFAFA',
                position: { md: 'sticky' },
                top: { md: 88 },
              }}
            >
              {/* Sheet music placeholder */}
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '8.5/11',
                  backgroundColor: '#F3EEF9',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mb: 3,
                  border: '1px solid #E2D9F3',
                }}
                aria-hidden="true"
              >
                <MusicNoteIcon sx={{ fontSize: 64, color: '#5B2D8E', opacity: 0.35 }} />
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
                  {song.pdfUrl ? 'Score available' : 'Score available upon purchase'}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', mb: 1.5 }}>
                Interested in performing this arrangement?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Contact Hannah to discuss licensing, performance materials, and pricing for your ensemble.
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <ContactModal songTitle={song.title} />

              <NavButton
                href="/contact"
                variant="text"
                fullWidth
                sx={{ mt: 1, color: 'text.secondary' }}
                aria-label="Go to general contact page"
              >
                General Enquiry
              </NavButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
