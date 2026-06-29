import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  ariaLabel?: string;
}

export default function PageBanner({ title, subtitle, ariaLabel }: PageBannerProps) {
  return (
    <Box
      component="section"
      aria-label={ariaLabel ?? `${title} header`}
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
        sx={{ color: '#FFFFFF', fontWeight: 700, mb: subtitle ? 1.5 : 0 }}
        className="animate-fade-in-up"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          component="p"
          sx={{ color: '#FFFFFF', fontWeight: 400, maxWidth: 560, mx: 'auto' }}
          className="animate-fade-in-up stagger-2"
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
