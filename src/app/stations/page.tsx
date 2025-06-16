import Link from "next/link";
import { dummyStations } from "@/data/dummyStations";
import Page from "@/components/Page";
import Typography from "@/components/Typography";

export default function StationsPage() {
  return (
    <Page>
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
    </Page>
  );
}
