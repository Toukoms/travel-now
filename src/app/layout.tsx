import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientSessionProvider from "@/providers/ClientSessionProvider";

export const metadata: Metadata = {
  title: "TravelNow",
  description:
    "Application de reservation de place pour un voyage national à Madagascar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientSessionProvider>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </ClientSessionProvider>
    </html>
  );
}
