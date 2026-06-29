import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import NavButton from '@/app/components/NavButton';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeScreenHeader from '@/app/components/HomeScreenHeader';
import {
  getUpcomingEvents,
  getComposition,
  getArrangement,
  getSiteSettings,
} from '@/lib/data';

export const revalidate = 60;

function formatEventDate(start: string, end: string): string {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  if (start === end) return s.toLocaleDateString('en-US', opts);
  const sameMY =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMY)
    return `${s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${e.getDate()}, ${e.getFullYear()}`;
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', opts)}`;
}

export default async function Home() {
  const [settings, upcomingEvents] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(),
  ]);

  const [newestComposition, newestArrangement] = await Promise.all([
    settings.newestCompositionId ? getComposition(settings.newestCompositionId) : null,
    settings.newestArrangementId ? getArrangement(settings.newestArrangementId) : null,
  ]);

  return (
    <Box>
      <HomeScreenHeader />

      {/* ── Upcoming Events ── */}
      <Box
        component="section"
        aria-labelledby="events-heading"
        className="section-pattern"
        sx={{ py: { xs: 7, md: 10 }, backgroundColor: '#FAFAFA' }}
      >
        <Container maxWidth="lg">
          <Typography
            id="events-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}
            className="animate-fade-in-up"
          >
            Upcoming Events
          </Typography>
          <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 5 }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {upcomingEvents.map((event, i) => {
              const cardContent = (
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {event.title}
                    </Typography>
                    {event.eventDetailsUrl && (
                      <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary', ml: 1, mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon fontSize="small" sx={{ color: 'primary.main' }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatEventDate(event.startDate, event.endDate)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ color: 'primary.main' }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {event.location}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              );
              return (
                <Card
                  key={event.id}
                  elevation={1}
                  className={`animate-fade-in-up stagger-${Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}`}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  {event.eventDetailsUrl ? (
                    <CardActionArea
                      component="a"
                      href={event.eventDetailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${event.title} — opens in new tab`}
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      {cardContent}
                    </CardActionArea>
                  ) : (
                    cardContent
                  )}
                </Card>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ── Newest Works ── */}
      <Box
        component="section"
        aria-labelledby="newest-heading"
        sx={{
          py: { xs: 7, md: 10 },
          background: 'linear-gradient(135deg, #3D1A6E 0%, #5B2D8E 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            id="newest-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, mb: 1, color: '#FFFFFF' }}
            className="animate-fade-in-up"
          >
            Newest Works
          </Typography>
          <Divider sx={{ borderColor: 'secondary.light', borderBottomWidth: 3, width: 56, mb: 5 }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
              gap: 3,
            }}
          >
            {newestComposition && (
              <Card
                elevation={0}
                className="animate-fade-in-up stagger-1"
                sx={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <CardActionArea
                  component="a"
                  href={`/compositions/${newestComposition.id}`}
                  aria-label={`View composition: ${newestComposition.title}`}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="overline"
                      sx={{ color: '#b3d7f9', fontWeight: 700, letterSpacing: '0.15em' }}
                    >
                      Latest Composition
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: 2,
                        height: 100,
                        borderRadius: 2,
                        backgroundColor: 'rgba(91,45,142,0.6)',
                      }}
                      aria-hidden="true"
                    >
                      <MusicNoteIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.5)' }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1 }}>
                      {newestComposition.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.75)', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {newestComposition.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {newestComposition.voiceParts.map((part) => (
                        <Chip
                          key={part}
                          label={part}
                          size="small"
                          sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', fontWeight: 600, border: '1px solid rgba(255,255,255,0.45)' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}

            {newestArrangement && (
              <Card
                elevation={0}
                className="animate-fade-in-up stagger-2"
                sx={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <CardActionArea
                  component="a"
                  href={`/arrangements/${newestArrangement.id}`}
                  aria-label={`View arrangement: ${newestArrangement.title}`}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="overline"
                      sx={{ color: '#b3d7f9', fontWeight: 700, letterSpacing: '0.15em' }}
                    >
                      Latest Arrangement
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: 2,
                        height: 100,
                        borderRadius: 2,
                        backgroundColor: 'rgba(91,45,142,0.6)',
                      }}
                      aria-hidden="true"
                    >
                      <MusicNoteIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.5)' }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1 }}>
                      {newestArrangement.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.75)', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {newestArrangement.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {newestArrangement.voiceParts.map((part) => (
                        <Chip
                          key={part}
                          label={part}
                          size="small"
                          sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', fontWeight: 600, border: '1px solid rgba(255,255,255,0.45)' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
            <NavButton
              href="/compositions"
              variant="outlined"
              size="large"
              aria-label="Browse all compositions"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white' } }}
            >
              All Compositions
            </NavButton>
            <NavButton
              href="/arrangements"
              variant="outlined"
              size="large"
              aria-label="Browse all arrangements"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white' } }}
            >
              All Arrangements
            </NavButton>
          </Box>
        </Container>
      </Box>

      {/* ── Featured Video ── */}
      <Box
        component="section"
        aria-labelledby="video-heading"
        className="section-pattern"
        sx={{ py: { xs: 7, md: 10 }, backgroundColor: '#FFFFFF' }}
      >
        <Container maxWidth="lg">
          <Typography
            id="video-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}
            className="animate-fade-in-up"
          >
            Featured Video
          </Typography>
          <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 3 }} />
          <Typography variant="h6" component="p" sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }} className="animate-fade-in-up stagger-1">
            {settings.featuredVideoTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }} className="animate-fade-in-up stagger-2">
            {settings.featuredVideoDescription}
          </Typography>
          <Box
            className="responsive-iframe-wrapper animate-fade-in-up stagger-3"
            sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 8px 40px rgba(42,123,196,0.2)' }}
          >
            <iframe
              src={settings.featuredVideoUrl}
              title={settings.featuredVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Container>
      </Box>

      {/* ── Social Media ── */}
      <Box
        component="section"
        aria-labelledby="social-heading"
        className="section-pattern"
        sx={{ py: { xs: 7, md: 10 }, backgroundColor: '#EDF4FD' }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            id="social-heading"
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}
            className="animate-fade-in-up"
          >
            Connect
          </Typography>
          <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 4, mx: 'auto' }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }} className="animate-fade-in-up stagger-1">
            Follow Hannah&apos;s musical journey across social media.
          </Typography>

          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}
            className="animate-fade-in-up stagger-2"
          >
            {[
              { href: settings.contactLinkedin, label: 'LinkedIn', icon: <LinkedInIcon fontSize="large" /> },
              { href: settings.contactInstagram, label: 'Instagram', icon: <InstagramIcon fontSize="large" /> },
              { href: `mailto:${settings.contactEmail}`, label: 'Email', icon: <EmailIcon fontSize="large" /> },
            ].map(({ href, label, icon }) => (
              <Button
                key={label}
                component="a"
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={`Connect on ${label}`}
                variant="outlined"
                color="primary"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  py: 2.5,
                  px: 3.5,
                  minWidth: 120,
                  borderColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    borderColor: 'primary.main',
                    color: 'white',
                    '& .MuiSvgIcon-root': { color: 'white' },
                  },
                  transition: 'all 0.2s',
                }}
              >
                {icon}
                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
