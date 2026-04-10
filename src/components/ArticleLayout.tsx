import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import SocialShare from "@/components/SocialShare";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface FAQ {
  question: string;
  answer: string;
}

interface ArticleLayoutProps {
  title: string;
  excerpt: string;
  date: string;
  
  author: string;
  category: string;
  image?: string;
  audioEmbed?: ReactNode;
  faqs?: FAQ[];
  children: ReactNode;
}

const ArticleLayout = ({
  title,
  excerpt,
  date,
  
  author,
  category,
  image,
  audioEmbed,
  faqs,
  children
}: ArticleLayoutProps) => {
  const location = useLocation();
  const siteUrl = "https://bizooma.com";
  const currentUrl = `${siteUrl}${location.pathname}`;
  const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": excerpt,
    "image": ogImage,
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bizooma",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/lovable-uploads/6c062279-8370-45d7-9334-45ada83333a1.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleSection": category
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen">
      <Helmet>
        {/* Open Graph Meta Tags */}
        <title>{title} | Bizooma</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={date} />
        <meta property="article:author" content={author} />
        <meta property="article:section" content={category} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Structured Data - Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        
        {/* Structured Data - FAQ Schema */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      
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
            <div className="flex items-center justify-center gap-6 text-white/80 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(date + 'T00:00:00').toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex justify-center">
              <SocialShare title={title} />
            </div>

            {/* Audio Player - Optional */}
            {audioEmbed && (
              <div className="mt-8 max-w-2xl mx-auto">
                {audioEmbed}
              </div>
            )}
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
          
          {/* Social Share - Bottom */}
          <div className="mt-12 pt-8 border-t border-border flex justify-center">
            <SocialShare title={title} />
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ArticleLayout;