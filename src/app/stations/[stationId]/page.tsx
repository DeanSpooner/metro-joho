import React from "react";
import { getStationData } from "@/utils/stationUtils";
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
            The station "{stationId}" could not be found in our database.
          </Typography>
        </main>
      </PageWithHeader>
    );
  }

  return (
    <PageWithHeader>
      <main>
        <Typography role="h1">{station.name}</Typography>
        <Typography>{station.description}</Typography>
        <Typography role="h2">Lines:</Typography>
        <ul>
          {station.lines.map((line) => (
            <li key={line} className="capitalize">
              {line}
            </li>
          ))}
        </ul>

        <Typography role="h2">Timetable:</Typography>
        {Object.entries(station.timetable).map(([line, times]) => (
          <div key={line} className="mb-6">
            <Typography role="h3" className="capitalize">
              {line} line
            </Typography>
            {times.length > 0 ? (
              <Timetable times={times} />
            ) : (
              <Typography>No timetable data available.</Typography>
            )}
          </div>
        ))}
      </main>
    </PageWithHeader>
  );
}
