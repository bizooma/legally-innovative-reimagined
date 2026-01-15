import { FileText, Sparkles } from "lucide-react";

interface ProposalHeroProps {
  clientName: string;
  subtitle?: string;
}

const ProposalHero = ({ clientName, subtitle }: ProposalHeroProps) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-legal-dark via-legal-primary/20 to-legal-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-legal-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-legal-primary/20 border border-legal-primary/30 mb-8">
          <Sparkles className="w-4 h-4 text-legal-primary" />
          <span className="text-sm text-legal-primary font-medium">Exclusive Proposal</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Prepared For
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-legal-primary mb-6">
          {clientName}
        </h2>
        
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {/* Intro text */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-400 leading-relaxed">
            At Bizooma, we specialize in helping nonprofit organizations amplify their digital presence 
            and engage supporters more effectively. This proposal outlines two powerful solutions 
            designed specifically for your foundation's needs.
          </p>
        </div>
        
        {/* Visual divider */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-legal-primary/50" />
          <FileText className="w-6 h-6 text-legal-primary" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-legal-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default ProposalHero;
