"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface ScorePreviewProps {
  title: string;
  pdfPaths: string[];
}

function viewerSrc(url: string) {
  return `${url}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH`;
}

export default function ScorePreview({ title, pdfPaths }: ScorePreviewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (pdfPaths.length === 0) return null;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            pdfPaths.length > 1 ? { xs: "1fr", sm: "1fr 1fr" } : "1fr",
          gap: 2,
        }}
      >
        {pdfPaths.map((url, i) => (
          <Box
            key={url}
            component="button"
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Open full-screen preview of ${title} score${
              pdfPaths.length > 1 ? ` ${i + 1}` : ""
            }`}
            sx={{
              position: "relative",
              display: "block",
              width: "100%",
              p: 0,
              border: "none",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(0,194,199,0.2)",
              height: { xs: 400, md: 600 },
              backgroundColor: "#FFFFFF",
              "&:hover .score-preview-overlay": { opacity: 1 },
            }}
          >
            <Box
              component="iframe"
              src={viewerSrc(url)}
              title={`${title} score preview${pdfPaths.length > 1 ? ` ${i + 1}` : ""}`}
              tabIndex={-1}
              aria-hidden="true"
              sx={{
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
            />
            <Box
              className="score-preview-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                backgroundColor: "rgba(0,0,0,0.35)",
                color: "#FFFFFF",
                opacity: { xs: 1, md: 0 },
                transition: "opacity 0.2s ease",
              }}
            >
              <ZoomInIcon />
              <Typography variant="button" sx={{ fontWeight: 700 }}>
                Tap to view full screen
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        fullScreen
        aria-labelledby="score-dialog-title"
        slotProps={{
          paper: { sx: { display: "flex", flexDirection: "column" } },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Typography
            id="score-dialog-title"
            variant="subtitle1"
            sx={{ fontWeight: 700 }}
          >
            {title}
            {pdfPaths.length > 1 && activeIndex !== null
              ? ` — Score ${activeIndex + 1}`
              : " — Score"}
          </Typography>
          <IconButton
            aria-label="Close score preview"
            onClick={() => setActiveIndex(null)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          {activeIndex !== null && (
            <Box
              component="iframe"
              src={viewerSrc(pdfPaths[activeIndex])}
              title={`${title} score full view`}
              sx={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}
