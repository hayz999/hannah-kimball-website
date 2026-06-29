import { Box } from "@mui/material";

import HomeScreenHeader from "@/app/components/HomeScreenHeader";
import HomeScreen from "@/app/screens/home/page";

export const revalidate = 60;

export default async function Home() {
  return (
    <Box>
      <HomeScreenHeader />
      <HomeScreen />
    </Box>
  );
}
