import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleLayoutProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image?: string;
  children: ReactNode;
}

const ArticleLayout = ({
  title,
  excerpt,
  date,
  readTime,
  author,
  category,
  image,
  children
}: ArticleLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-legal-dark via-legal-primary to-legal-secondary pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/stay-informed" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Stay Informed
          </Link>
          
          {/* Article Header */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
            </div>

            {/* SoundCloud Audio Player */}
            <div className="mt-8 max-w-2xl mx-auto">
              <iframe 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameBorder="0" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2209769015&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                className="rounded-lg"
              />
              <div className="text-xs text-white/60 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                <a 
                  href="https://soundcloud.com/joseph-murphy-350953080" 
                  title="Joseph Murphy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/80 transition-colors no-underline"
                >
                  Joseph Murphy
                </a>
                {" · "}
                <a 
                  href="https://soundcloud.com/joseph-murphy-350953080/legal_marketing_survival" 
                  title="Legal Marketing Survival SEO is Dead, Meet GEO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/80 transition-colors no-underline"
                >
                  Legal Marketing Survival SEO is Dead, Meet GEO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ArticleLayout;