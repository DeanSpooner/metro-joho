import "../globals.css";
import localFont from "next/font/local";
import { Locale } from "@/i18n/config";

const notoSansJP = localFont({
  src: "../../../public/fonts/Noto_Sans_JP/NotoSansJP-VariableFont_wght.ttf",
  variable: "--font-noto-sans-jp",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={notoSansJP.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
