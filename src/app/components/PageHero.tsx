import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image, { StaticImageData } from 'next/image';

interface PageHeroProps {
  image: StaticImageData;
  alt: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ image, alt, title, subtitle }: PageHeroProps) {
  return (
    <Box
      component="section"
      sx={{ position: 'relative', width: '100%', height: { xs: 280, sm: 360, md: 440 }, overflow: 'hidden' }}
      aria-label={`${title} hero section`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        sizes="100vw"
      />
      {/* Dark purple gradient overlay */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(61,26,110,0.55) 0%, rgba(26,10,50,0.75) 100%)',
        }}
      />
      {/* Text content */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pb: { xs: 4, md: 6 },
          px: { xs: 3, md: 8 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            mb: subtitle ? 1 : 0,
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
          }}
          className="animate-fade-in-up"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 400,
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
            className="animate-fade-in-up stagger-2"
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
