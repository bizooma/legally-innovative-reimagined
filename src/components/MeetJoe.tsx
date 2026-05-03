import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Phone, Mail } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import androidEngineer from "@/assets/certifications/android-certified-application-engineer.jpg";
import flutterDeveloper from "@/assets/certifications/flutter-certified-application-developer.jpg";
import androidDeveloper from "@/assets/certifications/android-certified-application-developer.jpg";
import googleConversion from "@/assets/certifications/google-conversion-optimization.png";
import googleShopping from "@/assets/certifications/google-shopping-ads.png";
import googleAiPerformance from "@/assets/certifications/google-ads-ai-powered-performance.png";
import googleAnalytics from "@/assets/certifications/google-analytics-certified.png";

const certifications = [
  { src: androidEngineer, label: "Android Certified Application Engineer", variant: "wide" as const },
  { src: flutterDeveloper, label: "Flutter Certified Application Developer", variant: "wide" as const },
  { src: androidDeveloper, label: "Android Certified Application Developer", variant: "wide" as const },
  { src: googleConversion, label: "Google Conversion Optimization Certified", variant: "badge" as const },
  { src: googleShopping, label: "Google Shopping Ads Certified", variant: "badge" as const },
  { src: googleAiPerformance, label: "Google Ads AI-Powered Performance Certified", variant: "badge" as const },
  { src: googleAnalytics, label: "Google Analytics Certified", variant: "badge" as const },
];

const MeetJoe = () => {
  return <section id="meet-joe" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-legal-dark">
            Meet Joseph Murphy
          </h2>
          <p className="text-xl text-muted-foreground">Marketing Technologist</p>
        </div>

        <Card className="max-w-6xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <ResponsiveImage 
                src="/joe-murphy.jpg" 
                alt="Joseph Murphy - Marketing Technologist and Founder of Bizooma" 
                sizes="(max-width: 768px) 100vw, 288px"
                widths={[288, 576]}
                className="rounded-lg shadow-2xl w-full max-w-[288px] h-auto object-cover" 
              />
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/heyjoe0/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-legal-primary hover:text-legal-dark transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                
                <a 
                  href="mailto:joe@bizooma.com" 
                  className="flex items-center gap-2 text-legal-primary hover:text-legal-dark transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span className="font-medium">Email</span>
                </a>
                
                <a 
                  href="tel:+19042956670" 
                  className="flex items-center gap-2 text-legal-primary hover:text-legal-dark transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  <span className="font-medium">Call Me</span>
                </a>
              </div>
              
              <Button 
                asChild
                className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-3 mt-4"
              >
                <a 
                  href="https://tidycal.com/bizooma/30-minute-meeting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Schedule a Meeting
                </a>
              </Button>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <p className="text-lg leading-relaxed">
                Joseph Murphy is a Marketing Technologist with over 25 years of experience bridging technology and marketing. He began developing websites in 1998 and went on to build and sell his own marketing company in 2007 to a Silicon Valley firm. Combining his background in programming and strategic marketing, Joseph has led digital transformations for organizations nationwide.
              </p>

              <p className="text-lg leading-relaxed">
                As Marketing Director for a major company, he managed over $20 million in annual marketing budgets, overseeing multi-channel campaigns that delivered measurable growth and efficiency. He has also developed proprietary marketing platforms that leverage automation, analytics, and AI to scale operations and improve ROI.
              </p>

              <p className="text-lg leading-relaxed">
                Today, as a Marketing Technologist at his company, Bizooma, Joseph leads his team of developers and marketers to help companies modernize how they attract and convert clients—merging data, creativity, and technology to drive results in an increasingly competitive digital landscape.
              </p>
            </div>
          </div>

          <div className="border-t px-8 md:px-12 py-8">
            <h3 className="text-lg font-semibold text-legal-dark mb-4">
              Certifications &amp; Credentials
            </h3>
            <a
              href="https://skillshop.credential.net/profile/heyjoe/wallet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Joseph Murphy's full credential wallet (opens in new window)"
              className="group relative overflow-hidden block cursor-pointer"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              }}
            >
              <div className="flex gap-4 w-max animate-scroll-feast group-hover:[animation-play-state:paused]" style={{ animationDuration: "40s" }}>
                {[...certifications, ...certifications].map((cert, idx) => (
                  <div
                    key={`${cert.label}-${idx}`}
                    className={`shrink-0 flex flex-col items-center gap-2 ${
                      cert.variant === "wide" ? "w-72" : "w-40"
                    }`}
                  >
                    <div className="w-full rounded-lg border bg-white shadow-sm overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={cert.src}
                        alt={cert.label}
                        loading="lazy"
                        className={`object-contain ${cert.variant === "wide" ? "w-full h-40" : "w-32 h-32"}`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center leading-tight">
                      {cert.label}
                    </p>
                  </div>
                ))}
              </div>
            </a>
          </div>
        </Card>
      </div>
    </section>;
};
export default MeetJoe;