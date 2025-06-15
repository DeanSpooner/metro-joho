import Link from "next/link";
import { lines } from "@/data/lines";

export default function LinesPage() {
  return (
    <main>
      <h1>Tokyo Metro Lines (Dummy)</h1>
      <ul>
        {Object.values(lines).map(line => (
          <li key={line.id}>
            <Link href={`/lines/${line.id}`}>
              <strong style={{ color: line.color }}>{line.name}</strong>
            </Link>
            <p>Stations: {line.stations.join(", ")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
