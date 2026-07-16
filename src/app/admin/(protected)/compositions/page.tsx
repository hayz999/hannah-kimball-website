"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useCrudResource } from "../useCrudResource";
import FileUploadField from "../FileUploadField";

type Row = {
  id: string;
  title: string;
  description: string | null;
  lyrics: string | null;
  voice_parts: string | null;
  pdf_path: string | null;
  pdf_path_2: string | null;
  pdf_path_3: string | null;
  video_url: string | null;
  audio_url: string | null;
};

type Form = {
  title: string;
  description: string;
  lyrics: string;
  voice_parts: string;
  video_url: string;
  pdf_path: string;
  pdf_file: File | null;
  pdf_clear: boolean;
  pdf_path_2: string;
  pdf_file_2: File | null;
  pdf_clear_2: boolean;
  pdf_path_3: string;
  pdf_file_3: File | null;
  pdf_clear_3: boolean;
  audio_url: string;
  audio_file: File | null;
  audio_clear: boolean;
};

const empty: Form = {
  title: "",
  description: "",
  lyrics: "",
  voice_parts: "",
  video_url: "",
  pdf_path: "",
  pdf_file: null,
  pdf_clear: false,
  pdf_path_2: "",
  pdf_file_2: null,
  pdf_clear_2: false,
  pdf_path_3: "",
  pdf_file_3: null,
  pdf_clear_3: false,
  audio_url: "",
  audio_file: null,
  audio_clear: false,
};

function toForm(row: Row): Form {
  let vp: string[] = [];

  try {
    vp = JSON.parse(row.voice_parts ?? "[]");
  } catch {
    /* empty */
  }

  return {
    title: row.title,
    description: row.description ?? "",
    lyrics: row.lyrics ?? "",
    voice_parts: vp.join(", "),
    video_url: row.video_url ?? "",
    pdf_path: row.pdf_path ?? "",
    pdf_file: null,
    pdf_clear: false,
    pdf_path_2: row.pdf_path_2 ?? "",
    pdf_file_2: null,
    pdf_clear_2: false,
    pdf_path_3: row.pdf_path_3 ?? "",
    pdf_file_3: null,
    pdf_clear_3: false,
    audio_url: row.audio_url ?? "",
    audio_file: null,
    audio_clear: false,
  };
}

function appendFileField(
  fd: FormData,
  field: string,
  existingUrl: string,
  file: File | null,
  clear: boolean,
) {
  if (clear) {
    fd.set(`${field}__clear`, "1");
  } else if (file) {
    fd.set(field, file);
  } else if (existingUrl) {
    fd.set(`${field}__existing`, existingUrl);
  }
}

function toBody(f: Form): FormData {
  const fd = new FormData();
  fd.set("title", f.title);
  fd.set("description", f.description);
  fd.set("lyrics", f.lyrics);
  fd.set(
    "voice_parts",
    JSON.stringify(
      f.voice_parts
        ? f.voice_parts
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    ),
  );
  fd.set("video_url", f.video_url);
  appendFileField(fd, "pdf_path", f.pdf_path, f.pdf_file, f.pdf_clear);
  appendFileField(fd, "pdf_path_2", f.pdf_path_2, f.pdf_file_2, f.pdf_clear_2);
  appendFileField(fd, "pdf_path_3", f.pdf_path_3, f.pdf_file_3, f.pdf_clear_3);
  appendFileField(fd, "audio_url", f.audio_url, f.audio_file, f.audio_clear);
  return fd;
}

function voiceParts(row: Row): string[] {
  try {
    return JSON.parse(row.voice_parts ?? "[]");
  } catch {
    return [];
  }
}

export default function CompositionsAdminPage() {
  const {
    items,
    loading,
    error,
    saving,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    adding,
    setAdding,
    form,
    set,
    setForm,
    startAdd,
    startEdit,
    saveAdd,
    saveEdit,
    confirmDelete,
  } = useCrudResource<Row, Form>({
    endpoint: "/api/admin/compositions",
    emptyForm: empty,
    toForm,
    toBody,
  });

  const formFields = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField
        label="Title *"
        value={form.title}
        onChange={set("title")}
        fullWidth
        size="small"
      />
      <TextField
        label="Description"
        value={form.description}
        onChange={set("description")}
        fullWidth
        multiline
        rows={3}
        size="small"
      />
      <TextField
        label="Lyrics"
        value={form.lyrics}
        onChange={set("lyrics")}
        fullWidth
        multiline
        rows={4}
        size="small"
      />
      <TextField
        label="Voice Parts (comma-separated, e.g. SATB, SSA)"
        value={form.voice_parts}
        onChange={set("voice_parts")}
        fullWidth
        size="small"
      />
      <TextField
        label="Video URL"
        value={form.video_url}
        onChange={set("video_url")}
        fullWidth
        size="small"
      />
      <FileUploadField
        label="PDF (score)"
        accept="application/pdf"
        existingUrl={form.pdf_path}
        file={form.pdf_file}
        clear={form.pdf_clear}
        onFileChange={(file) => setForm((f) => ({ ...f, pdf_file: file }))}
        onClearChange={(clear) => setForm((f) => ({ ...f, pdf_clear: clear }))}
      />
      <FileUploadField
        label="PDF (additional #2, optional)"
        accept="application/pdf"
        existingUrl={form.pdf_path_2}
        file={form.pdf_file_2}
        clear={form.pdf_clear_2}
        onFileChange={(file) => setForm((f) => ({ ...f, pdf_file_2: file }))}
        onClearChange={(clear) => setForm((f) => ({ ...f, pdf_clear_2: clear }))}
      />
      <FileUploadField
        label="PDF (additional #3, optional)"
        accept="application/pdf"
        existingUrl={form.pdf_path_3}
        file={form.pdf_file_3}
        clear={form.pdf_clear_3}
        onFileChange={(file) => setForm((f) => ({ ...f, pdf_file_3: file }))}
        onClearChange={(clear) => setForm((f) => ({ ...f, pdf_clear_3: clear }))}
      />
      <FileUploadField
        label="Audio"
        accept="audio/*"
        existingUrl={form.audio_url}
        file={form.audio_file}
        clear={form.audio_clear}
        onFileChange={(file) => setForm((f) => ({ ...f, audio_file: file }))}
        onClearChange={(clear) => setForm((f) => ({ ...f, audio_clear: clear }))}
      />
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)",
          py: { xs: 5, md: 7 },
          px: 3,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: "white", fontWeight: 700 }}
          >
            Compositions
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={startAdd}
            sx={{
              backgroundColor: "white",
              color: "primary.dark",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Add Composition
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((item) => (
              <Card key={item.id} elevation={1}>
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    p: { xs: 2, sm: 2.5 },
                  }}
                >
                  <MusicNoteIcon
                    sx={{ color: "primary.light", fontSize: 28, flexShrink: 0 }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "primary.dark",
                        fontSize: { xs: "1rem", sm: "1.15rem" },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                      {voiceParts(item).map((p) => (
                        <Chip
                          key={p}
                          label={p}
                          size="small"
                          sx={{
                            backgroundColor: "#C5DEF9",
                            color: "primary.dark",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                    <IconButton
                      onClick={() => startEdit(item)}
                      aria-label={`Edit ${item.title}`}
                      size="small"
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => setDeleteItem(item)}
                      aria-label={`Delete ${item.title}`}
                      size="small"
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
            {items.length === 0 && (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 6 }}
              >
                No compositions yet.
              </Typography>
            )}
          </Box>
        )}
      </Container>

      <Dialog
        open={adding}
        onClose={() => setAdding(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add Composition</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveAdd}
            disabled={saving || !form.title}
          >
            {saving ? "Saving…" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!editItem}
        onClose={() => setEditItem(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Composition</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setEditItem(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            disabled={saving || !form.title}
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Composition?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteItem?.title}</strong>
            ? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDeleteItem(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            disabled={saving}
          >
            {saving ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
