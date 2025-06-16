import Link from "next/link";
import { lines } from "@/data/lines";
import Typography from "@/components/Typography";
import Page from "@/components/Page";

export default function LinesPage() {
  return (
    <Page>
      <main>
        <Typography role="h1">Tokyo Metro Lines</Typography>
        <ul>
          {Object.values(lines).map(line => (
            <li key={line["@id"]}>
              <Link href={`/lines/${encodeURIComponent(line["owl:sameAs"])}`}>
                <strong style={{ color: line["odpt:color"] }}>
                  {line["odpt:railwayTitle"].en}
                </strong>
              </Link>
              <Typography>
                Stations:{" "}
                {line["odpt:stationOrder"]
                  .map(station => {
                    return station["odpt:stationTitle"].en;
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
