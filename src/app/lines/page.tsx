import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import Typography from "@/components/Typography";
import { getLastSegment } from "@/utils/utilities";
import PageWithHeader from "@/components/PageWithHeader";

export default async function LinesPage() {
  const lines = (await odptClient.getRailways()) as any[];

  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">Tokyo Metro Lines</Typography>
        <ul>
          {lines.map((line) => (
            <li key={line["@id"]}>
              <Link href={`/lines/${getLastSegment(line["owl:sameAs"])}`}>
                <strong style={{ color: line["odpt:color"] }}>
                  {line["odpt:railwayTitle"].en}
                </strong>
              </Link>
              <Typography>
                Stations:{" "}
                {line["odpt:stationOrder"]
                  .map((station: any) => {
                    return (
                      station["odpt:stationTitle"]?.en ||
                      getLastSegment(station["odpt:station"])
                    );
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
