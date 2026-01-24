import Link from "next/link";
import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import { getAllStations } from "@/utils/stationUtils";

export default function StationsPage() {
  const stations = getAllStations();

  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">Tokyo Metro Stations</Typography>
        <ul>
          {stations.map((station) => (
            <li key={station.id}>
              <Link href={`/stations/${station.id}`}>{station.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </PageWithHeader>
  );
}
