import React from "react";
import { stations } from "../../../data/stations";
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
    <main>
      <h1>{station.name}</h1>
      <p>{station.description}</p>
      <h2>Lines:</h2>
      <ul>
        {station.lines.map(line => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <h2>Timetable:</h2>
      {Object.entries(station.timetable).map(([line, times]) => (
        <div key={line}>
          <h3>{line} line</h3>
          <ul>
            {times.map(time => (
              <li key={time}>{time}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
