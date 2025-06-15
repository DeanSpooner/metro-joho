import Link from "next/link";
import { lines } from "@/data/lines";
import LineEmblem from "@/components/LineEmblem";

export default function LinePage({ params }: { params: { lineId: string } }) {
  const lineId = params.lineId as keyof typeof lines;
  const line = lines[lineId];

  if (!line) {
    return <div>Line not found</div>;
  }

  return (
    <main>
      <h1>{line.name}</h1>
      {/* <div
        style={{
          justifySelf: "center",
          height: 100,
          width: 100,
          alignContent: "center",
          justifyItems: "center",
          backgroundColor: "white",
          border: "red",
          borderWidth: 20,
          borderStyle: "solid",
          borderRadius: 50,
        }}
      >
        <h1 style={{ color: "black" }}>M</h1>
      </div> */}
      <LineEmblem />
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
