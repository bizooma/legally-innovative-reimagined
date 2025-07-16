import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

const StayInformed = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Legal Practice: Transforming Law Firms",
      excerpt: "Discover how artificial intelligence is revolutionizing the legal industry and what it means for modern law firms.",
      date: "2024-01-15",
      readTime: "5 min read",
      author: "Legal Tech Team",
      category: "AI Technology",
      image: "/lovable-uploads/0e8bdb38-d5a7-4ced-b3d0-d0a37c64ac55.png"
    },
    {
      id: 2,
      title: "Digital Marketing Strategies That Convert Legal Leads",
      excerpt: "Learn proven digital marketing tactics specifically designed for law firms to attract and convert high-quality leads.",
      date: "2024-01-10",
      readTime: "7 min read",
      author: "Marketing Experts",
      category: "Digital Marketing",
      image: "/lovable-uploads/26a458f4-c2a1-4548-8dc8-ac6039a1a1e0.png"
    },
    {
      id: 3,
      title: "Voice Search Optimization: The Next Frontier for Law Firms",
      excerpt: "Understanding how voice search is changing legal discovery and how your firm can optimize for this growing trend.",
      date: "2024-01-05",
      readTime: "6 min read",
      author: "SEO Specialists",
      category: "SEO",
      image: "/lovable-uploads/414ce62c-05f7-4a1a-a76e-328c8a4fb9fb.png"
    },
    {
      id: 4,
      title: "Building Client Trust Through Modern Website Design",
      excerpt: "How modern, responsive website design builds credibility and trust with potential legal clients.",
      date: "2023-12-28",
      readTime: "4 min read",
      author: "Design Team",
      category: "Web Development",
      image: "/lovable-uploads/429b2bde-e490-457e-89c8-e3a1d9fc62a7.png"
    },
    {
      id: 5,
      title: "Mobile Apps for Law Firms: Enhancing Client Experience",
      excerpt: "Explore how custom mobile applications can improve client communication and streamline legal processes.",
      date: "2023-12-20",
      readTime: "5 min read",
      author: "Development Team",
      category: "Mobile Development",
      image: "/lovable-uploads/59e51f8e-610f-44a9-9530-a964b738ff51.png"
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
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
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
            ))}
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