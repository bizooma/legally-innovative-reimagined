import ArticleLayout from "@/components/ArticleLayout";
import { MessageSquareQuote, ListOrdered, FileText, Building2, Scale, Layers, CheckCircle2, Lightbulb, Wrench } from "lucide-react";
import schemaHeroImage from "@/assets/schema-markup-hero.jpg";

const SchemaTypeCard = ({ 
  icon: Icon, 
  number, 
  title, 
  subtitle,
  description, 
  whyItMatters, 
  howToImplement, 
  bestPractices 
}: { 
  icon: React.ElementType;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  whyItMatters: string;
  howToImplement: string;
  bestPractices: string;
}) => (
  <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
    <div className="bg-gradient-to-r from-legal-primary to-legal-secondary p-4 flex items-center gap-4">
      <div className="bg-white/20 rounded-full p-3">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <span className="text-white/80 text-sm font-medium">Schema Type #{number}</span>
        <h3 className="text-xl font-bold text-white m-0">{title}</h3>
        <p className="text-white/90 text-sm m-0">{subtitle}</p>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <p className="text-muted-foreground m-0">{description}</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-legal-accent" />
            <span className="font-semibold text-sm text-foreground">Why It Matters</span>
          </div>
          <p className="text-sm text-muted-foreground m-0">{whyItMatters}</p>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-legal-primary" />
            <span className="font-semibold text-sm text-foreground">How to Implement</span>
          </div>
          <p className="text-sm text-muted-foreground m-0">{howToImplement}</p>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-sm text-foreground">Best Practices</span>
          </div>
          <p className="text-sm text-muted-foreground m-0">{bestPractices}</p>
        </div>
      </div>
    </div>
  </div>
);

const SchemaMarkupFeaturedSnippetsPage = () => {
  const faqs = [
    {
      question: "What is schema markup and why does it matter for law firms?",
      answer: "Schema markup is structured data that helps search engines understand your content better. For attorneys competing in crowded markets, this technical edge can mean the difference between being found by potential clients or being buried on page two of search results."
    },
    {
      question: "What is the best schema type for winning featured snippets?",
      answer: "FAQ schema is perhaps the most powerful tool in an attorney's SEO arsenal. This markup explicitly tells search engines that your content answers specific questions, which is exactly what featured snippets are designed to display."
    },
    {
      question: "How do I validate my schema markup?",
      answer: "Before publishing, always validate your schema markup using Google's Rich Results Test tool or the Schema Markup Validator. These free tools will identify errors and show you how your markup appears to search engines."
    },
    {
      question: "Can I use multiple schema types on one page?",
      answer: "Yes, the real power comes from using multiple schema types together. For example, an article about choosing an attorney might include Article schema, FAQ schema, HowTo schema, and Organization schema for comprehensive coverage."
    },
    {
      question: "Does schema markup guarantee featured snippets?",
      answer: "No, having valid schema markup doesn't guarantee featured snippets—your content still needs to be high-quality, accurate, and genuinely helpful. But schema markup ensures that when your content deserves to be featured, search engines have everything they need to recognize and display it prominently."
    }
  ];

  const schemaTypes = [
    {
      icon: MessageSquareQuote,
      number: 1,
      title: "FAQ Schema",
      subtitle: "Your Secret Weapon for Featured Snippets",
      description: "FAQ schema is perhaps the most powerful tool in an attorney's SEO arsenal. This markup explicitly tells search engines that your content answers specific questions, which is exactly what featured snippets are designed to display.",
      whyItMatters: "Google frequently pulls featured snippets from FAQ-formatted content. When you mark up your questions and answers with FAQ schema, you're essentially handing Google the exact format it prefers.",
      howToImplement: "Add FAQ schema to pages where you answer common legal questions like \"How long do I have to file a personal injury claim?\" or \"What damages can I recover in a slip and fall case?\"",
      bestPractices: "Keep answers concise (40-60 words), use clear language that non-lawyers can understand, and address questions your potential clients are actually searching for."
    },
    {
      icon: ListOrdered,
      number: 2,
      title: "HowTo Schema",
      subtitle: "Stand Out for Process-Based Queries",
      description: "HowTo schema is ideal for content that explains legal processes step-by-step, such as \"how to file for divorce\" or \"how to respond to a lawsuit.\"",
      whyItMatters: "This schema type can trigger rich results that display your steps directly in search results, complete with images. These enhanced listings occupy more screen real estate and attract more clicks.",
      howToImplement: "Structure your content with clear, sequential steps. Mark up each step with appropriate schema properties, including step name, text, and optionally, images or videos.",
      bestPractices: "Break complex legal processes into 5-10 digestible steps. Use action-oriented language and include estimated time frames where relevant."
    },
    {
      icon: FileText,
      number: 3,
      title: "Article Schema",
      subtitle: "Establish Credibility and Topical Authority",
      description: "Article schema helps search engines understand that your content is a substantial, informative piece rather than a simple webpage. This is crucial for blog posts, legal guides, and resource articles.",
      whyItMatters: "While Article schema doesn't directly trigger featured snippets, it provides essential context that helps search engines evaluate your content's credibility, freshness, and relevance.",
      howToImplement: "Include properties like headline, author (with attorney credentials), date published, date modified, publisher information, and article body.",
      bestPractices: "Always credit the attorney author with their full credentials. Keep articles updated and modify the dateModified property when you refresh content."
    },
    {
      icon: Building2,
      number: 4,
      title: "Organization Schema",
      subtitle: "Build Your Firm's Knowledge Graph Presence",
      description: "Organization schema tells search engines who you are, what you do, and how to contact you. This is fundamental structured data that every law firm website should implement.",
      whyItMatters: "This schema helps your firm appear in knowledge panels, local pack results, and branded searches. It connects all your online properties into a cohesive entity search engines recognize.",
      howToImplement: "Add Organization schema to your homepage. Include firm name, logo, contact information, address, founding date, social media profiles, and practice areas.",
      bestPractices: "Be consistent with NAP (Name, Address, Phone) across all platforms. Include links to verified social profiles and professional listings like Avvo or Martindale-Hubbell."
    },
    {
      icon: Scale,
      number: 5,
      title: "Attorney Schema",
      subtitle: "Highlight Your Legal Credentials",
      description: "Attorney schema (or LegalService schema for firms) is specifically designed for legal professionals and allows you to mark up credentials, practice areas, bar admissions, and qualifications.",
      whyItMatters: "This specialized schema helps you appear in legal-specific searches and establishes your credentials directly in the structured data. It's particularly valuable for \"attorney near me\" searches.",
      howToImplement: "On attorney bio pages, mark up each lawyer's name, credentials, bar admissions, education, practice areas, awards, and contact information.",
      bestPractices: "Include specific practice areas rather than generic terms. Mark up each attorney individually and use aggregateRating schema if you have sufficient client reviews."
    }
  ];

  return (
    <ArticleLayout
      title="How to Use Schema Markup to Win Featured Snippets: A Guide for Attorneys"
      excerpt="Learn how to leverage the five essential schema types—FAQ, HowTo, Article, Organization, and Attorney—to capture position zero and dominate search results for your law firm."
      date="December 23, 2025"
      
      author="SEO Strategy Team"
      category="SEO"
      image={schemaHeroImage}
      faqs={faqs}
    >
      {/* Lead Paragraph */}
      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
        Featured snippets—those coveted "position zero" results at the top of Google search results—can dramatically increase your law firm's visibility and drive qualified traffic to your website. While quality content is essential, there's a technical advantage many attorneys overlook: <strong className="text-foreground">schema markup</strong>.
      </p>

      <p className="text-lg leading-relaxed">
        Schema markup is structured data that helps search engines understand your content better. When implemented correctly, it significantly increases your chances of capturing featured snippets and enhancing your search presence. Here's how attorneys can leverage the most important schema types to dominate search results.
      </p>

      {/* Why Schema Matters Section */}
      <div className="my-12 p-6 bg-gradient-to-r from-legal-primary/10 to-legal-secondary/10 rounded-xl border border-legal-primary/20">
        <h2 className="text-2xl font-bold text-foreground mt-0 mb-4 flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-legal-accent" />
          Why Schema Markup Matters for Featured Snippets
        </h2>
        <p className="text-muted-foreground m-0 leading-relaxed">
          Search engines want to provide users with quick, accurate answers. Schema markup essentially translates your content into a language that search engines can easily process, making it more likely that your content will be selected for <strong className="text-foreground">featured snippets</strong>, <strong className="text-foreground">knowledge panels</strong>, and <strong className="text-foreground">rich results</strong>. For attorneys competing in crowded markets, this technical edge can mean the difference between being found by potential clients or being buried on page two of search results.
        </p>
      </div>

      {/* The Five Essential Schema Types */}
      <h2 className="text-3xl font-bold text-foreground mt-12 mb-2">The Five Essential Schema Types for Attorneys</h2>
      <p className="text-muted-foreground mb-8">Master these five schema types to maximize your law firm's search visibility and capture featured snippets.</p>

      {schemaTypes.map((schema) => (
        <SchemaTypeCard key={schema.number} {...schema} />
      ))}

      {/* Combining Schema Types */}
      <div className="my-12 p-6 bg-card rounded-xl border border-border">
        <h2 className="text-2xl font-bold text-foreground mt-0 mb-4 flex items-center gap-3">
          <Layers className="h-6 w-6 text-legal-primary" />
          Combining Schema Types for Maximum Impact
        </h2>
        <p className="text-muted-foreground mb-4">
          The real power comes from using multiple schema types together. For example, an article about "How to Choose a Personal Injury Attorney" might include:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span><strong>Article schema</strong> for the overall piece</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span><strong>FAQ schema</strong> for common questions within the article</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span><strong>HowTo schema</strong> for the steps in evaluating attorneys</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span><strong>Organization schema</strong> connecting to your firm</span>
          </li>
        </ul>
        <p className="text-muted-foreground m-0">
          This layered approach provides search engines with comprehensive context about your content, increasing the likelihood of appearing in multiple types of featured snippets and rich results.
        </p>
      </div>

      {/* Testing and Validation */}
      <div className="my-12 p-6 bg-accent/50 rounded-xl border border-border">
        <h2 className="text-2xl font-bold text-foreground mt-0 mb-4 flex items-center gap-3">
          <Wrench className="h-6 w-6 text-legal-secondary" />
          Testing and Validation
        </h2>
        <p className="text-muted-foreground mb-4">
          Before publishing, always validate your schema markup using <strong className="text-foreground">Google's Rich Results Test tool</strong> or the <strong className="text-foreground">Schema Markup Validator</strong>. These free tools will identify errors and show you how your markup appears to search engines.
        </p>
        <p className="text-muted-foreground m-0">
          Remember that having valid schema markup doesn't guarantee featured snippets—your content still needs to be high-quality, accurate, and genuinely helpful. But schema markup ensures that when your content deserves to be featured, search engines have everything they need to recognize and display it prominently.
        </p>
      </div>

      {/* Bottom Line */}
      <div className="my-12 p-6 bg-gradient-to-r from-legal-dark to-legal-primary rounded-xl text-white">
        <h2 className="text-2xl font-bold text-white mt-0 mb-4">The Bottom Line</h2>
        <p className="text-white/90 mb-4">
          Schema markup isn't just technical SEO busywork—it's a strategic advantage that helps your law firm compete for visibility in an increasingly crowded digital landscape. By implementing these five essential schema types, you're not just making your website more search-engine-friendly; you're positioning your firm to capture the most valuable real estate in search results: <strong className="text-white">position zero</strong>.
        </p>
        <p className="text-white/90 m-0">
          Start with FAQ schema on your most frequently visited content, then expand to the other types as you develop your content strategy. The attorneys who master this technical element of SEO will find themselves consistently outranking competitors who rely on content quality alone.
        </p>
      </div>
    </ArticleLayout>
  );
};

export default SchemaMarkupFeaturedSnippetsPage;
