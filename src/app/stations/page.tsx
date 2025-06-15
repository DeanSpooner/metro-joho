import Link from "next/link";
import { stations } from "@/data/stations";

export default function StationsPage() {
  return (
    <main>
      <h1>Tokyo Metro Stations</h1>
      <ul>
        {Object.values(stations).map(station => (
          <li key={station.id}>
            <Link href={`/stations/${station.id}`}>{station.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
