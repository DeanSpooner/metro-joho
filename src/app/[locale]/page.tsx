import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import Hero from "@/components/Hero";
import { getDictionary, Locale } from "@/i18n/config";
import Link from "next/link";
import { odptClient } from "@/utils/odptClient";
import { getLocalizedTitle } from "@/utils/utilities";
import HorizontalEmblem from "@/components/HorizontalEmblem";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const tokyoMetroLocale = (() => {
    switch (locale) {
      case 'ja':
        return '';
      case 'zh':
        return 'cn/';
      case 'ko':
        return 'kr/';
      default:
        return 'en/';
    }
  })();

  const [railways, stations] = await Promise.all([
    odptClient.getRailways(),
    odptClient.getStations(),
  ]);

  const shuffledLines = [...railways].sort(() => Math.random() - 0.5);
  const featuredLines = shuffledLines.slice(0, 4);

  return (
    <PageWithHeader
      locale={locale}
      dict={dict}
      className="min-h-[calc(100dvh-32px)] grid-rows-[auto_1fr]"
    >
      <div className="flex-1 flex flex-col justify-between h-full gap-12">
        <Hero />
        <div className="max-w-5xl mx-auto w-full px-4 space-y-16">
          <div className="text-center space-y-4">
            <Typography role="h1" font="zenKaku" className="text-5xl md:text-6xl font-bold text-pretty">
              {dict.header.welcome}
            </Typography>
            <Typography className="text-xl text-white/70 max-w-2xl mx-auto">
              {dict.header.subtitle.replace('{count}', railways.length.toString())}
            </Typography>
          </div>

          <div>
            <Typography role="h2" font="zenKaku" className="text-3xl font-bold mb-6 text-center">
              {dict.home.quickAccess}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={`/${locale}/lines`}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Typography role="h3" font="zenKaku" className="text-3xl font-bold">
                      {dict.home.exploreLines}
                    </Typography>
                    <div className="text-5xl font-bold text-purple-400">
                      {railways.length}
                    </div>
                  </div>
                  <Typography className="text-white/70 mb-4">
                    {dict.home.exploreLinesDesc}
                  </Typography>
                  <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all">
                    <span className="font-bold">View All</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
              <Link
                href={`/${locale}/stations`}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/60 transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Typography role="h3" font="zenKaku" className="text-3xl font-bold">
                      {dict.home.exploreStations}
                    </Typography>
                    <div className="text-5xl font-bold text-blue-400">
                      {new Set(stations.map(s => s["owl:sameAs"])).size}
                    </div>
                  </div>
                  <Typography className="text-white/70 mb-4">
                    {dict.home.exploreStationsDesc}
                  </Typography>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
                    <span className="font-bold">View All</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <Typography role="h2" font="zenKaku" className="text-3xl font-bold mb-6 text-center">
              {dict.home.featuredLines}
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredLines.map((line) => {
                const lineId = line["owl:sameAs"].split('.').pop() || '';
                return (
                  <Link
                    key={line["@id"]}
                    href={`/${locale}/lines/${lineId}`}
                    className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all"
                  >
                    <div className="mb-4">
                      <HorizontalEmblem
                        color={line["odpt:color"]}
                        text={line["odpt:lineCode"]}
                        size="medium"
                        animate={true}
                      />
                    </div>
                    <Typography font="zenKaku" className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                      {getLocalizedTitle(line["odpt:railwayTitle"], locale)}
                    </Typography>
                    <div className="flex items-center gap-2 text-white/50 text-sm group-hover:gap-3 transition-all">
                      <span>View Line</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <Typography role="h2" font="zenKaku" className="text-2xl font-bold mb-6 text-center text-white/60">
              External Resources
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`https://www.odpt.org/${locale === 'ja' ? '' : 'en/'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-lg text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography role="h3" font="zenKaku" className="text-lg font-bold mb-1 group-hover:text-white transition-colors">
                      {dict.home.odptTitle}
                    </Typography>
                    <Typography className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {dict.home.odptDesc}
                    </Typography>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
              <a
                href={`https://www.tokyometro.jp/${tokyoMetroLocale}index.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-lg text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography role="h3" font="zenKaku" className="text-lg font-bold mb-1 group-hover:text-white transition-colors">
                      {dict.home.tmTitle}
                    </Typography>
                    <Typography className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {dict.home.tmDesc}
                    </Typography>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <Hero isBackwards />
      </div>
    </PageWithHeader>
  );
}
