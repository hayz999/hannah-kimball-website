import AppNavBar from "@/app/components/AppNavBar";
import Image from "next/image";
import homeScreenHero from "@/app/images/home-screen-hero.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {

  return (
    <div>
      <AppNavBar />
      <Box>
        <Image src={homeScreenHero} alt="Home Image" style={{ aspectRatio: '3/2', width: '100%', height: '100%' }} />
        <Box sx={{ position: 'absolute', top: 50, backgroundColor: 'rgba(15, 126, 145, 0.5)', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ color: '#ffffff', textTransform: 'uppercase', fontWeight: 700, padding: 8 }} variant="h2">Hannah Kimball</Typography>
          <Typography sx={{ color: '#ffffff', textTransform: 'uppercase', fontWeight: 600, padding: 8, paddingTop: 0 }} variant="h5">Composer - Educator </Typography>
        </Box>
      </Box>
    </div>
  );
}
