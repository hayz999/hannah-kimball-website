"use client";
import { useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";

type Row = {
  id: string;
  choir_name: string;
  start_date: string;
  end_date: string;
  summary: string | null;
  video_url: string | null;
};

type Form = {
  choir_name: string;
  start_date: string;
  end_date: string;
  summary: string;
  video_url: string;
};

const empty: Form = {
  choir_name: "",
  start_date: "",
  end_date: "",
  summary: "",
  video_url: "",
};

function toForm(row: Row): Form {
  return {
    choir_name: row.choir_name,
    start_date: row.start_date,
    end_date: row.end_date,
    summary: row.summary ?? "",
    video_url: row.video_url ?? "",
  };
}

function toBody(f: Form) {
  return {
    choir_name: f.choir_name,
    start_date: f.start_date,
    end_date: f.end_date,
    summary: f.summary || null,
    video_url: f.video_url || null,
  };
}

export default function GigsAdminPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Row | null>(null);
  const [deleteItem, setDeleteItem] = useState<Row | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Form>(empty);

  const load = async () => {
    const r = await fetch("/api/admin/gigs");
    setItems(await r.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const set =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function saveAdd() {
    setSaving(true);
    await fetch("/api/admin/gigs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toBody(form)),
    });
    setSaving(false);
    setAdding(false);
    load();
  }

  async function saveEdit() {
    if (!editItem) return;
    setSaving(true);
    await fetch(`/api/admin/gigs/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toBody(form)),
    });
    setSaving(false);
    setEditItem(null);
    load();
  }

  async function confirmDelete() {
    if (!deleteItem) return;
    setSaving(true);
    await fetch(`/api/admin/gigs/${deleteItem.id}`, { method: "DELETE" });
    setSaving(false);
    setDeleteItem(null);
    load();
  }

  const formFields = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField
        label="Choir / Ensemble Name *"
        value={form.choir_name}
        onChange={set("choir_name")}
        fullWidth
        size="small"
      />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Start (YYYY-MM) *"
          value={form.start_date}
          onChange={set("start_date")}
          fullWidth
          size="small"
          placeholder="2024-09"
        />
        <TextField
          label='End (YYYY-MM or "present") *'
          value={form.end_date}
          onChange={set("end_date")}
          fullWidth
          size="small"
          placeholder="present"
        />
      </Box>
      <TextField
        label="Summary"
        value={form.summary}
        onChange={set("summary")}
        fullWidth
        multiline
        rows={4}
        size="small"
      />
      <TextField
        label="Video URL (embed URL)"
        value={form.video_url}
        onChange={set("video_url")}
        fullWidth
        size="small"
      />
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #1d6db3 0%, #2a7bc4 100%)",
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
            Conducting Gigs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setForm(empty);
              setAdding(true);
            }}
            sx={{
              backgroundColor: "white",
              color: "primary.dark",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Add Gig
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
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
                  <MicIcon
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
                      {item.choir_name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <Chip
                        label={`${item.start_date} – ${item.end_date}`}
                        size="small"
                        sx={{
                          backgroundColor:
                            item.end_date === "present"
                              ? "secondary.light"
                              : "#C5DEF9",
                          color:
                            item.end_date === "present"
                              ? "white"
                              : "primary.dark",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                    <IconButton
                      onClick={() => {
                        setForm(toForm(item));
                        setEditItem(item);
                      }}
                      aria-label={`Edit ${item.choir_name}`}
                      size="small"
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => setDeleteItem(item)}
                      aria-label={`Delete ${item.choir_name}`}
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
                No gigs yet.
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
        <DialogTitle sx={{ fontWeight: 700 }}>Add Gig</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveAdd}
            disabled={saving || !form.choir_name}
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
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Gig</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setEditItem(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            disabled={saving || !form.choir_name}
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
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Gig?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{deleteItem?.choir_name}</strong>? This cannot be undone.
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
