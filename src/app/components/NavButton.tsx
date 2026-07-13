'use client';

import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface NavButtonProps extends Omit<ButtonProps, 'href'> {
  href: string;
}

export default function NavButton({ href, children, ...props }: NavButtonProps) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
