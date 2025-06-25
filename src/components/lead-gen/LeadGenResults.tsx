
const LeadGenResults = () => {
  const results = [
    {
      metric: "500%",
      label: "Increase in qualified leads",
      description: "Average improvement in lead quality and quantity within 6 months"
    },
    {
      metric: "24/7",
      label: "Lead capture capability",
      description: "Never miss a potential client with always-on systems"
    },
    {
      metric: "85%",
      label: "Lead to client conversion",
      description: "Conversion rate with proper nurturing and follow-up"
    },
    {
      metric: "3x",
      label: "Faster response times",
      description: "Automated systems ensure immediate lead acknowledgment"
    }
  ];

  const testimonials = [
    {
      quote: "Our lead generation system transformed our practice. We went from struggling to find clients to having a consistent pipeline of qualified prospects.",
      author: "Sarah Johnson",
      firm: "Johnson & Associates",
      practice: "Personal Injury Law"
    },
    {
      quote: "The automated nurturing sequences have been game-changing. We're converting 3x more leads into paying clients than before.",
      author: "Michael Chen",
      firm: "Chen Legal Group",
      practice: "Business Law"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Proven Results for Law Firms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our lead generation systems deliver consistent, measurable results 
            that help law firms grow their client base and increase revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-legal-primary mb-2">
                {result.metric}
              </div>
              <div className="text-xl font-semibold text-legal-dark mb-2">
                {result.label}
              </div>
              <p className="text-gray-600">{result.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8">
              <div className="text-2xl text-legal-primary mb-4">"</div>
              <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="border-t pt-4">
                <div className="font-semibold text-legal-dark">{testimonial.author}</div>
                <div className="text-legal-primary">{testimonial.firm}</div>
                <div className="text-gray-600 text-sm">{testimonial.practice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadGenResults;
