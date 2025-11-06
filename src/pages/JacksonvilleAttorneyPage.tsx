
import JacksonvilleHero from "@/components/jacksonville/JacksonvilleHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";

const JacksonvilleAttorneyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <JacksonvilleHero />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default JacksonvilleAttorneyPage;
