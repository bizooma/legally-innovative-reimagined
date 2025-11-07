import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gift, Eye, Users, Sparkles, Check } from "lucide-react";
import brandedBooksShowcase from "@/assets/branded-books-showcase.jpg";
import brandedBooksGallery from "@/assets/branded-books-gallery.jpg";

const BrandedBooksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Branded Books for Law Firms | Custom Coloring Books & Journals | Bizooma</title>
        <meta 
          name="description" 
          content="Create lasting impressions with custom branded coloring books and journals for your law firm. Professional, memorable gifts that keep your brand visible every day." 
        />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Branded Books for Law Firms
              </h1>
              <p className="text-xl mb-8 text-legal-light">
                Custom Coloring Books & Journals That Keep Your Brand Visible Every Day. Create memorable experiences with professionally designed branded books featuring your law firm's logo, colors, and message.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light" asChild>
                  <a href="https://tidycal.com/bizooma/30-minute-meeting" target="_blank" rel="noopener noreferrer">
                    Let's Chat About Your Ideas
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Results */}
        <section className="py-12 bg-legal-light/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">100%</div>
                <div className="text-gray-700">Brand Visibility</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">365 Days</div>
                <div className="text-gray-700">Year-Round Exposure</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-legal-primary mb-2">2+ Years</div>
                <div className="text-gray-700">Client Retention</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                See Our Work in Action
              </h2>
              <p className="text-center text-gray-700 mb-8 text-lg">
                Custom coloring books and journals designed to engage clients and keep your brand visible
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src={brandedBooksShowcase} 
                    alt="Custom branded coloring books showing bilingual content and animal-themed illustrations for law firm marketing" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src={brandedBooksGallery} 
                    alt="Law firm branded coloring book featuring bilingual animal illustrations including tiger and cow characters for client engagement" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Powerful Features for Lasting Impressions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: "Custom Coloring Books", description: "Engage clients and their families with fun, branded coloring books tailored to reflect your firm's message and personality." },
                { icon: Gift, title: "Professional Journals", description: "High-quality personalized journals with your logo and colors that clients use daily for notes and reflections." },
                { icon: Eye, title: "Increased Brand Visibility", description: "Keep your firm's name on display in clients' homes and offices every day, reinforcing your relationship." },
                { icon: Users, title: "Client Engagement", description: "Create emotional connections that traditional marketing materials can't match through unique, useful products." },
                { icon: Sparkles, title: "Custom Content", description: "Fully customizable designs featuring your branding, educational content, legal tips, or motivational messages." },
                { icon: Check, title: "Perfect for Giveaways", description: "Ideal for client gifts, community events, consultations, and welcome packages that leave lasting impressions." }
              ].map((feature, index) => (
                <Card key={index} className="border-legal-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-legal-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-legal-dark">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-legal-dark">
                Success Story: Thompson & Associates Law Firm
              </h2>
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Challenge</h3>
                    <p className="text-gray-700 mb-4">
                      Thompson & Associates wanted to stand out in a competitive market and build stronger relationships with clients beyond traditional marketing materials. They needed a unique way to stay top-of-mind with clients and their families.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Solution</h3>
                    <p className="text-gray-700 mb-4">
                      Bizooma created custom coloring books for families and professional journals for clients. The coloring books featured engaging illustrations and educational legal tips, while journals included inspirational quotes and the firm's core values on every page.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-legal-primary">The Results</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">85% increase in client referrals within 6 months</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Clients reported feeling more connected to the firm</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Social media engagement increased by 120% from clients sharing photos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-6 h-6 text-legal-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Books became conversation starters at community events</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              What Law Firms Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "The branded journals have been a game-changer for our client relationships. Every meeting starts with clients thanking us for such a thoughtful gift. Our logo is everywhere!"
                  </p>
                  <div className="border-t border-legal-primary/20 pt-4">
                    <p className="font-bold text-legal-dark">Sarah Martinez</p>
                    <p className="text-sm text-gray-600">Managing Partner, Martinez Law Group</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "The coloring books are brilliant! Families love them, and it's created such positive associations with our firm. We've seen a significant uptick in referrals from happy clients."
                  </p>
                  <div className="border-t border-legal-primary/20 pt-4">
                    <p className="font-bold text-legal-dark">Michael Chen</p>
                    <p className="text-sm text-gray-600">Senior Partner, Chen & Associates</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "Quality is exceptional, and the customization options allowed us to perfectly represent our brand. These books are conversation starters at every event we attend."
                  </p>
                  <div className="border-t border-legal-primary/20 pt-4">
                    <p className="font-bold text-legal-dark">Jennifer Wilson</p>
                    <p className="text-sm text-gray-600">Marketing Director, Wilson Legal</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-legal-light/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-legal-dark">
              Pricing
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg">
              Simple, transparent pricing for your law firm
            </p>
            <div className="max-w-md mx-auto">
              <Card className="border-legal-primary border-2 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center text-legal-dark">Starter Package</h3>
                  <div className="mb-6 text-center">
                    <span className="text-4xl font-bold text-legal-primary">$1,499</span>
                    <span className="text-gray-600 ml-2">one-time</span>
                  </div>
                  <p className="text-gray-700 mb-6 text-center">Perfect for small firms</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-legal-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">100 custom books</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-legal-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic design customization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-legal-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Your logo & colors</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-legal-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">4-6 week delivery</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-legal-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-legal-primary hover:bg-legal-dark text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-legal-dark">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">What types of branded books can Bizooma create for my law firm?</h3>
                  <p className="text-gray-700">
                    Bizooma specializes in creating custom-branded coloring books and journals. These books can be designed to feature your law firm's logo, colors, and message, offering unique and engaging gifts for your clients. Whether you want a fun, family-friendly coloring book or a professional journal, we tailor each product to reflect your brand.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">How can branded books help my law firm's marketing efforts?</h3>
                  <p className="text-gray-700">
                    Branded books are a powerful tool for enhancing brand visibility and creating lasting impressions with your clients. By providing your clients with high-quality, useful products that prominently feature your logo and message, you ensure that your firm stays top of mind and is consistently visible in their home or office.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">Can I customize the content of the coloring books and journals?</h3>
                  <p className="text-gray-700">
                    Yes! We work closely with you to customize the content of both the coloring books and journals. Whether you want to include educational information, legal tips, motivational messages, or fun illustrations, we can design the content to align with your law firm's values and engage your target audience effectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">How long does it take to create and deliver branded books?</h3>
                  <p className="text-gray-700">
                    The timeline for creating and delivering branded books depends on the complexity of the design and the quantity of books needed. Typically, the process takes around 4-6 weeks from the initial consultation to the final delivery. We provide regular updates and ensure your books are delivered on time and to your satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-legal-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-legal-dark">How do I distribute the branded books to my clients?</h3>
                  <p className="text-gray-700">
                    Once your branded books are ready, we provide you with the finished products for distribution. You can hand them out at consultations, community events, or as part of a client welcome package. They also make great giveaways for promotional purposes or client appreciation gifts. We work with you to ensure these books reach your clients in the most effective way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-gradient-to-br from-legal-primary to-legal-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Lasting Impressions?
            </h2>
            <p className="text-xl mb-8 text-legal-light max-w-2xl mx-auto">
              Give your clients a unique, thoughtful gift they'll cherish and use for years to come. Keep your law firm's brand front and center every day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-legal-primary hover:bg-legal-light">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default BrandedBooksPage;
