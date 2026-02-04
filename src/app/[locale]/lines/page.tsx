import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import Typography from "@/components/Typography";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import PageWithHeader from "@/components/PageWithHeader";
import { getDictionary, Locale } from "@/i18n/config";

export default async function LinesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const lines = await odptClient.getRailways();

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main>
        <Typography role="h1">{dict.lines.title}</Typography>
        <ul>
          {lines.map((line) => (
            <li key={line["@id"]}>
              <Link href={`/${locale}/lines/${getLastSegment(line["owl:sameAs"])}`}>
                <strong style={{ color: line["odpt:color"] }}>
                  {getLocalizedTitle(line["odpt:railwayTitle"], locale)}
                </strong>
              </Link>
              <Typography>
                {dict.lines.stations}:
                {line["odpt:stationOrder"]
                  .map((station) => {
                    return (
                      getLocalizedTitle(station["odpt:stationTitle"], locale) ||
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
