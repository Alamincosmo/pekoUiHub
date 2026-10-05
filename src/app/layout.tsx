import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pekoUiHub • Modern Motion & UI Library",
  description: "Curated library of high-end kinetic typography, 3D stages, and micro-interactions.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Merienda:wght@300..900&family=Noto+Sans+JP:wght@100..900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-jost bg-[#F8FAFC] text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
