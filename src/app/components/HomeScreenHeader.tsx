'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import homeScreenHero from '@/app/images/home-screen-hero.jpg';

export default function HomeScreenHeader() {
  return (
    <Box
      component="section"
      aria-label="Hero section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 'calc(100svh - 56px)', md: 'calc(100svh - 64px)' },
        minHeight: 480,
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <Image
        src={homeScreenHero}
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, rgba(61,26,110,0.72) 0%, rgba(91,45,142,0.55) 50%, rgba(26,10,50,0.82) 100%)',
        }}
      />

      {/* Hero text */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem', lg: '6.5rem' },
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 24px rgba(0,0,0,0.4)',
            mb: 2,
          }}
          className="animate-fade-in-up"
        >
          Hannah
          <br />
          Kimball
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            fontSize: { xs: '1.05rem', sm: '1.3rem', md: '1.5rem' },
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: '0 2px 12px rgba(0,0,0,0.35)',
            mb: 4,
          }}
          className="animate-fade-in-up stagger-2"
        >
          Composer &nbsp;·&nbsp; Choral Director &nbsp;·&nbsp; Educator
        </Typography>

        <Box
          sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          className="animate-fade-in-up stagger-3"
        >
          <Button
            component={Link}
            href="/compositions"
            variant="contained"
            color="secondary"
            size="large"
            aria-label="View compositions"
            sx={{ px: 3 }}
          >
            Compositions
          </Button>
          <Button
            component={Link}
            href="/about"
            variant="outlined"
            size="large"
            aria-label="Learn about Hannah"
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.6)',
              '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.08)' },
            }}
          >
            About
          </Button>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          animation: 'fadeInUp 0.6s ease 1s both',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll
        </Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  );
}
