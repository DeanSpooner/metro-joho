import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import Hero from "@/components/Hero";
import { getDictionary, Locale } from "@/i18n/config";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <PageWithHeader
      locale={locale}
      dict={dict}
      className="min-h-[calc(100dvh-32px)] grid-rows-[auto_1fr]"
    >
      <div className="flex-1 flex flex-col justify-between py-8 h-full">
        <Hero />
        <Typography role="h1" className="text-pretty">
          {dict.header.welcome}
        </Typography>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="https://www.odpt.org/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-500 p-8 rounded-lg block hover:bg-red-600 transition-colors text-left"
          >
            <Typography role="h2">{dict.home.odptTitle}</Typography>
            <Typography role="p">
              {dict.home.odptDesc}
            </Typography>
          </a>
          <a
            href="https://www.tokyometro.jp/en/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 p-8 rounded-lg block hover:bg-blue-600 transition-colors text-left"
          >
            <Typography role="h2">{dict.home.tmTitle}</Typography>
            <Typography role="p">
              {dict.home.tmDesc}
            </Typography>
          </a>
        </div>
        <Hero isBackwards />
      </div>
    </PageWithHeader>
  );
}
