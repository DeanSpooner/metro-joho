import Link from "next/link";
import { lines } from "@/data/lines";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Box from "@/components/Box";
import { getLastSegment } from "@/utils/utilities";

export default function LinePage({ params }: { params: { lineId: string } }) {
  const line = lines.find(
    line => getLastSegment(line["owl:sameAs"]) === params.lineId
  );

  if (!line) {
    return <div>Line not found</div>;
  }

  return (
    <>
      <Grid>
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
            {line["odpt:stationOrder"].map(station => (
              <li key={station["odpt:station"]}>
                <Link
                  href={`/lines/${getLastSegment(
                    line["owl:sameAs"]
                  )}/${getLastSegment(station["odpt:station"])}`}
                >
                  {station["odpt:stationTitle"].en}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Page>
    </>
  );
}
