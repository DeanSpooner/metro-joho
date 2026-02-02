import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Box from "@/components/Box";
import { getLastSegment } from "@/utils/utilities";
import Header from "@/components/Header";

export default async function LinePage({ params }: { params: Promise<{ lineId: string }> }) {
  const { lineId } = await params;
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = (lineResponse as any)[0];

  if (!line) {
    return <div>Line not found</div>;
  }

  return (
    <>
      <Grid>
        <Box>
          <Header />
        </Box>
        <Box>
          <Typography role="h1">{line["odpt:railwayTitle"].en}</Typography>
        </Box>
      </Grid>
      <HorizontalEmblem
        color={line["odpt:color"]}
        text={line["odpt:lineCode"]}
      />
      <Page>
        <main>
          <Typography role="h2">Stations on this line:</Typography>
          <ul>
            {line["odpt:stationOrder"].map((station: any) => (
              <li key={station["odpt:station"]}>
                <Link
                  href={`/lines/${getLastSegment(
                    line["owl:sameAs"]
                  )}/${getLastSegment(station["odpt:station"])}`}
                >
                  {station["odpt:stationTitle"]?.en || getLastSegment(station["odpt:station"])}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Page>
    </>
  );
}
