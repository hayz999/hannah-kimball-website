import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import headshot from "@/app/images/headshot.jpg";
import choralConducting from "@/app/images/choral-conducting.jpg";
import { getSiteSettings } from "@/lib/data";
import { Card, CardContent } from "@mui/material";

export const revalidate = 60;

export const metadata = {
  title: "About | Hannah Kimball",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <Box className="section-pattern">
      <PageHero
        image={choralConducting}
        alt="Hannah Kimball conducting a choir"
        title={settings.aboutHeading}
        subtitle="Composer · Choral Director · Educator · Singer"
        focalPoint="26% 15%"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "340px 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "flex-start",
          }}
        >
          <Box className="animate-fade-in-up">
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 12px 48px rgba(0,194,199,0.3)",
                aspectRatio: "3/4",
              }}
            >
              <Image
                src={headshot}
                alt="Hannah Kimball headshot"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 900px) 100vw, 340px"
              />
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 2.5,
                borderRadius: 2,
                backgroundColor: "#FFFF",
                borderLeft: "4px solid",
                borderColor: "secondary.main",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}
              >
                Based in
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {settings.aboutLocation}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}
              >
                Specialties
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {settings.aboutSpecialties}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}
              >
                Education
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {settings.aboutEducation}
              </Typography>
            </Box>
          </Box>

          <Box className="animate-fade-in-up stagger-2">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "primary.dark",
                backgroundColor: "background.default",
              }}
            >
              {settings.aboutHeading}
            </Typography>
            <Divider
              sx={{
                borderColor: "secondary.main",
                borderBottomWidth: 3,
                width: 56,
                mb: 4,
              }}
            />

            <Card
              elevation={1}
              className={`animate-fade-in-up stagger-1`}
              sx={{ overflow: "visible" }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {settings.aboutBody.split("\n\n").map((paragraph, i) => (
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
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
