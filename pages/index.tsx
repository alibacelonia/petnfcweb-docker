import { ThemeProvider } from "next-themes";
import BlogsSection from "../components/BlogsSection";
import FAQSection from "../components/FAQSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Navbar from "../components/Navbar";
import WhyBuyOurProductSection from "../components/WhyBuyProductSection";

export default function Home() {
  return (
    <>
         {/* <ThemeProvider enableSystem={true} attribute="class"> */}
          <Navbar />  
          <main className="mx-auto sm:px-6 md:max-w-7xl max-w-7xl px-4">
            <HeroSection />
            {/* <MissionSection /> */}
            <FeaturesSection />
            <HowItWorksSection />
            <WhyBuyOurProductSection />
            <FAQSection />
            <BlogsSection />
          </main>
        <Footer/>
         {/* </ThemeProvider> */}
        </>
  )
}
