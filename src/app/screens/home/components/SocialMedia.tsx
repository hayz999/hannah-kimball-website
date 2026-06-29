import { Box, Button, Container, Divider, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { SiteSettings } from "@/lib/data";

export default function SocialMedia({ settings }: { settings: SiteSettings }) {
  return (
    <Box
      component="section"
      aria-labelledby="social-heading"
      className="section-pattern"
      sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#EDF4FD" }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          id="social-heading"
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: "primary.dark" }}
          className="animate-fade-in-up"
        >
          Connect
        </Typography>
        <Divider
          sx={{
            borderColor: "secondary.main",
            borderBottomWidth: 3,
            width: 56,
            mb: 4,
            mx: "auto",
          }}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5 }}
          className="animate-fade-in-up stagger-1"
        >
          Follow Hannah&apos;s musical journey across social media.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
          className="animate-fade-in-up stagger-2"
        >
          {[
            {
              href: settings.contactLinkedin,
              label: "LinkedIn",
              icon: <LinkedInIcon fontSize="large" />,
            },
            {
              href: settings.contactInstagram,
              label: "Instagram",
              icon: <InstagramIcon fontSize="large" />,
            },
            {
              href: `mailto:${settings.contactEmail}`,
              label: "Email",
              icon: <EmailIcon fontSize="large" />,
            },
          ].map(({ href, label, icon }) => (
            <Button
              key={label}
              component="a"
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              aria-label={`Connect on ${label}`}
              variant="outlined"
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
                py: 2.5,
                px: 3.5,
                minWidth: 120,
                borderColor: "primary.light",
                "&:hover": {
                  backgroundColor: "primary.main",
                  borderColor: "primary.main",
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                },
                transition: "all 0.2s",
              }}
            >
              {icon}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </Typography>
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
