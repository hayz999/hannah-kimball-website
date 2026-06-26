import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import PageHero from '@/app/components/PageHero';
import aboutData from '@/app/data/about.json';
import headshot from '@/app/images/headshot.jpg';
import choralConducting from '@/app/images/choral-conducting.jpg';

export const metadata = {
  title: 'About | Hannah Kimball',
};

export default function AboutPage() {
  return (
    <Box>
      <PageHero
        image={choralConducting}
        alt="Hannah Kimball conducting a choir"
        title={aboutData.heading}
        subtitle="Composer · Choral Director · Educator"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '340px 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'flex-start',
          }}
        >
          {/* Headshot */}
          <Box className="animate-fade-in-up">
            <Box
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 12px 48px rgba(91,45,142,0.2)',
                aspectRatio: '3/4',
              }}
            >
              <Image
                src={headshot}
                alt="Hannah Kimball headshot"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 900px) 100vw, 340px"
              />
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 2.5,
                borderRadius: 2,
                backgroundColor: '#F3EEF9',
                borderLeft: '4px solid',
                borderColor: 'secondary.main',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 0.5 }}>
                Based in
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {aboutData.location}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 0.5 }}>
                Specialties
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {aboutData.specialties}
              </Typography>
            </Box>
          </Box>

          {/* Bio text */}
          <Box className="animate-fade-in-up stagger-2">
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, color: 'primary.dark', mb: 1.5 }}
            >
              {aboutData.heading}
            </Typography>
            <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 4 }} />

            {aboutData.body.split('\n\n').map((paragraph, i) => (
              <Typography
                key={i}
                variant="body1"
                sx={{ lineHeight: 1.85, color: 'text.primary', mb: 2.5, fontSize: '1.05rem' }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
