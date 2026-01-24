import Typography from "@/components/Typography";
import PageWithHeader from "@/components/PageWithHeader";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <PageWithHeader className="min-h-[calc(100dvh-32px)] grid-rows-[auto_1fr]">
      <div className="flex-1 flex flex-col justify-between py-8 h-full">
        <Hero />
        <Typography role="h1">
          東京メトロ情報へようこそ！
          <br />
          Welcome to the Tokyo Metro Information Portal!
        </Typography>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="https://www.odpt.org/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-500 p-8 rounded-lg block hover:bg-red-600 transition-colors text-left"
          >
            <Typography role="h2">ODPT</Typography>
            <Typography role="p">
              Find out more about the Open Data of Public Transportation Japan
            </Typography>
          </a>
          <a
            href="https://www.tokyometro.jp/en/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 p-8 rounded-lg block hover:bg-blue-600 transition-colors text-left"
          >
            <Typography role="h2">Tokyo Metro</Typography>
            <Typography role="p">
              Check out the official Tokyo Metro website for more information
            </Typography>
          </a>
        </div>
        <Hero isBackwards />
      </div>
    </PageWithHeader>
  );
}
