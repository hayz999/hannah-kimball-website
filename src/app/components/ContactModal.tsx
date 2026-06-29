'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ContactModalProps {
  songTitle: string;
  contactEmail: string;
}

export default function ContactModal({ songTitle, contactEmail }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(`Purchase Inquiry: ${songTitle}`);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<EmailIcon />}
        onClick={handleOpen}
        aria-label={`Contact Hannah to purchase ${songTitle}`}
        sx={{ mt: 2, width: '100%' }}
      >
        Contact to Purchase
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="purchase-dialog-title"
      >
        <DialogTitle id="purchase-dialog-title" sx={{ pr: 6 }}>
          Purchase Inquiry
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {songTitle}
          </Typography>
          <IconButton
            aria-label="Close dialog"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={5}
              fullWidth
              placeholder="Please include your ensemble name, size, performance date, and any other details…"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            variant="contained"
            color="secondary"
            disabled={!subject.trim()}
            startIcon={<EmailIcon />}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
