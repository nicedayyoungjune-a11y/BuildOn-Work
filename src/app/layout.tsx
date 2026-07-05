import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildOn Work",
  description:
    "건설 일용직 근로자와 건설사를 연결하는 웹앱 기반 건설인력 통합 플랫폼"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
