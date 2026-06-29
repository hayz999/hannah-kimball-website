import { Box } from "@mui/material";
import NewestWorks from "./components/NewestWorks";
import UpcomingEvents from "./components/UpcomingEvents";
import {
  getComposition,
  getArrangement,
  getSiteSettings,
  getUpcomingEvents,
} from "@/lib/data";
import FeaturedVideo from "./components/FeaturedVideo";
import SocialMedia from "./components/SocialMedia";

export default async function HomeScreen() {
  const [settings, upcomingEvents] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(),
  ]);

  const [newestComposition, newestArrangement] = await Promise.all([
    settings.newestCompositionId
      ? getComposition(settings.newestCompositionId)
      : null,
    settings.newestArrangementId
      ? getArrangement(settings.newestArrangementId)
      : null,
  ]);

  return (
    <Box>
      <UpcomingEvents upcomingEvents={upcomingEvents} />
      <NewestWorks
        newestComposition={newestComposition}
        newestArrangement={newestArrangement}
      />
      <FeaturedVideo settings={settings} />
      <SocialMedia settings={settings} />
    </Box>
  );
}
