"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type NavPage = {
  label: string;
  href: string;
  ariaLabel: string;
};

const pages: NavPage[] = [
  { label: "About", href: "/about", ariaLabel: "Go to about page" },
  {
    label: "Choral Directing",
    href: "/choral-directing",
    ariaLabel: "Go to choral directing page",
  },
  {
    label: "Vocalist",
    href: "/vocalist",
    ariaLabel: "Go to vocalist page",
  },
  {
    label: "Compositions",
    href: "/compositions",
    ariaLabel: "Go to compositions page",
  },
  {
    label: "Arrangements",
    href: "/arrangements",
    ariaLabel: "Go to arrangements page",
  },
  { label: "Contact", href: "/contact", ariaLabel: "Go to contact page" },
];

export default function AppNavBar() {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  if (pathname.startsWith("/admin")) return null;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AppBar
      position="sticky"
      role="navigation"
      aria-label="Main navigation"
      className="section-pattern"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
          {/* Home tab — visible on all viewports */}
          <Box
            component={Link}
            href="/"
            aria-label="Home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              textDecoration: "none",
              color: "#1A1A2E",
              backgroundColor: "#00C2C7",
              border: "2px solid #1A1A2E",
              borderRadius: "10px 3px 10px 3px",
              boxShadow: "2.5px 2.5px 0 #1A1A2E",
              px: 1.25,
              py: 0.25,
              mr: { xs: "auto", md: 4 },
            }}
          >
            <MusicNoteIcon fontSize="small" aria-hidden="true" />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              Home
            </Typography>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Open navigation menu"
              aria-controls="mobile-nav-menu"
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElNav)}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-nav-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#FFFDF7",
                    color: "#1A1A2E",
                    border: "2px solid #1A1A2E",
                    borderRadius: "4px 16px 4px 16px",
                    boxShadow: "4px 4px 0 #1A1A2E",
                    minWidth: 200,
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.href}
                  component={Link}
                  href={page.href}
                  onClick={handleCloseNavMenu}
                  aria-label={page.ariaLabel}
                  aria-current={isActive(page.href) ? "page" : undefined}
                  sx={{
                    color: "#1A1A2E",
                    fontWeight: isActive(page.href) ? 700 : 400,
                    borderLeft: isActive(page.href)
                      ? "3px solid #FF3E8E"
                      : "3px solid transparent",
                    "&:hover": { backgroundColor: "rgba(26,26,46,0.06)" },
                  }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop nav links */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: "auto" }}
          >
            {pages.map((page) => (
              <Button
                key={page.href}
                component={Link}
                href={page.href}
                aria-label={page.ariaLabel}
                aria-current={isActive(page.href) ? "page" : undefined}
                sx={{
                  color: "#1A1A2E",
                  fontWeight: isActive(page.href) ? 700 : 400,
                  px: 1.5,
                  py: 1,
                  position: "relative",
                  borderRadius: 1,
                  border: "none",
                  boxShadow: "none",
                  "&:active": { transform: "none", boxShadow: "none" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isActive(page.href) ? "60%" : "0%",
                    height: "3px",
                    backgroundColor: "#FF3E8E",
                    transition: "width 0.25s ease",
                    borderRadius: "1px",
                  },
                  "&:hover::after": { width: "60%" },
                  "&:hover": { backgroundColor: "rgba(26,26,46,0.06)" },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
