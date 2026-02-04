import React from "react";
import Link from "next/link";
import { getStationData, getTimetablesByDirection } from "@/utils/stationUtils";
import Typography from "@/components/Typography";
import MinifiedTimetable from "@/components/MinifiedTimetable";
import PageWithHeader from "@/components/PageWithHeader";
import StationEmblem from "@/components/StationEmblem";
import { getDictionary, Locale } from "@/i18n/config";

interface Props {
  params: Promise<{
    locale: Locale;
    stationId: string;
  }>;
}

export default async function StationPage({ params }: Props) {
  const { locale, stationId } = await params;
  const dict = await getDictionary(locale);
  const station = await getStationData(stationId, locale);

  if (!station) {
    return (
      <PageWithHeader locale={locale} dict={dict}>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Typography role="h1" font="zenKaku" className="text-4xl font-bold mb-4">
            {dict.stations.notFound}
          </Typography>
          <Typography className="text-white/60">
            {dict.stations.notFoundDesc.replace("{id}", stationId)}
          </Typography>
        </main>
      </PageWithHeader>
    );
  }

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <Typography role="h1" font="zenKaku" className="text-5xl md:text-7xl font-bold mb-4">
            {station.name}
          </Typography>
        </div>

        <div className="mb-16">
          <Typography role="h2" font="zenKaku" className="text-2xl mb-6 border-b border-white/10 pb-2">
            {dict.stations.linesAtStation}
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {station.lines.map((line) => (
              <Link
                key={line.id}
                href={`/${locale}/lines/${line.id}`}
                className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg no-underline flex items-center gap-6"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: line.color }}
                />

                <StationEmblem
                  color={line.color}
                  code={line.code}
                  className="shrink-0"
                />

                <div>
                  <Typography role="h3" font="zenKaku" className="text-xl font-bold group-hover:text-white transition-colors">
                    {line.name}
                  </Typography>
                  <Typography className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                    {dict.lines.viewFullDetails} →
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Typography role="h2" font="zenKaku" className="text-2xl mb-8 border-b border-white/10 pb-2">
            {dict.timetable.title}
          </Typography>

          <div className="space-y-8">
            {await Promise.all(
              station.lines.map(async (line) => {
                const directionTimetables = await getTimetablesByDirection(line.id, station.id, locale);

                return (
                  <div key={line.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                      <StationEmblem
                        color={line.color}
                        code={line.code}
                        size="sm"
                      />
                      <Typography role="h3" font="zenKaku" className="text-2xl font-bold">
                        {line.name}
                      </Typography>
                    </div>

                    {directionTimetables.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {directionTimetables.map((dt) => (
                          <div key={dt.directionId} className="flex flex-col border-b border-white/10 pb-8 last:border-0 last:pb-0 md:border-0 md:pb-0">
                            <Typography className="text-sm text-white/50 mb-2 uppercase tracking-wider font-bold">
                              {dict.timetable.boundFor || "Bound for"} {dt.directionName}
                            </Typography>
                            <MinifiedTimetable
                              times={dt.times}
                              locale={locale}
                              lineId={line.id}
                              stationId={stationId}
                              viewFullTimetableText={dict.timetable.viewTimetable}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-white/30 italic">
                        {dict.timetable.noData}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </PageWithHeader>
  );
}
