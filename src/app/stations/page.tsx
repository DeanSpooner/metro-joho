import Link from "next/link";
import { stations } from "@/data/stations";
import Page from "@/components/Page";
import Typography from "@/components/Typography";

export default function StationsPage() {
  return (
    <Page>
      <main>
        <Typography role="h1">Tokyo Metro Stations</Typography>
        <ul>
          {Object.values(stations).map(station => (
            <li key={station.id}>
              <Link href={`/stations/${station.id}`}>{station.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </Page>
  );
}
