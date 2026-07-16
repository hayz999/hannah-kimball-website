import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import PageBanner from "@/app/components/PageBanner";
import SongCard from "@/app/components/SongCard";
import { getArrangements } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Arrangements | Hannah Kimball",
};

export default async function ArrangementsPage() {
  const songs = await getArrangements();

  return (
    <Box className="section-pattern" sx={{ height: "100%" }}>
      <PageBanner
        title="Arrangements"
        subtitle="Thoughtfully crafted arrangements of beloved works for every choir"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {songs.map((song, i) => (
            <SongCard
              key={song.id}
              title={song.title}
              description={song.description}
              voiceParts={song.voiceParts}
              pdfPath={song.pdfPath}
              href={`/arrangements/${song.id}`}
              ariaLabel={`View arrangement: ${song.title}`}
              index={i}
              originalComposer={song.originalComposer}
            />
          ))}
        </Box>

        <Divider sx={{ my: 6 }} />
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Looking for a specific arrangement?{" "}
            <Link href="/contact" style={{ color: "#00888C", fontWeight: 600 }}>
              Contact Hannah
            </Link>{" "}
            to discuss custom arrangements for your ensemble.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
