import Link from "next/link";
import { lines } from "@/data/lines";
import Typography from "@/components/Typography";
import { getLastSegment } from "@/utils/utilities";
import PageWithHeader from "@/components/PageWithHeader";

export default function LinesPage() {
  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">Tokyo Metro Lines</Typography>
        <ul>
          {Object.values(lines).map(line => (
            <li key={line["@id"]}>
              <Link href={`/lines/${getLastSegment(line["owl:sameAs"])}`}>
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
    </PageWithHeader>
  );
}
