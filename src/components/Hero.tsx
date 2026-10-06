import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import techBg from "@/assets/hero-tech-bg.jpg";
import { trackPhoneClick, trackCTAClick } from "@/utils/gtmTracking";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { home } from "@/content/home";

const Hero = () => {
  const h = home.hero;
  return (
    <section id="home" className="relative flex items-center pt-28 pb-20 section-padding overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ResponsiveImage src={techBg} alt="" sizes="100vw" widths={[640, 1024, 1280, 1536, 1920]} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-legal-primary/90 via-legal-primary/70 to-legal-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-legal-primary/60" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl animate-fade-in text-primary-foreground">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] mb-5 opacity-90">{h.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight [text-wrap:balance]">{h.title}</h1>
          <p className="text-lg md:text-xl mb-8 text-legal-light max-w-2xl">{h.lede}</p>
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <Button asChild className="bg-white hover:bg-legal-accent text-legal-primary hover:text-white px-8 py-6 text-lg font-semibold shadow-lg">
              <Link to={h.primary.href} onClick={() => trackCTAClick(h.primary.label, 'Hero Section')}>{h.primary.label}<ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Link to={h.secondary.href} className="text-lg font-semibold underline underline-offset-4 hover:opacity-80">{h.secondary.label}</Link>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Phone size={20} className="mr-2" />
              <a href={h.phone.href} onClick={() => trackPhoneClick(h.phone.label, 'Hero Section')} className="text-lg hover:underline">{h.phone.label}</a>
            </div>
            <p className="opacity-90">{h.office}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
