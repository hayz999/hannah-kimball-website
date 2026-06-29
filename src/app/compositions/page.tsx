import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { getCompositions } from '@/lib/data';

export const revalidate = 60;

export const metadata = {
  title: 'Compositions | Hannah Kimball',
};

export default async function CompositionsPage() {
  const songs = await getCompositions();

  return (
    <Box className="section-pattern">
      <Box
        component="section"
        aria-label="Compositions header"
        sx={{
          background: 'linear-gradient(135deg, #1d6db3 0%, #2a7bc4 100%)',
          py: { xs: 7, md: 10 },
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1.5 }}
          className="animate-fade-in-up"
        >
          Compositions
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ color: '#FFFFFF', fontWeight: 400, maxWidth: 560, mx: 'auto' }}
          className="animate-fade-in-up stagger-2"
        >
          Original choral works available for licensing and purchase
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {songs.map((song, i) => (
            <Card
              key={song.id}
              elevation={1}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}`}
            >
              <CardActionArea
                component="a"
                href={`/compositions/${song.id}`}
                aria-label={`View composition: ${song.title}`}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    gap: { xs: 2, sm: 3 },
                    alignItems: 'center',
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: { xs: 72, sm: 96 },
                      height: { xs: 90, sm: 120 },
                      flexShrink: 0,
                      borderRadius: 2,
                      backgroundColor: '#EDF4FD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #C5DEF9',
                    }}
                  >
                    {song.pdfUrl ? (
                      <Box
                        component="iframe"
                        src={`${song.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1`}
                        title={`Preview of ${song.title}`}
                        sx={{ width: '100%', height: '100%', border: 'none', borderRadius: 1, pointerEvents: 'none' }}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    ) : (
                      <MusicNoteIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: '#2a7bc4', opacity: 0.5 }} />
                    )}
                  </Box>

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 700, color: 'primary.dark', mb: 0.75, fontSize: { xs: '1.1rem', sm: '1.4rem' } }}
                    >
                      {song.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {song.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }} role="list" aria-label="Voice parts">
                      {song.voiceParts.map((part) => (
                        <Chip
                          key={part}
                          label={part}
                          size="small"
                          role="listitem"
                          sx={{ backgroundColor: '#C5DEF9', color: 'primary.dark', fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Divider sx={{ my: 6 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Interested in performing one of these works?{' '}
            <Link href="/contact" style={{ color: '#1d6db3', fontWeight: 600 }}>
              Get in touch
            </Link>{' '}
            to discuss licensing and performance materials.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
