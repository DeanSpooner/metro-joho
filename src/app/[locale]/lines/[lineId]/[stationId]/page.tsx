import PageWithHeader from "@/components/PageWithHeader";
import Timetable from "@/components/Timetable";
import Typography from "@/components/Typography";
import { odptClient } from "@/utils/odptClient";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import { getTimetableForLine } from "@/utils/stationUtils";
import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";

export default async function LineStationPage({
  params,
}: {
  params: Promise<{ locale: Locale; lineId: string; stationId: string }>;
}) {
  const { locale, lineId, stationId } = await params;
  const dict = await getDictionary(locale);
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = lineResponse[0];

  const stationResponse = await odptClient.getStation(
    `odpt.Station:TokyoMetro.${lineId}.${stationId}`
  );
  const station = stationResponse[0];

  if (!line) {
    return <div>{dict.errors.lineNotFound}</div>;
  }
  if (!station) {
    return <div>{dict.errors.stationNotFound}</div>;
  }

  const timetable = await getTimetableForLine(lineId, stationId);

  const allStations = await odptClient.getStations();
  const sameStationOtherLines = allStations.filter((otherStation) => {
    const otherStationShortId = getLastSegment(otherStation["owl:sameAs"]);
    const otherLineShortId = getLastSegment(otherStation["odpt:railway"]);

    return (
      otherStationShortId === stationId &&
      otherLineShortId !== lineId
    );
  });

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main>
        <Typography role="h1">
          {getLocalizedTitle(station["odpt:stationTitle"], locale)} -{" "}
          <Link href={`/${locale}/lines/${getLastSegment(line["owl:sameAs"])}`}>
            <strong style={{ color: line["odpt:color"] }}>
              {getLocalizedTitle(line["odpt:railwayTitle"], locale)}
            </strong>
          </Link>
        </Typography>
        <Typography role="h2">
          {dict.timetable.title} {dict.lines.line} {getLocalizedTitle(line["odpt:railwayTitle"], locale)}:
        </Typography>
        <ul>
          {timetable.length > 0 ? (
            <Timetable times={timetable} clockLabel={dict.common.japanTime} />
          ) : (
            <li>{dict.timetable.noData}</li>
          )}
        </ul>
        <Typography role="h2">{dict.timetable.otherLines}:</Typography>
        <ul>
          {sameStationOtherLines.length > 0 ? (
            await Promise.all(
              sameStationOtherLines.map(async (otherStation) => {
                const otherLineResponse = await odptClient.getRailway(
                  otherStation["odpt:railway"]
                );
                const otherLine = otherLineResponse[0];
                if (!otherLine) return null;

                const lineShortId = getLastSegment(otherLine["owl:sameAs"]);
                const stationShortId = getLastSegment(
                  otherStation["owl:sameAs"]
                );

                return (
                  <li key={otherLine["@id"]}>
                    <Link href={`/${locale}/lines/${lineShortId}/${stationShortId}`}>
                      <strong style={{ color: otherLine["odpt:color"] }}>
                        {getLocalizedTitle(otherLine["odpt:railwayTitle"], locale)}
                      </strong>
                    </Link>
                  </li>
                );
              })
            )
          ) : (
            <li>{dict.timetable.none}</li>
          )}
        </ul>
      </main>
    </PageWithHeader>
  );
}
