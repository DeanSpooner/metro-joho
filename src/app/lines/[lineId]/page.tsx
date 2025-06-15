import Link from "next/link";
import { lines } from "@/data/lines";

export default function LinePage({ params }: { params: { lineId: string } }) {
  const lineId = params.lineId as keyof typeof lines;
  const line = lines[lineId];

  if (!line) {
    return <div>Line not found</div>;
  }

  return (
    <main>
      <h1>{line.name}</h1>
      <p>
        Line color: <span style={{ color: line.color }}>{line.color}</span>
      </p>

      <h2>Stations on this line:</h2>
      <ul>
        {line.stations.map(stationId => (
          <li key={stationId}>
            <Link href={`/lines/${lineId}/${stationId}`}>{stationId}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
