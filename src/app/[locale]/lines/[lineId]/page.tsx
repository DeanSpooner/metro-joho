import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Box from "@/components/Box";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import Header from "@/components/Header";
import { getDictionary, Locale } from "@/i18n/config";

export default async function LinePage({ params }: { params: Promise<{ locale: Locale; lineId: string }> }) {
  const { locale, lineId } = await params;
  const dict = await getDictionary(locale);
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = lineResponse[0];

  if (!line) {
    return <div>{dict.errors.lineNotFound}</div>;
  }

  return (
    <>
      <Grid>
        <Box>
          <Header locale={locale} dict={dict} />
        </Box>
        <Box>
          <Typography role="h1">{getLocalizedTitle(line["odpt:railwayTitle"], locale)}</Typography>
        </Box>
      </Grid>
      <HorizontalEmblem
        color={line["odpt:color"]}
        text={line["odpt:lineCode"]}
      />
      <Page>
        <main>
          <Typography role="h2">{dict.lines.stations}:</Typography>
          <ul>
            {line["odpt:stationOrder"].map((station) => (
              <li key={station["odpt:station"]}>
                <Link
                  href={`/${locale}/lines/${getLastSegment(
                    line["owl:sameAs"]
                  )}/${getLastSegment(station["odpt:station"])}`}
                >
                  {getLocalizedTitle(station["odpt:stationTitle"], locale) || getLastSegment(station["odpt:station"])}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Page>
    </>
  );
}
