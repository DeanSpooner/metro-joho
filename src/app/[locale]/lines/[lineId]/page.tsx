import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import HorizontalEmblem from "@/components/HorizontalEmblem";
import Typography from "@/components/Typography";
import Page from "@/components/Page";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import Header from "@/components/Header";
import { getDictionary, Locale } from "@/i18n/config";

export default async function LinePage({ params }: { params: Promise<{ locale: Locale; lineId: string }> }) {
  const { locale, lineId } = await params;
  const dict = await getDictionary(locale);
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = lineResponse[0];

  if (!line) {
    return <div>{dict.errors.lineNotFound}</div>;
  }

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
          <main className="mt-16">
            <Typography role="h2" font="zenKaku" className="mb-12 text-2xl border-b border-white/10 pb-4">
              {dict.lines.stations}
            </Typography>

            <div className="relative">
              <div
                className="absolute left-4 top-0 bottom-0 w-1 rounded-full opacity-20"
                style={{ backgroundColor: line["odpt:color"] }}
              />

              <ul className="space-y-8 relative">
                {stations.map((station) => {
                  const stationId = getLastSegment(station["odpt:station"]);

                  return (
                    <li key={station["odpt:station"]} className="relative flex items-center group">
                      <div
                        className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#02022a] z-10 transition-transform duration-300 group-hover:scale-150"
                        style={{ backgroundColor: line["odpt:color"] }}
                      />

                      <Link
                        href={`/${locale}/lines/${getLastSegment(line["owl:sameAs"])}/${stationId}`}
                        className="ml-12 block py-2 px-4 rounded-lg hover:bg-white/5 transition-colors w-full border border-transparent hover:border-white/10 no-underline"
                      >
                        <div className="flex items-baseline justify-between">
                          <Typography font="zenKaku" className="text-xl text-white group-hover:text-white transition-colors font-bold">
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
