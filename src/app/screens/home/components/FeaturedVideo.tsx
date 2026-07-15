import type { SiteSettings } from "@/lib/data";
import { Box, Container, Divider, Typography } from "@mui/material";

export default function FeaturedVideo({
  settings,
}: {
  settings: SiteSettings;
}) {
  return (
    <Box
      component="section"
      aria-labelledby="video-heading"
      className="section-pattern"
      sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#FFFFFF" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="video-heading"
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: "primary.dark" }}
          className="animate-fade-in-up"
        >
          Featured Video
        </Typography>
        <Divider
          sx={{
            borderColor: "secondary.main",
            borderBottomWidth: 3,
            width: 56,
            mb: 3,
          }}
        />
        <Typography
          variant="h6"
          component="p"
          sx={{ color: "text.primary", fontWeight: 700, mb: 0.5 }}
          className="animate-fade-in-up stagger-1"
        >
          {settings.featuredVideoTitle}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
          className="animate-fade-in-up stagger-2"
        >
          {settings.featuredVideoDescription}
        </Typography>
        <Box
          className="responsive-iframe-wrapper animate-fade-in-up stagger-3"
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,194,199,0.25)",
          }}
        >
          <iframe
            src={settings.featuredVideoUrl}
            title={settings.featuredVideoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Container>
    </Box>
  );
}
