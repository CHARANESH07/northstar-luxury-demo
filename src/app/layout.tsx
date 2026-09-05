import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const display = Instrument_Serif({ subsets:["latin"], weight:["400"], variable:"--font-display", display:"swap" });
const sans = Instrument_Sans({ subsets:["latin"], variable:"--font-sans", display:"swap" });

export const metadata: Metadata = {
  title:{ default:"NorthStar — Cars & Tempo Traveller on Rent", template:"%s | NorthStar"},
  description:"Livery-maintained charter. Whole vehicle, coachbuilt care, verified drivers. Hold in seconds.",
  openGraph:{ title:"NorthStar — Travel together. Arrive together.", description:"Coach line → job sheet → held.", type:"website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--brass)] selection:text-white">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-[var(--ink)] text-white px-4 py-2 z-[100]">Skip to content</a>
        <Header/>
        <main id="main" tabIndex={-1} className="flex-1 pb-16 md:pb-0 focus:outline-none"><PageTransition>{children}</PageTransition></main>
        <Footer/>
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[var(--rule)] p-3 flex gap-2 z-40">
          <a href="tel:+919880601004" className="flex-1 border border-[var(--rule)] py-3 text-center text-sm font-medium">Call</a>
          <a href="/booking" className="flex-1 bg-[var(--ink)] text-white py-3 text-center text-sm font-semibold">Book</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"LocalBusiness", name:"NorthStar Travels",
          telephone:"+919880601004", address:{ "@type":"PostalAddress", addressLocality:"New Delhi", addressCountry:"IN"},
          areaServed:["Delhi NCR","Jaipur","Agra","Chandigarh"], priceRange:"₹₹"
        })}}/>
      </body>
    </html>
  );
}
