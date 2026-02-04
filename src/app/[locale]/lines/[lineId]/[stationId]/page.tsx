import PageWithHeader from "@/components/PageWithHeader";
import Typography from "@/components/Typography";
import CollapsibleTimetable from "@/components/CollapsibleTimetable";
import { odptClient } from "@/utils/odptClient";
import { getLastSegment, getLocalizedTitle } from "@/utils/utilities";
import { getTimetablesByDirection } from "@/utils/stationUtils";
import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";
import StationEmblem from "@/components/StationEmblem";

export default async function LineStationPage({
  params,
}: {
  params: Promise<{ locale: Locale; lineId: string; stationId: string }>;
}) {
  const { locale, lineId, stationId } = await params;
  const dict = await getDictionary(locale);
  const lineResponse = await odptClient.getRailway(
    `odpt.Railway:TokyoMetro.${lineId}`
  );
  const line = lineResponse[0];

  const stationResponse = await odptClient.getStation(
    `odpt.Station:TokyoMetro.${lineId}.${stationId}`
  );
  const station = stationResponse[0];

  if (!line) {
    return <div>{dict.errors.lineNotFound}</div>;
  }
  if (!station) {
    return <div>{dict.errors.stationNotFound}</div>;
  }

  const directionTimetables = await getTimetablesByDirection(lineId, stationId, locale);

  const allStations = await odptClient.getStations();
  const sameStationOtherLines = allStations.filter((otherStation) => {
    const otherStationShortId = getLastSegment(otherStation["owl:sameAs"]);
    const otherLineShortId = getLastSegment(otherStation["odpt:railway"]);

    return (
      otherStationShortId === stationId &&
      otherLineShortId !== lineId
    );
  });

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <StationEmblem
            color={line["odpt:color"]}
            code={station["odpt:stationCode"]}
            size="md"
            className="scale-125"
          />
          <div>
            <Typography role="h1" font="zenKaku" className="text-4xl md:text-5xl font-bold mb-2">
              {getLocalizedTitle(station["odpt:stationTitle"], locale)}
            </Typography>
            <Link
              href={`/${locale}/lines/${getLastSegment(line["owl:sameAs"])}`}
              className="text-xl md:text-2xl font-bold hover:opacity-80 transition-opacity flex items-center justify-center md:justify-start gap-2"
              style={{ color: line["odpt:color"] }}
            >
              {getLocalizedTitle(line["odpt:railwayTitle"], locale)}
            </Link>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-6">
            <Typography role="h2" font="zenKaku" className="text-3xl font-bold">
              {dict.timetable.title}
            </Typography>
          </div>

          {directionTimetables.length > 0 ? (
            directionTimetables.map((dt) => (
              <CollapsibleTimetable
                key={dt.directionId}
                id={`dir-${dt.directionId}`}
                directionId={dt.directionId}
                directionName={dt.directionName}
                times={dt.times}
                boundForText={dict.timetable.boundFor}
                locale={locale}
                stationCode={dt.stationCode}
                lineColor={line["odpt:color"]}
              />
            ))
          ) : (
            <div className="text-center py-12 text-white/30 italic bg-white/5 rounded-xl border border-white/10">
              {dict.timetable.noData}
            </div>
          )}
        </div>

        {sameStationOtherLines.length > 0 && (
          <div>
            <Typography role="h2" font="zenKaku" className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
              {dict.timetable.otherLines}
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {await Promise.all(
                sameStationOtherLines.map(async (otherStation) => {
                  const otherLineResponse = await odptClient.getRailway(
                    otherStation["odpt:railway"]
                  );
                  const otherLine = otherLineResponse[0];
                  if (!otherLine) return null;

                  const lineShortId = getLastSegment(otherLine["owl:sameAs"]);
                  const stationShortId = getLastSegment(
                    otherStation["owl:sameAs"]
                  );

                  return (
                    <Link
                      key={otherLine["@id"]}
                      href={`/${locale}/lines/${lineShortId}/${stationShortId}`}
                      className="group block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all no-underline"
                    >
                      <div className="flex items-center gap-4">
                        <StationEmblem
                          color={otherLine["odpt:color"]}
                          code={otherLine["odpt:lineCode"]}
                          size="sm"
                        />
                        <Typography font="zenKaku" className="font-bold text-lg group-hover:text-white transition-colors">
                          {getLocalizedTitle(otherLine["odpt:railwayTitle"], locale)}
                        </Typography>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </PageWithHeader>
  );
}
