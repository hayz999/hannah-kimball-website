'use client'

import * as React from 'react';
import Link from 'next/link';
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

type NavPage = {
  label: string;
  href: string;
  ariaLabel: string;
};

const pages: NavPage[] = [
  { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
  { label: 'About', href: '/about', ariaLabel: 'Go to about page' },
  { label: 'Choral Directing', href: '/choral-directing', ariaLabel: 'Go to choral directing page' },
  { label: 'Compositions', href: '/compositions', ariaLabel: 'Go to compositions page' },
  { label: 'Arrangements', href: '/arrangements', ariaLabel: 'Go to arrangements page' },
  { label: 'Contact', href: '/contact', ariaLabel: 'Go to contact page' },
];

function AppNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#FF5C8D' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          {/* Mobile navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.href}
                  component={Link}
                  href={page.href}
                  onClick={handleCloseNavMenu}
                  aria-label={page.ariaLabel}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
                aria-label={page.ariaLabel}
                sx={{ my: 2, color: 'white', display: 'block' }}
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
export default AppNavBar;
