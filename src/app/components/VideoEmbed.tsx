import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { resolveVideoEmbed } from "@/lib/video";

interface VideoEmbedProps {
  url: string;
  title: string;
  ariaLabel?: string;
  boxShadow?: string;
  className?: string;
}

export default function VideoEmbed({
  url,
  title,
  ariaLabel,
  boxShadow = "0 4px 24px rgba(0,194,199,0.25)",
  className,
}: VideoEmbedProps) {
  const embed = resolveVideoEmbed(url);

  if (embed.kind === "link" || embed.kind === "purchase") {
    const label =
      embed.kind === "purchase" ? `Purchase on ${embed.host}` : `Watch on ${embed.host}`;
    return (
      <Button
        href={embed.src}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        color="secondary"
        endIcon={<OpenInNewIcon />}
        className={className}
        aria-label={ariaLabel ?? `${label} (opens in a new tab)`}
      >
        {label}
      </Button>
    );
  }

  return (
    <Box
      className={["responsive-iframe-wrapper", className].filter(Boolean).join(" ")}
      sx={{ borderRadius: 2, overflow: "hidden", boxShadow }}
      role="region"
      aria-label={ariaLabel ?? title}
    >
      {embed.kind === "file" ? (
        <Box component="video" controls src={embed.src} title={title} />
      ) : (
        <iframe
          src={embed.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </Box>
  );
}
