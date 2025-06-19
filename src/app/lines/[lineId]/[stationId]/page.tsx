import Page from "@/components/Page";
import Timetable from "@/components/Timetable";
import Typography from "@/components/Typography";
import { lines } from "@/data/lines";
import { stations } from "@/data/stations";
import { getLastSegment } from "@/utils/utilities";
import Link from "next/link";

export default function LineStationPage({
  params,
}: {
  params: { lineId: string; stationId: string };
}) {
  const line = lines.find(
    line => getLastSegment(line["owl:sameAs"]) === params.lineId
  );

  const station = stations.find(
    station => getLastSegment(station["owl:sameAs"]) === params.stationId
  );

  if (!line) {
    return <div>Line not found</div>;
  }
  if (!station) {
    return <div>Station not found</div>;
  }

  const timetable: string | never[] = [];

  return (
    <Page>
      <main>
        <Typography role="h1">
          {station["odpt:stationTitle"].en} -{" "}
          <Link href={`/lines/${line["owl:sameAs"]}`}>
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
          {stations
            .filter(otherStation => {
              const otherStationShortId = getLastSegment(
                otherStation["owl:sameAs"]
              );
              const otherLineShortId = getLastSegment(
                otherStation["odpt:railway"]
              );

              // Return all stations that share the same station ID
              // but have a different line ID
              return (
                otherStationShortId === params.stationId &&
                otherLineShortId !== params.lineId
              );
            })
            .map(otherStation => {
              const otherLine = lines.find(
                line =>
                  line["owl:sameAs"] === otherStation["odpt:railway"] &&
                  getLastSegment(line["owl:sameAs"]) !== params.lineId
              );
              if (!otherLine) return null;

              const lineShortId = getLastSegment(otherLine["owl:sameAs"]);
              const stationShortId = getLastSegment(otherStation["owl:sameAs"]);

              return (
                <li key={otherLine["@id"]}>
                  <Link href={`/lines/${lineShortId}/${stationShortId}`}>
                    <strong style={{ color: otherLine["odpt:color"] }}>
                      {otherLine["odpt:railwayTitle"].en}
                    </strong>
                  </Link>
                </li>
              );
            })}
        </ul>
      </main>
    </Page>
  );
}
