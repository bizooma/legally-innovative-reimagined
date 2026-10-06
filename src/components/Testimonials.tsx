import { testimonials } from "@/content/testimonials";
import { home } from "@/content/home";

/** Renders nothing at all until a real, attributed testimonial exists. */
const Testimonials = () => {
  if (testimonials.length === 0) return null;
  return (
    <section className="product-band">
      <div className="product-inner">
        <h2 className="product-heading">{home.testimonialsTitle}</h2>
        <div className="product-grid product-grid-shelf">
          {testimonials.map((t) => (
            <figure key={`${t.name}-${t.organization}`} className="product-shelf-item">
              <blockquote><p>“{t.quote}”</p></blockquote>
              <figcaption className="mt-4 text-sm"><strong>{t.name}</strong>, {t.role}, {t.organization}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
