import Box from "@/components/Box";
import Grid from "@/components/Grid";
import Typography from "@/components/Typography";

export default function Home() {
  return (
    <Grid>
      <Box>
        <Typography role="h1" className="col-span-12">
          東京メトロ情報へようこそ！
        </Typography>
      </Box>
    </Grid>
  );
}
