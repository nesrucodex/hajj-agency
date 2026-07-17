import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Packages from "@/components/sections/Packages";
import Why from "@/components/sections/Why";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingContact from "@/components/sections/FloatingContact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Journey />
        <Packages />
        <Why />
        <Gallery />
        <Testimonials />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
