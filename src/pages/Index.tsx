import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import SpecialOffers from "@/components/SpecialOffers";
import InfoFooter from "@/components/InfoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main>
        <HeroSection />
        <FeaturedSection />
        <SpecialOffers />
        <InfoFooter />
      </main>
      <MobileNav />
    </div>
  );
};

export default Index;
