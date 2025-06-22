import Link from "next/link";
import { dummyStations } from "@/data/dummyStations";
import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";

export default function StationsPage() {
  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">Tokyo Metro Stations</Typography>
        <ul>
          {Object.values(dummyStations).map(station => (
            <li key={station.id}>
              <Link href={`/stations/${station.id}`}>{station.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </PageWithHeader>
  );
}
