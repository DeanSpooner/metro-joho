import Link from "next/link";
import { dummyLines } from "@/data/dummyLines";
import { dummyStations } from "@/data/dummyStations";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Box from "@/components/Box";

export default function LinePage({ params }: { params: { lineId: string } }) {
  const lineId = params.lineId as keyof typeof dummyLines;
  const line = dummyLines[lineId];

  if (!line) {
    return <div>Line not found</div>;
  }

  return (
    <>
      <Grid>
        <Box>
          <Typography role="h1">{line.name}</Typography>
        </Box>
      </Grid>
      <HorizontalEmblem color={line.color} text={line.initial} />
      <Page>
        <main>
          <Typography role="h2">Stations on this line:</Typography>
          <ul>
            {line.stations.map(stationRaw => {
              const stationId = stationRaw as keyof typeof dummyStations;
              const station = dummyStations[stationId];

              return (
                <li key={stationId}>
                  <Link href={`/lines/${lineId}/${stationId}`}>
                    {station.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>
      </Page>
    </>
  );
}
