import React from "react";
import { getStationData, getTimetableForLine } from "@/utils/stationUtils";
import Typography from "@/components/Typography";
import Timetable from "@/components/Timetable";
import PageWithHeader from "@/components/PageWithHeader";

interface Props {
  params: Promise<{
    stationId: string;
  }>;
}

export default async function StationPage({ params }: Props) {
  const { stationId } = await params;
  const station = await getStationData(stationId);

  if (!station) {
    return (
      <PageWithHeader>
        <main>
          <Typography role="h1">Station not found</Typography>
          <Typography>
            The station &quot;{stationId}&quot; could not be found in our database.
          </Typography>
        </main>
      </PageWithHeader>
    );
  }

  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">{station.name}</Typography>
        <Typography role="h2">Lines:</Typography>
        <ul>
          {station.lines.map((line) => (
            <li key={line.id} className="capitalize">
              {line.name}
            </li>
          ))}
        </ul>

        <Typography role="h2">Timetable:</Typography>
        {await Promise.all(
          station.lines.map(async (line) => {
            const times = await getTimetableForLine(line.id, station.id);
            return (
              <div key={line.id} className="mb-6">
                <Typography role="h3" className="capitalize">
                  {line.name} line
                </Typography>
                {times.length > 0 ? (
                  <Timetable times={times} />
                ) : (
                  <Typography>No timetable data available.</Typography>
                )}
              </div>
            );
          })
        )}
      </main>
    </PageWithHeader>
  );
}
