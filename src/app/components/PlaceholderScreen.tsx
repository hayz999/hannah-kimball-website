import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type PlaceholderScreenProps = {
  title: string;
};

export default function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is coming soon.
        </Typography>
      </Box>
    </Container>
  );
}
