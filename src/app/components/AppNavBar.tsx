'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

type NavPage = {
  label: string;
  href: string;
  ariaLabel: string;
};

const pages: NavPage[] = [
  { label: 'About',            href: '/about',           ariaLabel: 'Go to about page' },
  { label: 'Choral Directing', href: '/choral-directing',ariaLabel: 'Go to choral directing page' },
  { label: 'Compositions',     href: '/compositions',    ariaLabel: 'Go to compositions page' },
  { label: 'Arrangements',     href: '/arrangements',    ariaLabel: 'Go to arrangements page' },
  { label: 'Contact',          href: '/contact',         ariaLabel: 'Go to contact page' },
];

export default function AppNavBar() {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <AppBar position="sticky" role="navigation" aria-label="Main navigation">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
          {/* Home tab — visible on all viewports */}
          <Box
            component={Link}
            href="/"
            aria-label="Home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              textDecoration: 'none',
              color: 'white',
              mr: { xs: 'auto', md: 4 },
            }}
          >
            <MusicNoteIcon fontSize="small" aria-hidden="true" />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            >
              Home
            </Typography>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: '#1d6db3',
                    color: 'white',
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
                  aria-current={isActive(page.href) ? 'page' : undefined}
                  sx={{
                    color: 'white',
                    fontWeight: isActive(page.href) ? 700 : 400,
                    borderLeft: isActive(page.href) ? '3px solid #5B2D8E' : '3px solid transparent',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 'auto' }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                component={Link}
                href={page.href}
                aria-label={page.ariaLabel}
                aria-current={isActive(page.href) ? 'page' : undefined}
                sx={{
                  color: 'white',
                  fontWeight: isActive(page.href) ? 700 : 400,
                  px: 1.5,
                  py: 1,
                  position: 'relative',
                  borderRadius: 1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive(page.href) ? '60%' : '0%',
                    height: '2px',
                    backgroundColor: '#5B2D8E',
                    transition: 'width 0.25s ease',
                    borderRadius: '1px',
                  },
                  '&:hover::after': { width: '60%' },
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
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
