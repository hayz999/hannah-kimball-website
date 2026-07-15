import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function FileUploadField({
  label,
  accept,
  existingUrl,
  file,
  clear,
  onFileChange,
  onClearChange,
}: {
  label: string;
  accept: string;
  existingUrl: string;
  file: File | null;
  clear: boolean;
  onFileChange: (file: File | null) => void;
  onClearChange: (clear: boolean) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <Button
          component="label"
          variant="outlined"
          size="small"
          startIcon={<UploadFileIcon />}
        >
          {file ? "Change File" : "Choose File"}
          <input
            type="file"
            accept={accept}
            hidden
            onChange={(e) => {
              onFileChange(e.target.files?.[0] ?? null);
              onClearChange(false);
            }}
          />
        </Button>

        {file && (
          <>
            <Typography variant="body2">{file.name}</Typography>
            <Button size="small" onClick={() => onFileChange(null)}>
              Cancel
            </Button>
          </>
        )}

        {!file && existingUrl && (
          <>
            <Typography
              variant="body2"
              component="a"
              href={existingUrl}
              target="_blank"
              rel="noreferrer"
              sx={{
                color: clear ? "text.disabled" : "primary.main",
                textDecoration: clear ? "line-through" : "underline",
              }}
            >
              Current file
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={clear}
                  onChange={(e) => onClearChange(e.target.checked)}
                />
              }
              label="Remove"
            />
          </>
        )}

        {!file && !existingUrl && (
          <Typography variant="body2" color="text.secondary">
            No file uploaded
          </Typography>
        )}
      </Box>
    </Box>
  );
}
