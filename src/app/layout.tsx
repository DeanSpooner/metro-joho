import "./globals.css";
import localFont from "next/font/local";

const notoSansJP = localFont({
  src: "../../public/fonts/Noto_Sans_JP/NotoSansJP-VariableFont_wght.ttf",
  variable: "--font-noto-sans-jp",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
