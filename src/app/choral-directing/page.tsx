import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PageHero from '@/app/components/PageHero';
import choralConductingImg from '@/app/images/choral-conducting.jpg';
import { getGigs } from '@/lib/data';

export const revalidate = 60;

export const metadata = {
  title: 'Choral Directing | Hannah Kimball',
};

function formatDateRange(start: string, end: string): string {
  const formatMonthYear = (dateStr: string) => {
    if (dateStr === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
}

export default async function ChoralDirectingPage() {
  const gigs = await getGigs();

  return (
    <Box className="section-pattern">
      <PageHero
        image={choralConductingImg}
        alt="Hannah Kimball conducting a choir"
        title="Choral Directing"
        subtitle="Building community and connection through music"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}
          className="animate-fade-in-up"
        >
          Conducting History
        </Typography>
        <Divider sx={{ borderColor: 'secondary.main', borderBottomWidth: 3, width: 56, mb: 5 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {gigs.map((gig, i) => (
            <Card
              key={gig.id}
              elevation={1}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}`}
              sx={{ overflow: 'visible' }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                    {gig.choirName}
                  </Typography>
                  <Chip
                    label={formatDateRange(gig.startDate, gig.endDate)}
                    size="small"
                    sx={{
                      backgroundColor: gig.endDate === 'present' ? 'secondary.light' : '#C5DEF9',
                      color: gig.endDate === 'present' ? 'white' : 'primary.dark',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  />
                </Box>

                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary', mb: gig.videoUrl ? 3 : 0 }}>
                  {gig.summary}
                </Typography>

                {gig.videoUrl && (
                  <Box
                    className="responsive-iframe-wrapper"
                    sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(42,123,196,0.18)' }}
                    role="region"
                    aria-label={`Video: ${gig.choirName}`}
                  >
                    <iframe
                      src={gig.videoUrl}
                      title={`${gig.choirName} performance video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
