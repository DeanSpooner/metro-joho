import Link from "next/link";
import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import { getAllStations } from "@/utils/stationUtils";
import { getDictionary, Locale } from "@/i18n/config";

export default async function StationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const stations = await getAllStations(locale);

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main>
        <Typography role="h1">{dict.stations.title}</Typography>
        <ul>
          {stations.map((station) => (
            <li key={station.id}>
              <Link href={`/${locale}/stations/${station.id}`}>{station.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </PageWithHeader>
  );
}
