"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/compositions");
      router.refresh();
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)",
        p: 3,
      }}
    >
      <Card
        elevation={8}
        sx={{ maxWidth: 420, width: "100%", borderRadius: 3 }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3.5,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#5B2D8E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LockOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 700, color: "primary.dark" }}
            >
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Hannah Kimball — Content Manager
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              fullWidth
            />
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              size="large"
              sx={{ mt: 1, py: 1.5, fontWeight: 700 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
