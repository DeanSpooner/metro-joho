import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import { getAllStations } from "@/utils/stationUtils";
import { getDictionary, Locale } from "@/i18n/config";
import StationList from "@/components/StationList";

export default async function StationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const stations = await getAllStations(locale);

  return (
    <PageWithHeader locale={locale} dict={dict}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Typography role="h1" font="zenKaku" className="mb-12 text-center text-5xl md:text-6xl">
          {dict.stations.title}
        </Typography>

        <StationList
          initialStations={stations}
          locale={locale}
          placeholder={dict.stations.searchPlaceholder}
          noResults={dict.stations.notFound}
        />
      </main>
    </PageWithHeader>
  );
}
