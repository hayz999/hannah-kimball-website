import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

interface SongCardProps {
  title: string;
  description: string | null;
  voiceParts: string[];
  pdfPath: string | null;
  href: string;
  ariaLabel: string;
  index: number;
  originalComposer?: string | null;
}

export default function SongCard({
  title,
  description,
  voiceParts,
  pdfPath,
  href,
  ariaLabel,
  index,
  originalComposer,
}: SongCardProps) {
  const stagger = Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5;

  return (
    <Card elevation={1} className={`animate-fade-in-up stagger-${stagger}`}>
      <CardActionArea component="a" href={href} aria-label={ariaLabel}>
        <CardContent
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3 },
            alignItems: "center",
            p: { xs: 2, sm: 3 },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: { xs: 72, sm: 96 },
              height: { xs: 90, sm: 120 },
              flexShrink: 0,
              borderRadius: 2,
              backgroundColor: "#FFF3D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #F5B700",
            }}
          >
            <MusicNoteIcon
              sx={{
                fontSize: { xs: 36, sm: 48 },
                color: "#00888C",
                opacity: 0.5,
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "primary.dark",
                mb: 0.75,
                fontSize: { xs: "1.1rem", sm: "1.4rem" },
              }}
            >
              {title}
            </Typography>
            {originalComposer && (
              <Typography
                variant="caption"
                sx={{
                  color: "secondary.dark",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.5,
                }}
              >
                Original by {originalComposer}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}
              role="list"
              aria-label="Voice parts"
            >
              {voiceParts.map((part) => (
                <Chip
                  key={part}
                  label={part}
                  size="small"
                  role="listitem"
                  sx={{
                    backgroundColor: "#B8F0F1",
                    color: "primary.dark",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
