import { odptClient } from "@/utils/odptClient";
import Typography from "@/components/Typography";
import { getLocalizedTitle } from "@/utils/utilities";
import PageWithHeader from "@/components/PageWithHeader";
import { getDictionary, Locale } from "@/i18n/config";
import LineCard from "@/components/LineCard";

export default async function LinesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const lines = await odptClient.getRailways();

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Typography role="h1" font="zenKaku" className="mb-12 text-center text-5xl md:text-6xl">
          {dict.lines.title}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lines.map((line) => {
            const firstStation = line["odpt:stationOrder"][0];
            const lastStation = line["odpt:stationOrder"][line["odpt:stationOrder"].length - 1];
            const terminalStations = `${getLocalizedTitle(firstStation["odpt:stationTitle"], locale)} ↔ ${getLocalizedTitle(lastStation["odpt:stationTitle"], locale)}`;

            return (
              <LineCard
                key={line["@id"]}
                locale={locale}
                line={line}
                title={getLocalizedTitle(line["odpt:railwayTitle"], locale)}
                stationsLabel={dict.lines.stations}
                terminalStations={terminalStations}
              />
            );
          })}
        </div>
      </main>
    </PageWithHeader>
  );
}
