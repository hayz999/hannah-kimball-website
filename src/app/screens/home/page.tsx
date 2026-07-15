import { Box } from "@mui/material";
import FeaturedWorks from "./components/FeaturedWorks";
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

  const [featuredComposition, featuredArrangement] = await Promise.all([
    settings.featuredCompositionId
      ? getComposition(settings.featuredCompositionId)
      : null,
    settings.featuredArrangementId
      ? getArrangement(settings.featuredArrangementId)
      : null,
  ]);

  return (
    <Box>
      <UpcomingEvents upcomingEvents={upcomingEvents} />
      <FeaturedWorks
        featuredComposition={featuredComposition}
        featuredArrangement={featuredArrangement}
      />
      <FeaturedVideo settings={settings} />
      <SocialMedia settings={settings} />
    </Box>
  );
}
