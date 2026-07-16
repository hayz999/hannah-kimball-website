"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import MicIcon from "@mui/icons-material/Mic";
import { useCrudResource } from "../useCrudResource";

type Row = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  ticket_url: string | null;
};

type Form = {
  title: string;
  description: string;
  date: string;
  ticket_url: string;
};

const empty: Form = {
  title: "",
  description: "",
  date: "",
  ticket_url: "",
};

function toForm(row: Row): Form {
  return {
    title: row.title,
    description: row.description ?? "",
    date: row.date,
    ticket_url: row.ticket_url ?? "",
  };
}

function toBody(f: Form) {
  return {
    title: f.title,
    description: f.description || null,
    date: f.date,
    ticket_url: f.ticket_url || null,
  };
}

export default function VocalistAppearancesAdminPage() {
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
    startAdd,
    startEdit,
    saveAdd,
    saveEdit,
    confirmDelete,
  } = useCrudResource<Row, Form>({
    endpoint: "/api/admin/vocalist-appearances",
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
        label="Date *"
        type="date"
        value={form.date}
        onChange={set("date")}
        fullWidth
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Ticket / Event Link (optional)"
        value={form.ticket_url}
        onChange={set("ticket_url")}
        fullWidth
        size="small"
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
            Singing Appearances
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
            Add Appearance
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
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
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
                No singing appearances yet.
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
        <DialogTitle sx={{ fontWeight: 700 }}>Add Appearance</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveAdd}
            disabled={saving || !form.title || !form.date}
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
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Appearance</DialogTitle>
        <DialogContent>{formFields}</DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setEditItem(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            disabled={saving || !form.title || !form.date}
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
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Appearance?</DialogTitle>
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
