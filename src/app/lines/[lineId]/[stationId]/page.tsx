import { lines } from "@/data/lines";
import { stations } from "@/data/stations";

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
    <main>
      <h1>
        {station.name} - {line.name}
      </h1>
      <p>{station.description}</p>

      <h2>Timetable for {line.name}:</h2>
      <ul>
        {timetable.length > 0 ? (
          timetable.map(time => <li key={time}>{time}</li>)
        ) : (
          <li>No timetable available</li>
        )}
      </ul>

      <h2>Other lines at this station:</h2>
      <ul>
        {station.lines
          .filter(l => l !== lineId)
          .map(otherLine => (
            <li key={otherLine}>{otherLine}</li>
          ))}
      </ul>
    </main>
  );
}
