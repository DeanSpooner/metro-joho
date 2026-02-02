const ODPT_BASE_URL = "https://api.odpt.org/api/v4";
const ACCESS_TOKEN = process.env.ODPT_ACCESS_TOKEN || "[YOUR_ACCESS_TOKEN]";

console.log({ACCESS_TOKEN})

export interface ODPTResponse<T> extends Array<T> {}

export async function fetchODPT<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
  const queryParams = new URLSearchParams({
    "acl:consumerKey": ACCESS_TOKEN,
    ...params,
  });

  const url = `${ODPT_BASE_URL}/${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`ODPT API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ODPT API (${endpoint}):`, error);
    return [];
  }
}

export const odptClient = {
  getRailways: () => fetchODPT("odpt:Railway", { "odpt:operator": "odpt.Operator:TokyoMetro" }),
  getStations: () => fetchODPT("odpt:Station", { "odpt:operator": "odpt.Operator:TokyoMetro" }),
  getStationTimetables: (stationId?: string) => {
    const params: Record<string, string> = {};
    if (stationId) params["odpt:station"] = stationId;
    return fetchODPT("odpt:StationTimetable", params);
  },
  getRailway: (railwayId: string) => fetchODPT("odpt:Railway", { "owl:sameAs": railwayId }),
  getStation: (stationId: string) => fetchODPT("odpt:Station", { "owl:sameAs": stationId }),
};
