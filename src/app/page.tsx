import Link from "next/link";
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

        <nav className="mt-6 space-x-4">
          <Link href="/lines" className="text-blue-600 hover:underline">
            View All Lines
          </Link>

          <Link href="/stations" className="text-blue-600 hover:underline">
            View All Stations
          </Link>
        </nav>
      </Box>
    </Grid>
  );
}
