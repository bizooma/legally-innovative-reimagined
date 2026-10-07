import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import MobileFooterNav from "@/components/MobileFooterNav";
import Testimonials from "@/components/Testimonials";
import { EditorialButton } from "@/pages/products/ProductLayout";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { home, type HomeCard } from "@/content/home";
import ArgumentDiagram from "@/components/home/ArgumentDiagram";

const CardGrid = ({ items }: { items: HomeCard[] }) => (
  <div className="product-grid product-grid-shelf">
    {items.map((item) => (
      <Link key={item.name} to={item.href} className="product-shelf-item">
        <h3>{item.name}</h3><p>{item.description}</p><ArrowUpRight aria-hidden className="h-5 w-5" />
      </Link>
    ))}
  </div>
);

const Index = () => {
  useScrollTracking({ pageName: 'Homepage' });
  const { argument, services, products, framework, whoWeAre } = home;
  return (
    <>
      <Helmet>
        <title>Bizooma | AI Marketing Agency for Law Firms & Nonprofits</title>
        <meta name="description" content="Bizooma builds AI-powered marketing, automation, and custom software for law firms and nonprofits. Jacksonville, FL." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <div className="product-editorial">
          <section className="product-band"><div className="product-inner grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="min-w-0">
              <h2 className="product-heading">{argument.title}</h2>
              <div className="product-prose">{argument.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            </div>
            <div className="min-w-0"><ArgumentDiagram /></div>
          </div></section>
          <section id="services" className="product-band product-soft"><div className="product-inner">
            <h2 className="product-heading">{services.title}</h2>
            <CardGrid items={services.items} />
            <p className="product-prose mt-10">{services.footnote.before}<Link className="product-link" to={services.footnote.href}>{services.footnote.label}</Link>{services.footnote.after}</p>
          </div></section>
          <section id="products" className="product-band"><div className="product-inner">
            <h2 className="product-heading">{products.title}</h2>
            <CardGrid items={products.items} />
            <Link className="product-link mt-10 inline-flex items-center gap-2" to={products.footnote.href}>{products.footnote.label}<ArrowUpRight className="h-4 w-4 shrink-0" /></Link>
          </div></section>
          <section className="product-band product-inverted"><div className="product-inner">
            <h2 className="product-heading">{framework.title}</h2>
            <p className="product-prose mb-8">{framework.paragraph}</p>
            <EditorialButton href={framework.button.href}>{framework.button.label}</EditorialButton>
          </div></section>
          <Testimonials />
          <section id="about" className="product-band product-soft"><div className="product-inner">
            <h2 className="product-heading">{whoWeAre.title}</h2>
            <p className="product-prose mb-6">{whoWeAre.paragraph} {home.publishingLine.before}<a className="product-link" href={home.publishingLine.href} target="_blank" rel="noopener noreferrer">{home.publishingLine.label}</a>{home.publishingLine.after}</p>
            <Link className="product-link" to={whoWeAre.link.href}>{whoWeAre.link.label}</Link>
          </div></section>
        </div>
        <Newsletter />
        <Contact />
        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};
export default Index;
