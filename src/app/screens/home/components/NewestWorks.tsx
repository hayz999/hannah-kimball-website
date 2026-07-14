import {
  Box,
  Container,
  Divider,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Chip,
} from "@mui/material";

import MusicNoteIcon from "@mui/icons-material/MusicNote";

import type { Composition, Arrangement } from "@/lib/data";

import NavButton from "@/app/components/NavButton";

export default function NewestWorks({
  newestComposition,
  newestArrangement,
}: {
  newestComposition: Composition | null;
  newestArrangement: Arrangement | null;
}) {
  return (
    <Box
      component="section"
      aria-labelledby="newest-heading"
      sx={{
        py: { xs: 7, md: 10 },
        background: "linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          id="newest-heading"
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: "#FFFFFF" }}
          className="animate-fade-in-up"
        >
          Newest Works
        </Typography>
        <Divider
          sx={{
            borderColor: "secondary.light",
            borderBottomWidth: 3,
            width: 56,
            mb: 5,
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
            gap: 3,
          }}
        >
          {newestComposition && (
            <Card
              elevation={0}
              className="animate-fade-in-up stagger-1"
              sx={{
                backgroundColor: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <CardActionArea
                component="a"
                href={`/compositions/${newestComposition.id}`}
                aria-label={`View composition: ${newestComposition.title}`}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#7FEFF1",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                    }}
                  >
                    Latest Composition
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      my: 2,
                      height: 100,
                      borderRadius: 2,
                      backgroundColor: "rgba(91,45,142,0.6)",
                    }}
                    aria-hidden="true"
                  >
                    <MusicNoteIcon
                      sx={{ fontSize: 56, color: "rgba(255,255,255,0.5)" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, color: "#FFFFFF", mb: 1 }}
                  >
                    {newestComposition.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {newestComposition.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {newestComposition.voiceParts.map((part) => (
                      <Chip
                        key={part}
                        label={part}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "#FFFFFF",
                          fontWeight: 600,
                          border: "1px solid rgba(255,255,255,0.45)",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          )}

          {newestArrangement && (
            <Card
              elevation={0}
              className="animate-fade-in-up stagger-2"
              sx={{
                backgroundColor: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <CardActionArea
                component="a"
                href={`/arrangements/${newestArrangement.id}`}
                aria-label={`View arrangement: ${newestArrangement.title}`}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#7FEFF1",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                    }}
                  >
                    Latest Arrangement
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      my: 2,
                      height: 100,
                      borderRadius: 2,
                      backgroundColor: "rgba(91,45,142,0.6)",
                    }}
                    aria-hidden="true"
                  >
                    <MusicNoteIcon
                      sx={{ fontSize: 56, color: "rgba(255,255,255,0.5)" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, color: "#FFFFFF", mb: 1 }}
                  >
                    {newestArrangement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {newestArrangement.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {newestArrangement.voiceParts.map((part) => (
                      <Chip
                        key={part}
                        label={part}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "#FFFFFF",
                          fontWeight: 600,
                          border: "1px solid rgba(255,255,255,0.45)",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
          <NavButton
            href="/compositions"
            variant="outlined"
            size="large"
            aria-label="Browse all compositions"
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": { borderColor: "white" },
            }}
          >
            All Compositions
          </NavButton>
          <NavButton
            href="/arrangements"
            variant="outlined"
            size="large"
            aria-label="Browse all arrangements"
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": { borderColor: "white" },
            }}
          >
            All Arrangements
          </NavButton>
        </Box>
      </Container>
    </Box>
  );
}
