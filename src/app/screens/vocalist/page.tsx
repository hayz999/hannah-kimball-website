import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EventIcon from "@mui/icons-material/Event";
import PageHero from "@/app/components/PageHero";
import NavButton from "@/app/components/NavButton";
import vocalistHeroImg from "@/app/images/vocalist.jpg";
import { getSiteSettings, getVocalistAppearances } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Vocalist | Hannah Kimball",
};

function formatAppearanceDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function VocalistPage() {
  const [settings, appearances] = await Promise.all([
    getSiteSettings(),
    getVocalistAppearances(),
  ]);

  return (
    <Box className="section-pattern">
      <PageHero
        image={vocalistHeroImg}
        alt="Hannah Kimball performing as a vocalist"
        title="Vocalist"
        subtitle="Vocal Contracting & Performance Services"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Card
          elevation={1}
          className="animate-fade-in-up"
          sx={{ overflow: "visible", mb: 6 }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {settings.vocalistDescription.split("\n\n").map((paragraph, i) => (
              <Typography
                key={i}
                variant="body1"
                sx={{
                  lineHeight: 1.85,
                  color: "text.primary",
                  mb: 2.5,
                  fontSize: "1.05rem",
                }}
              >
                {paragraph}
              </Typography>
            ))}

            {settings.vocalistVideoUrl && (
              <Box
                className="responsive-iframe-wrapper"
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,194,199,0.25)",
                  mb: 3,
                }}
                role="region"
                aria-label="Vocalist performance video"
              >
                <iframe
                  src={settings.vocalistVideoUrl}
                  title="Hannah Kimball vocal performance"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            )}

            <NavButton
              href="/contact"
              variant="contained"
              color="secondary"
              size="large"
              aria-label="Contact Hannah for vocalist bookings"
              sx={{ fontWeight: 700 }}
            >
              Contact for Bookings
            </NavButton>
          </CardContent>
        </Card>

        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "primary.dark",
            backgroundColor: "background.default",
          }}
          className="animate-fade-in-up"
        >
          Singing Appearances
        </Typography>
        <Divider
          sx={{
            borderColor: "secondary.main",
            borderBottomWidth: 3,
            width: 56,
            mb: 5,
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
            },
            gap: 3,
          }}
        >
          {appearances.map((appearance, i) => {
            const cardContent = (
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {appearance.title}
                  </Typography>
                  {appearance.ticketUrl && (
                    <OpenInNewIcon
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                        ml: 1,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {appearance.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EventIcon
                    fontSize="small"
                    sx={{ color: "primary.main" }}
                    aria-hidden="true"
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatAppearanceDate(appearance.date)}
                  </Typography>
                </Box>
              </CardContent>
            );
            return (
              <Card
                key={appearance.id}
                elevation={1}
                className={`animate-fade-in-up stagger-${Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {appearance.ticketUrl ? (
                  <CardActionArea
                    component="a"
                    href={appearance.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${appearance.title} — opens in new tab`}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    {cardContent}
                  </CardActionArea>
                ) : (
                  cardContent
                )}
              </Card>
            );
          })}
          {appearances.length === 0 && (
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", py: 6, gridColumn: "1 / -1" }}
            >
              No upcoming singing appearances.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
