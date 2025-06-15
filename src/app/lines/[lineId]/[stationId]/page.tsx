import Page from "@/components/Page";
import Timetable from "@/components/Timetable";
import Typography from "@/components/Typography";
import { lines } from "@/data/lines";
import { stations } from "@/data/stations";
import Link from "next/link";

export default function LineStationPage({
  params,
}: {
  params: { lineId: string; stationId: string };
}) {
  const lineId = params.lineId as keyof typeof lines;
  const stationId = params.stationId as keyof typeof stations;

  const line = lines[lineId];
  const station = stations[stationId];

  if (!line) {
    return <div>Line not found</div>;
  }
  if (!station) {
    return <div>Station not found</div>;
  }

  // Show timetable for this line at this station
  const timetable =
    (station.timetable as Record<string, string[]>)[lineId] || [];

  return (
    <Page>
      <main>
        <Typography role="h1">
          {station.name} -{" "}
          <Link href={`/lines/${line.id}`}>
            <strong style={{ color: line.color }}>{line.name}</strong>
          </Link>
        </Typography>
        <Typography>{station.description}</Typography>
        <Typography role="h2">Timetable for {line.name}:</Typography>
        <ul>
          {timetable.length > 0 ? (
            <Timetable times={timetable} />
          ) : (
            <li>No timetable available</li>
          )}
        </ul>
        <Typography role="h2">Other lines at this station:</Typography>
        <ul>
          {station.lines
            .filter(l => l !== lineId)
            .map(otherLine => {
              const lineId = otherLine as keyof typeof lines;
              const line = lines[lineId];
              return (
                <li key={otherLine}>
                  <Link href={`/lines/${line.id}/${station.id}`}>
                    <strong style={{ color: line.color }}>{line.name}</strong>
                  </Link>
                </li>
              );
            })}
        </ul>
      </main>
    </Page>
  );
}
