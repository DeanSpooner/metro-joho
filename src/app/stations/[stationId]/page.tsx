import React from "react";
import { stations } from "../../../data/stations";
import Page from "@/components/Page";
import Typography from "@/components/Typography";
import Timetable from "@/components/Timetable";
// Given page for a specific station.

interface Props {
  params: {
    stationId: string;
  };
}

export default function StationPage({ params }: Props) {
  const stationId = params.stationId as keyof typeof stations;
  const station = stations[stationId];

  if (!station) {
    return <div>Station not found</div>;
  }

  return (
    <Page>
      <main>
        <Typography role="h1">{station.name}</Typography>
        <Typography>{station.description}</Typography>
        <Typography role="h2">Lines:</Typography>
        <ul>
          {station.lines.map(line => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <Typography role="h2">Timetable:</Typography>
        {Object.entries(station.timetable).map(([line, times]) => (
          <div key={line}>
            <Typography role="h3">{line} line</Typography>
            <Timetable times={times} />
          </div>
        ))}
      </main>
    </Page>
  );
}
