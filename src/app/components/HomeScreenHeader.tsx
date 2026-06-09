import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import homeScreenHero from "@/app/images/home-screen-hero.jpg";
import Container from "@mui/material/Container";

export default function HomeScreenHeader() {
  return (
    <Box>
      <Image
        src={homeScreenHero}
        alt="Home Image"
        style={{ aspectRatio: "3/2", width: "100%", height: "100%" }}
      />

      <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
        <Box
          sx={{
            backgroundColor: "rgba(170, 44, 141, 0.5)",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            marginTop: "30%",
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              textTransform: "uppercase",
              fontWeight: 700,
              textAlign: "center",
              paddingTop: "8px",
              fontSize: "8vw",
            }}
          >
            Hannah Kimball
          </Typography>
          <Typography
            sx={{
              color: "#ffffff",
              textTransform: "uppercase",
              fontWeight: 600,
              paddingTop: "8px",
              paddingBottom: "8px",
              textAlign: "center",
              fontSize: "3vw",
            }}
          >
            Composer - Educator{" "}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ position: "absolute", top: "5%", padding: 0, width: "25vw", height: "25vh" }}>
       
      </Container>
    </Box>
  );
}
