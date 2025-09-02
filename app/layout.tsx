import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Garden of Ancients - Fusion of Recreation & Conservation - Kenya’s Natural Classroom",
  description:
    "Experience hands-on environmental education, celebrate life's moments, and connect with nature at Kenya's premier educational garden space in Nyansiongo, Nyamira County.",
  keywords:
    "environmental education, Kenya, garden tours, school visits, nature learning, outdoor education, Nyansiongo, Nyamira County, sustainable farming, photography venue, corporate retreats",
  authors: [{ name: "Garden of Ancients" }],
  creator: "Garden of Ancients",
  publisher: "Garden of Ancients",
  openGraph: {
    title:
      "Garden of Ancients - Fusion of Recreation & Conservation - Kenya’s Natural Classroom",
    description:
      "Where ancient wisdom meets modern learning. Book your transformative nature experience today.",
    url: "https://gardenofancients.com",
    siteName: "Garden of Ancients",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Garden of Ancients - Fusion of Recreation & Conservation - Kenya’s Natural Classroom",
    description:
      "Experience transformative environmental education in Kenya's most inspiring natural setting.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/goaLogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/goaLogo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
