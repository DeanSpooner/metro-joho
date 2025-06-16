import Link from "next/link";
import { dummyLines } from "@/data/dummyLines";
import { dummyStations } from "@/data/dummyStations";
import Typography from "@/components/Typography";
import Page from "@/components/Page";

export default function LinesPage() {
  return (
    <Page>
      <main>
        <Typography role="h1">Tokyo Metro Lines</Typography>
        <ul>
          {Object.values(dummyLines).map(line => (
            <li key={line.id}>
              <Link href={`/lines/${line.id}`}>
                <strong style={{ color: line.color }}>{line.name}</strong>
              </Link>
              <Typography>
                Stations:{" "}
                {line.stations
                  .map(stationRaw => {
                    const stationId = stationRaw as keyof typeof dummyStations;
                    const station = dummyStations[stationId];
                    return station.name;
                  })
                  .join(", ")}
              </Typography>
            </li>
          ))}
        </ul>
      </main>
    </Page>
  );
}
