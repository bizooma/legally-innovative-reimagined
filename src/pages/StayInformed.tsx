import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import voiceSeoHeroImage from "@/assets/voice-seo-hero.jpg";
import appleMapsInterfaceImage from "@/assets/apple-maps-interface.jpg";
import appleMapsLawFirmImage from "@/assets/apple-maps-law-firm.jpg";

const StayInformed = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Death of Traditional SEO",
      excerpt: "How artificial intelligence and changing search behaviors are fundamentally transforming the way law firms need to approach search engine optimization.",
      date: "2025-07-15",
      readTime: "8 min read",
      author: "SEO Strategy Team",
      category: "SEO",
      image: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png",
      link: "/death-of-traditional-seo"
    },
    {
      id: 2,
      title: "OpenAI's Browser Challenge: What Legal Professionals Need to Know",
      excerpt: "How OpenAI's upcoming web browser could fundamentally transform legal research, client communication, and the competitive landscape for legal technology.",
      date: "2025-07-14",
      readTime: "12 min read",
      author: "AI Technology Team",
      category: "AI Technology",
      image: "/lovable-uploads/openai-browser-legal-tech.jpg",
      link: "/openai-web-browser"
    },
    {
      id: 3,
      title: "Voice SEO and Answer Engine Optimization: Critical Statistics for Law Firms",
      excerpt: "The legal industry is experiencing a fundamental shift in how potential clients discover and engage with legal services. This comprehensive report presents compelling statistics that demonstrate why law firms must adapt their digital marketing strategies.",
      date: "2025-06-20",
      readTime: "15 min read",
      author: "SEO Strategy Team",
      category: "SEO",
      image: voiceSeoHeroImage,
      link: "/voice-seo-aeo-stats"
    },
    {
      id: 4,
      title: "Why Your Law Firm Can't Afford to Ignore Apple Maps in 2025: The Hidden Marketing Goldmine",
      excerpt: "Discover why Apple Maps is essential for law firm marketing in 2025. With 110 million users and premium clientele, learn how to claim your listing and attract high-value legal clients.",
      date: "2025-01-17",
      readTime: "15 min read",
      author: "SEO Strategy Team",
      category: "Digital Marketing",
      image: appleMapsInterfaceImage,
      link: "/apple-maps-marketing"
    },
    {
      id: 5,
      title: "Why Google Business Profiles and NAP Consistency Are Critical for Legal Practices: The 3-Pack Advantage",
      excerpt: "Discover how Google's Local Pack dominates 93% of local searches and why NAP consistency is essential for legal practice visibility and client acquisition.",
      date: "2025-01-15",
      readTime: "18 min read",
      author: "Legal Marketing Research Team",
      category: "Local SEO",
      image: appleMapsLawFirmImage,
      link: "/google-business-profile"
    },
    {
      id: 6,
      title: "Data Security and Privacy in Legal Technology",
      excerpt: "Essential considerations for maintaining client confidentiality while leveraging modern legal technology.",
      date: "2023-12-15",
      readTime: "8 min read",
      author: "Security Team",
      category: "Security",
      image: "/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png"
    }
  ];

  const categories = ["All", "AI Technology", "Digital Marketing", "SEO", "Web Development", "Mobile Development", "Security"];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-legal-dark via-legal-primary to-legal-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Stay Informed
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the latest insights, trends, and innovations in legal technology, 
            digital marketing, and law firm growth strategies.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-legal-primary hover:text-white transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const CardComponent = (
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-legal-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return post.link ? (
                <Link key={post.id} to={post.link}>
                  {CardComponent}
                </Link>
              ) : (
                <div key={post.id}>
                  {CardComponent}
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StayInformed;