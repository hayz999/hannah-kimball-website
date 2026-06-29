import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import PageBanner from '@/app/components/PageBanner';
import SongCard from '@/app/components/SongCard';
import { getCompositions } from '@/lib/data';

export const revalidate = 60;

export const metadata = {
  title: 'Compositions | Hannah Kimball',
};

export default async function CompositionsPage() {
  const songs = await getCompositions();

  return (
    <Box className="section-pattern">
      <PageBanner
        title="Compositions"
        subtitle="Original choral works available for licensing and purchase"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {songs.map((song, i) => (
            <SongCard
              key={song.id}
              title={song.title}
              description={song.description}
              voiceParts={song.voiceParts}
              pdfUrl={song.pdfUrl}
              href={`/compositions/${song.id}`}
              ariaLabel={`View composition: ${song.title}`}
              index={i}
            />
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
