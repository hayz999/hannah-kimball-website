import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContactModal from "@/app/components/ContactModal";
import NavButton from "@/app/components/NavButton";
import ScorePreview from "@/app/components/ScorePreview";

interface SongDetailLayoutProps {
  song: {
    title: string;
    voiceParts: string[];
    description: string | null;
    lyrics: string | null;
    videoUrl: string | null;
    audioUrl: string | null;
    pdfPath: string | null;
    pdfPath2: string | null;
    pdfPath3: string | null;
    originalComposer?: string | null;
  };
  backHref: string;
  backLabel: string;
  aboutTitle: string;
  sidebarTitle: string;
  contactEmail: string;
}

export default function SongDetailLayout({
  song,
  backHref,
  backLabel,
  aboutTitle,
  sidebarTitle,
  contactEmail,
}: SongDetailLayoutProps) {
  const pdfPaths = [song.pdfPath, song.pdfPath2, song.pdfPath3].filter(
    (url): url is string => Boolean(url),
  );

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF3E8E 0%, #5B2D8E 100%)",
          py: { xs: 5, md: 7 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <NavButton
            href={backHref}
            startIcon={<ArrowBackIcon />}
            sx={{ color: "#FFFFFF", mb: 2, "&:hover": { color: "white" } }}
            aria-label={`Back to ${backLabel.toLowerCase()} list`}
          >
            {backLabel}
          </NavButton>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "#FFFFFF",
              fontWeight: 700,
              mb: song.originalComposer ? 1 : 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
            className="animate-fade-in-up"
          >
            {song.title}
          </Typography>
          {song.originalComposer && (
            <Typography
              variant="h6"
              sx={{ color: "#FFFFFF", mb: 2, fontStyle: "italic" }}
            >
              Original by {song.originalComposer} · Arranged by Hannah Kimball
            </Typography>
          )}
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
            role="list"
            aria-label="Voice parts"
          >
            {song.voiceParts.map((part) => (
              <Chip
                key={part}
                label={part}
                role="listitem"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 380px" },
            gap: { xs: 5, md: 6 },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Box className="animate-fade-in-up" sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 2 }}
              >
                {aboutTitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.85, fontSize: "1.05rem" }}
              >
                {song.description}
              </Typography>
            </Box>

            <Box className="animate-fade-in-up stagger-1" sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 2 }}
              >
                Lyrics
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#FFF3D6",
                  borderLeft: "4px solid",
                  borderColor: "secondary.main",
                  borderRadius: "0 8px 8px 0",
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "1rem",
                    lineHeight: 1.9,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    m: 0,
                    color: "text.primary",
                  }}
                >
                  {song.lyrics}
                </Typography>
              </Box>
            </Box>

            {pdfPaths.length > 0 && (
              <Box className="animate-fade-in-up stagger-4" sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 700, color: "primary.dark", mb: 2 }}
                >
                  Score Preview
                </Typography>
                <ScorePreview title={song.title} pdfPaths={pdfPaths} />
              </Box>
            )}

            {song.audioUrl && (
              <Box className="animate-fade-in-up stagger-3" sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 700, color: "primary.dark", mb: 2 }}
                >
                  Audio Preview
                </Typography>
                <Box
                  component="audio"
                  controls
                  src={song.audioUrl}
                  sx={{ width: "100%", borderRadius: 1 }}
                  aria-label={`Audio preview of ${song.title}`}
                />
              </Box>
            )}

            {song.videoUrl && (
              <Box className="animate-fade-in-up stagger-2" sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 700, color: "primary.dark", mb: 2 }}
                >
                  Video
                </Typography>
                <Box
                  className="responsive-iframe-wrapper"
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,194,199,0.25)",
                  }}
                  role="region"
                  aria-label={`Video: ${song.title}`}
                >
                  <iframe
                    src={song.videoUrl}
                    title={`${song.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box className="animate-fade-in-up stagger-2">
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "#FFFDF7",
                position: { md: "sticky" },
                top: { md: 88 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.dark", mb: 1.5 }}
              >
                {sidebarTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Contact Hannah to discuss licensing, performance materials, and
                pricing for your ensemble.
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <ContactModal
                songTitle={song.title}
                contactEmail={contactEmail}
              />

              <NavButton
                href="/contact"
                variant="text"
                fullWidth
                sx={{ mt: 1, color: "text.secondary" }}
                aria-label="Go to general contact page"
              >
                General Enquiry
              </NavButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
