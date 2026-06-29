'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import type { ContactInfo } from '@/lib/data';

export default function ContactClient({ contact }: { contact: ContactInfo }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSend = subject.trim().length > 0 && message.trim().length > 0;

  const handleSend = () => {
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        component="section"
        aria-label="Contact header"
        sx={{
          background: 'linear-gradient(135deg, #1d6db3 0%, #2a7bc4 100%)',
          py: { xs: 7, md: 10 },
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1.5 }}
          className="animate-fade-in-up"
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ color: '#FFFFFF', fontWeight: 400 }}
          className="animate-fade-in-up stagger-2"
        >
          Questions, commissions, licensing, or just to say hello
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 280px' },
            gap: { xs: 5, md: 8 },
            alignItems: 'flex-start',
          }}
        >
          {/* Contact form */}
          <Box component="section" aria-labelledby="form-heading" className="animate-fade-in-up">
            <Typography
              id="form-heading"
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, color: 'primary.dark', mb: 1 }}
            >
              Send a Message
            </Typography>
            <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 4 }} />

            {submitted ? (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: '#EDF4FD',
                  textAlign: 'center',
                  border: '1px solid #C5DEF9',
                }}
                role="alert"
                aria-live="polite"
              >
                <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', mb: 1 }}>
                  Your email app should have opened
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  If it didn&apos;t open automatically, you can email Hannah directly at{' '}
                  <Box component="a" href={`mailto:${contact.email}`} sx={{ color: 'primary.main', fontWeight: 600 }}>
                    {contact.email}
                  </Box>
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => { setSubmitted(false); setSubject(''); setMessage(''); }}
                >
                  Send Another Message
                </Button>
              </Box>
            ) : (
              <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                aria-label="Contact form"
                noValidate
              >
                <TextField
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  fullWidth
                  helperText="What is your message about?"
                />
                <TextField
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  multiline
                  rows={6}
                  fullWidth
                  helperText="Please be as detailed as you'd like."
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={!canSend}
                  startIcon={<EmailIcon />}
                  aria-label="Open email client to send message"
                  sx={{ alignSelf: 'flex-start', px: 4 }}
                >
                  Send Message
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Clicking &ldquo;Send Message&rdquo; will open your default email application.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Info sidebar */}
          <Box className="animate-fade-in-up stagger-2">
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', mb: 2 }}>
              Other Ways to Connect
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                component="a"
                href={`mailto:${contact.email}`}
                variant="outlined"
                fullWidth
                startIcon={<EmailIcon />}
                aria-label={`Email Hannah at ${contact.email}`}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                {contact.email}
              </Button>
              <Button
                component="a"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                startIcon={<LinkedInIcon />}
                aria-label="Connect on LinkedIn (opens in new tab)"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                LinkedIn
              </Button>
              <Button
                component="a"
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                startIcon={<InstagramIcon />}
                aria-label="Follow on Instagram (opens in new tab)"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                {contact.instagramHandle}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: '#EDF4FD',
                borderLeft: '4px solid',
                borderColor: 'secondary.main',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 1 }}>
                Response time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hannah typically responds within 2–3 business days. For time-sensitive inquiries, please indicate your event date in the subject line.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
