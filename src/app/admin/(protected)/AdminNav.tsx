"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Compositions", href: "/admin/compositions" },
  { label: "Arrangements", href: "/admin/arrangements" },
  { label: "Events", href: "/admin/events" },
  { label: "Experience", href: "/admin/gigs" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Box
      component="nav"
      aria-label="Admin navigation"
      sx={{
        backgroundColor: "#1A0A3E",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        px: { xs: 2, md: 3 },
        py: 0.75,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        flexWrap: "wrap",
        minHeight: 44,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mr: 2 }}>
        <AdminPanelSettingsIcon sx={{ color: "#D97706", fontSize: 18 }} />
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: "0.65rem",
          }}
        >
          Admin
        </Typography>
      </Box>

      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Button
            key={item.href}
            component="a"
            href={item.href}
            size="small"
            sx={{
              color: active ? "#FFFFFF" : "rgba(255,255,255,0.55)",
              fontWeight: active ? 700 : 400,
              fontSize: "0.8rem",
              px: 1.5,
              py: 0.75,
              minWidth: 0,
              borderRadius: 0,
              borderBottom: "2px solid",
              borderColor: active ? "#D97706" : "transparent",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            {item.label}
          </Button>
        );
      })}

      <Box sx={{ flexGrow: 1 }} />

      <Button
        onClick={handleLogout}
        size="small"
        sx={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.75rem",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          "&:hover": {
            color: "white",
            borderColor: "rgba(255,255,255,0.4)",
            backgroundColor: "rgba(255,255,255,0.05)",
          },
        }}
      >
        Log out
      </Button>
    </Box>
  );
}
