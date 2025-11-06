import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Gift, Eye, Users, Sparkles, CheckCircle2 } from "lucide-react";

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
      <div className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Branded Books for Law Firms
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Custom Coloring Books & Journals That Keep Your Brand Visible Every Day
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create memorable experiences with professionally designed branded books featuring your law firm's logo, colors, and message. Perfect gifts that clients cherish and use daily.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="text-lg px-8">
                  Get Started Today
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Results Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Brand Visibility</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">365 Days</div>
                <div className="text-muted-foreground">Year-Round Exposure</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">2+ Years</div>
                <div className="text-muted-foreground">Client Retention</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Powerful Features for Lasting Impressions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional branded products that showcase your law firm's commitment to excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Custom Coloring Books</h3>
                <p className="text-muted-foreground">
                  Engage clients and their families with fun, branded coloring books tailored to reflect your firm's message and personality.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Gift className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Professional Journals</h3>
                <p className="text-muted-foreground">
                  High-quality personalized journals with your logo and colors that clients use daily for notes and reflections.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Increased Brand Visibility</h3>
                <p className="text-muted-foreground">
                  Keep your firm's name on display in clients' homes and offices every day, reinforcing your relationship.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Client Engagement</h3>
                <p className="text-muted-foreground">
                  Create emotional connections that traditional marketing materials can't match through unique, useful products.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Custom Content</h3>
                <p className="text-muted-foreground">
                  Fully customizable designs featuring your branding, educational content, legal tips, or motivational messages.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Perfect for Giveaways</h3>
                <p className="text-muted-foreground">
                  Ideal for client gifts, community events, consultations, and welcome packages that leave lasting impressions.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Success Story</h2>
                <p className="text-xl text-primary font-semibold">Thompson & Associates Law Firm</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary">Challenge</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Thompson & Associates wanted to stand out in a competitive market and build stronger relationships with clients beyond traditional marketing materials. They needed a unique way to stay top-of-mind with clients and their families.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary">Solution</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Bizooma created custom coloring books for families and professional journals for clients. The coloring books featured engaging illustrations and educational legal tips, while journals included inspirational quotes and the firm's core values on every page.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary">Results</span>
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>85% increase in client referrals within 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Clients reported feeling more connected to the firm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Social media engagement increased by 120% from clients sharing photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Books became conversation starters at community events</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              What Law Firms Are Saying
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "The branded journals have been a game-changer for our client relationships. Every meeting starts with clients thanking us for such a thoughtful gift. Our logo is everywhere!"
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Sarah Martinez</p>
                  <p className="text-sm text-muted-foreground">Managing Partner, Martinez Law Group</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "The coloring books are brilliant! Families love them, and it's created such positive associations with our firm. We've seen a significant uptick in referrals from happy clients."
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Senior Partner, Chen & Associates</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "Quality is exceptional, and the customization options allowed us to perfectly represent our brand. These books are conversation starters at every event we attend."
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Jennifer Wilson</p>
                  <p className="text-sm text-muted-foreground">Marketing Director, Wilson Legal</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Flexible Pricing Options
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the perfect package for your law firm's needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Starter Package</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$1,499</div>
                  <p className="text-muted-foreground">Perfect for small firms</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>100 custom books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Basic design customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Your logo & colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>4-6 week delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Get Started</Button>
              </Card>

              <Card className="p-8 border-2 border-primary hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Professional Package</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$3,999</div>
                  <p className="text-muted-foreground">Best for growing firms</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>300 custom books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Full design customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Custom content & illustrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>3-4 week delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Digital preview before printing</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise Package</h3>
                  <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                  <p className="text-muted-foreground">For large firms</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>500+ custom books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Premium design customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Multiple product types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Expedited delivery options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ongoing design support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">What types of branded books can Bizooma create for my law firm?</h3>
                <p className="text-muted-foreground">
                  Bizooma specializes in creating custom-branded coloring books and journals. These books can be designed to feature your law firm's logo, colors, and message, offering unique and engaging gifts for your clients. Whether you want a fun, family-friendly coloring book or a professional journal, we tailor each product to reflect your brand.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">How can branded books help my law firm's marketing efforts?</h3>
                <p className="text-muted-foreground">
                  Branded books are a powerful tool for enhancing brand visibility and creating lasting impressions with your clients. By providing your clients with high-quality, useful products that prominently feature your logo and message, you ensure that your firm stays top of mind and is consistently visible in their home or office.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Can I customize the content of the coloring books and journals?</h3>
                <p className="text-muted-foreground">
                  Yes! We work closely with you to customize the content of both the coloring books and journals. Whether you want to include educational information, legal tips, motivational messages, or fun illustrations, we can design the content to align with your law firm's values and engage your target audience effectively.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">How long does it take to create and deliver branded books?</h3>
                <p className="text-muted-foreground">
                  The timeline for creating and delivering branded books depends on the complexity of the design and the quantity of books needed. Typically, the process takes around 4-6 weeks from the initial consultation to the final delivery. We provide regular updates and ensure your books are delivered on time and to your satisfaction.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">How do I distribute the branded books to my clients?</h3>
                <p className="text-muted-foreground">
                  Once your branded books are ready, we provide you with the finished products for distribution. You can hand them out at consultations, community events, or as part of a client welcome package. They also make great giveaways for promotional purposes or client appreciation gifts. We work with you to ensure these books reach your clients in the most effective way.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Create Lasting Impressions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Give your clients a unique, thoughtful gift they'll cherish and use for years to come. Keep your law firm's brand front and center every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
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
