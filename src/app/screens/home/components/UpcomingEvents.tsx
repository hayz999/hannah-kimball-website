import {
  Box,
  CardContent,
  Container,
  Divider,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import type { Event } from "@/lib/data";

function formatEventDate(start: string, end: string): string {
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");
  const opts: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  if (start === end) return s.toLocaleDateString("en-US", opts);
  const sameMY =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMY)
    return `${s.toLocaleDateString("en-US", { month: "long", day: "numeric" })}–${e.getDate()}, ${e.getFullYear()}`;
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

export default function UpcomingEvents({
  upcomingEvents,
}: {
  upcomingEvents: Event[];
}) {
  return (
    <Box
      component="section"
      aria-labelledby="events-heading"
      className="section-pattern"
      sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#FAFAFA" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="events-heading"
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: "primary.dark" }}
          className="animate-fade-in-up"
        >
          Upcoming Events
        </Typography>
        <Divider
          sx={{
            borderColor: "secondary.main",
            borderBottomWidth: 3,
            width: 56,
            mb: 5,
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
            },
            gap: 3,
          }}
        >
          {upcomingEvents.map((event, i) => {
            const cardContent = (
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {event.title}
                  </Typography>
                  {event.eventDetailsUrl && (
                    <OpenInNewIcon
                      fontSize="small"
                      sx={{
                        color: "text.secondary",
                        ml: 1,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {event.description}
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EventIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                      aria-hidden="true"
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatEventDate(event.startDate, event.endDate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                      aria-hidden="true"
                    />
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
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {event.eventDetailsUrl ? (
                  <CardActionArea
                    component="a"
                    href={event.eventDetailsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${event.title} — opens in new tab`}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
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
  );
}
