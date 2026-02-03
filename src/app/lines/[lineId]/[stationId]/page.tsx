import PageWithHeader from "@/components/PageWithHeader";
import Timetable from "@/components/Timetable";
import Typography from "@/components/Typography";
import { odptClient } from "@/utils/odptClient";
import { getLastSegment } from "@/utils/utilities";
import { getTimetableForLine } from "@/utils/stationUtils";
import Link from "next/link";

export default async function LineStationPage({
  params,
}: {
  params: Promise<{ lineId: string; stationId: string }>;
}) {
  const { lineId, stationId } = await params;
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = lineResponse[0];

  const stationResponse = await odptClient.getStation(
    `odpt.Station:TokyoMetro.${lineId}.${stationId}`
  );
  const station = stationResponse[0];

  if (!line) {
    return <div>Line not found</div>;
  }
  if (!station) {
    return <div>Station not found</div>;
  }

  const timetable = await getTimetableForLine(lineId, stationId);

  // Fetch other stations at this location to show "Other lines at this station"
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
    <PageWithHeader>
      <main>
        <Typography role="h1">
          {station["odpt:stationTitle"].en} -{" "}
          <Link href={`/lines/${getLastSegment(line["owl:sameAs"])}`}>
            <strong style={{ color: line["odpt:color"] }}>
              {line["odpt:railwayTitle"].en}
            </strong>
          </Link>
        </Typography>
        <Typography role="h2">
          Timetable for {line["odpt:railwayTitle"].en}:
        </Typography>
        <ul>
          {timetable.length > 0 ? (
            <Timetable times={timetable} />
          ) : (
            <li>No timetable available</li>
          )}
        </ul>
        <Typography role="h2">Other lines at this station:</Typography>
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
                    <Link href={`/lines/${lineShortId}/${stationShortId}`}>
                      <strong style={{ color: otherLine["odpt:color"] }}>
                        {otherLine["odpt:railwayTitle"].en}
                      </strong>
                    </Link>
                  </li>
                );
              })
            )
          ) : (
            <li>None</li>
          )}
        </ul>
      </main>
    </PageWithHeader>
  );
}
