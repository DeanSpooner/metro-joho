import React from "react";
import { getStationData, getTimetableForLine } from "@/utils/stationUtils";
import Typography from "@/components/Typography";
import Timetable from "@/components/Timetable";
import PageWithHeader from "@/components/PageWithHeader";
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
        <main>
          <Typography role="h1">{dict.stations.notFound}</Typography>
          <Typography>
            {dict.stations.notFoundDesc.replace("{id}", stationId)}
          </Typography>
        </main>
      </PageWithHeader>
    );
  }

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main>
        <Typography role="h1">{station.name}</Typography>
        <Typography role="h2">{dict.stations.linesAtStation}:</Typography>
        <ul>
          {station.lines.map((line) => (
            <li key={line.id} className="capitalize">
              {line.name}
            </li>
          ))}
        </ul>

        <Typography role="h2">{dict.timetable.title}:</Typography>
        {await Promise.all(
          station.lines.map(async (line) => {
            const times = await getTimetableForLine(line.id, station.id);
            return (
              <div key={line.id} className="mb-6">
                <Typography role="h3" className="capitalize">
                  {line.name}
                </Typography>
                {times.length > 0 ? (
                  <Timetable times={times} clockLabel={dict.common.japanTime} />
                ) : (
                  <Typography>{dict.timetable.noData}</Typography>
                )}
              </div>
            );
          })
        )}
      </main>
    </PageWithHeader>
  );
}
