import amarilloChamberLogo from "@/assets/amarillo-chamber-logo.png";
import clayChamberLogo from "@/assets/clay-chamber-logo.png";

const ChamberMemberships = () => {
  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-muted-foreground mb-6">
          Bizooma is a proud member of
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          <img
            src={amarilloChamberLogo}
            alt="Amarillo Chamber of Commerce"
            className="h-16 md:h-20 w-auto object-contain"
          />
          <img
            src={clayChamberLogo}
            alt="Clay Chamber of Commerce"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ChamberMemberships;
