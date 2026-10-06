import amarilloChamberLogo from "@/assets/amarillo-chamber-logo.png";
import clayChamberLogo from "@/assets/clay-chamber-logo.png";
import { about } from "@/content/about";

const logos = { amarillo: amarilloChamberLogo, clay: clayChamberLogo };

const ChamberMemberships = () => {
  return (
    <section className="product-band product-soft">
      <div className="product-inner text-center">
        <p className="text-lg font-semibold text-muted-foreground mb-6">
          {about.affiliations.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {about.affiliations.items.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
              <img src={logos[item.logo]} alt={item.name} className="h-16 md:h-20 w-auto max-w-full object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChamberMemberships;
