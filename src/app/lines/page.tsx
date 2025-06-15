import Link from "next/link";
import { lines } from "@/data/lines";
import { stations } from "@/data/stations";
import Typography from "@/components/Typography";
import Page from "@/components/Page";

export default function LinesPage() {
  return (
    <Page>
      <main>
        <Typography role="h1">Tokyo Metro Lines</Typography>
        <ul>
          {Object.values(lines).map(line => (
            <li key={line.id}>
              <Link href={`/lines/${line.id}`}>
                <strong style={{ color: line.color }}>{line.name}</strong>
              </Link>
              <p>
                Stations:{" "}
                {line.stations
                  .map(stationRaw => {
                    const stationId = stationRaw as keyof typeof stations;
                    const station = stations[stationId];
                    return station.name;
                  })
                  .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </Page>
  );
}
