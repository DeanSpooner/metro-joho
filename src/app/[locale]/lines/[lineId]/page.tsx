import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import Header from "@/components/Header";
import { getDictionary, Locale } from "@/i18n/config";
import StationEmblem from "@/components/StationEmblem";

export default async function LinePage({ params }: { params: Promise<{ locale: Locale; lineId: string }> }) {
  const { locale, lineId } = await params;
  const dict = await getDictionary(locale);

  const railwayId = `odpt.Railway:TokyoMetro.${lineId}`;
  const [lineResponse, stationData] = await Promise.all([
    odptClient.getRailway(railwayId),
    odptClient.getStations()
  ]);

  const line = lineResponse[0];

  if (!line) {
    return <div>{dict.errors.lineNotFound}</div>;
  }

  // Filter stations for this railway and create a lookup map for codes
  const stationCodeMap = stationData
    .filter(s => s["odpt:railway"] === railwayId)
    .reduce((acc, s) => {
      acc[s["owl:sameAs"]] = s["odpt:stationCode"];
      return acc;
    }, {} as Record<string, string>);

  const stations = line["odpt:stationOrder"];

  return (
    <div className="min-h-screen bg-[#02022a]">
      <Header locale={locale} dict={dict} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Typography role="h1" font="zenKaku" className="mb-8 text-4xl md:text-6xl text-center">
          {getLocalizedTitle(line["odpt:railwayTitle"], locale)}
        </Typography>

        <HorizontalEmblem
          color={line["odpt:color"]}
          text={line["odpt:lineCode"]}
          size="large"
        />

        <Page>
          <main>
            <Typography role="h2" font="zenKaku" className="mb-4 text-2xl border-b border-white/10 pb-4">
              {dict.lines.stations}
            </Typography>
            <div className="relative">
              <div
                className="absolute left-[-2] top-5 bottom-5 w-1 rounded-full"
                style={{ backgroundColor: line["odpt:color"] }}
              />
              <ul className="space-y-12 relative">
                {stations.map((station) => {
                  const stationId = getLastSegment(station["odpt:station"]);
                  const stationCode = stationCodeMap[station["odpt:station"]] || "";

                  return (
                    <li key={station["odpt:station"]} className="relative flex items-center">
                      <Link
                        href={`/${locale}/lines/${lineId}/${stationId}`}
                        className="flex items-center w-full py-3 px-6 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10 no-underline group"
                      >
                        <StationEmblem
                          color={line["odpt:color"]}
                          code={stationCode}
                          className="absolute left-0 -translate-x-1/2"
                        />
                        <div className="flex items-center justify-between w-full ml-4">
                          <Typography
                            font="zenKaku"
                            className="text-white transition-all transform group-hover:scale-120 origin-left font-bold"
                            style={{ fontSize: "1.25rem" }}
                          >
                            {getLocalizedTitle(station["odpt:stationTitle"], locale) || stationId}
                          </Typography>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </main>
        </Page>
      </div>
    </div>
  );
}
