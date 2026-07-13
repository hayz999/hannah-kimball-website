"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";

type Settings = Record<string, string>;
type TitleRow = { id: string; title: string };

const TEXT_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "about_heading", label: "About Page Heading" },
  { key: "about_body", label: "About Page Body", multiline: true },
  { key: "about_location", label: "Location" },
  { key: "about_specialties", label: "Specialties" },
  { key: "featured_video_url", label: "Featured Video URL (embed)" },
  { key: "featured_video_title", label: "Featured Video Title" },
  { key: "featured_video_description", label: "Featured Video Description" },
  { key: "contact_instagram", label: "Instagram URL" },
  { key: "contact_instagram_handle", label: "Instagram Handle" },
  { key: "contact_linkedin", label: "LinkedIn URL" },
  { key: "contact_email", label: "Email Address" },
];

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [compositions, setCompositions] = useState<TitleRow[]>([]);
  const [arrangements, setArrangements] = useState<TitleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/settings").then((r) => r.json()),
      fetch("/api/admin/compositions").then((r) => r.json()),
      fetch("/api/admin/arrangements").then((r) => r.json()),
    ]).then(([s, c, a]) => {
      setSettings(s);
      setCompositions(
        c.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          title: row.title as string,
        })),
      );
      setArrangements(
        a.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          title: row.title as string,
        })),
      );
      setLoading(false);
    });
  }, []);

  const setField =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSettings((s) => ({ ...s, [key]: e.target.value }));

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)",
          py: { xs: 5, md: 7 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: "white", fontWeight: 700 }}
          >
            Site Settings
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.75)", mt: 1 }}
          >
            Manage homepage content, featured video, and contact details
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {saved && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Settings saved successfully.
              </Alert>
            )}

            <Typography
              variant="overline"
              sx={{
                color: "secondary.dark",
                fontWeight: 700,
                letterSpacing: "0.1em",
                mb: 2,
              }}
            >
              About Page
            </Typography>
            {TEXT_FIELDS.slice(0, 4).map((f) => (
              <TextField
                key={f.key}
                label={f.label}
                value={settings[f.key] ?? ""}
                onChange={setField(f.key)}
                fullWidth
                multiline={f.multiline}
                rows={f.multiline ? 6 : undefined}
                size="small"
                sx={{ mb: 2.5 }}
              />
            ))}

            <Divider sx={{ my: 3 }} />
            <Typography
              variant="overline"
              sx={{
                color: "secondary.dark",
                fontWeight: 700,
                letterSpacing: "0.1em",
                mb: 2,
              }}
            >
              Featured Video
            </Typography>
            {TEXT_FIELDS.slice(4, 7).map((f) => (
              <TextField
                key={f.key}
                label={f.label}
                value={settings[f.key] ?? ""}
                onChange={setField(f.key)}
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
              />
            ))}

            <Divider sx={{ my: 3 }} />
            <Typography
              variant="overline"
              sx={{
                color: "secondary.dark",
                fontWeight: 700,
                letterSpacing: "0.1em",
                mb: 2,
              }}
            >
              Newest Works (Homepage)
            </Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
              <InputLabel id="newest-comp-label">Newest Composition</InputLabel>
              <Select
                labelId="newest-comp-label"
                label="Newest Composition"
                value={settings["newest_composition_id"] ?? ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    newest_composition_id: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {compositions.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
              <InputLabel id="newest-arr-label">Newest Arrangement</InputLabel>
              <Select
                labelId="newest-arr-label"
                label="Newest Arrangement"
                value={settings["newest_arrangement_id"] ?? ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    newest_arrangement_id: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {arrangements.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider sx={{ my: 3 }} />
            <Typography
              variant="overline"
              sx={{
                color: "secondary.dark",
                fontWeight: 700,
                letterSpacing: "0.1em",
                mb: 2,
              }}
            >
              Contact / Social
            </Typography>
            {TEXT_FIELDS.slice(7).map((f) => (
              <TextField
                key={f.key}
                label={f.label}
                value={settings[f.key] ?? ""}
                onChange={setField(f.key)}
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
              />
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{ fontWeight: 700, px: 4 }}
              >
                {saving ? "Saving…" : "Save Settings"}
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
