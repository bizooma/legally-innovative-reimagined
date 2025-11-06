
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      category: "AI Consulting",
      questions: [
        {
          question: "How can AI consulting benefit my company?",
          answer: "AI consulting can benefit your company by identifying opportunities to automate repetitive tasks, enhance client interactions through intelligent systems, and provide data-driven insights for better decision-making. Our consultants analyze your specific needs and implement AI solutions that increase efficiency and reduce operational costs."
        },
        {
          question: "What is the typical timeline for implementing AI solutions in my practice?",
          answer: "The implementation timeline varies based on the complexity of your needs, but typically ranges from 4-12 weeks. We begin with a thorough assessment (1-2 weeks), followed by solution design (1-3 weeks), implementation (2-6 weeks), and training (1-2 weeks). Throughout the process, we work closely with your team to ensure minimal disruption to your operations."
        }
      ]
    },
    {
      category: "Mobile App Development",
      questions: [
        {
          question: "What types of mobile apps can you develop for companies?",
          answer: "We develop various mobile applications tailored to companies, including client portals for updates and document sharing, appointment scheduling systems, secure messaging platforms, billing and payment apps, and custom management solutions. Each app is designed with your company's specific workflows and branding in mind."
        },
        {
          question: "Do you develop for both iOS and Android platforms?",
          answer: "Yes, we develop mobile applications for both iOS and Android platforms to ensure maximum reach for your client base. We use cross-platform development frameworks when appropriate to optimize development time and costs, while still creating native-feeling experiences tailored to each platform's design guidelines."
        }
      ]
    },
    {
      category: "Website Development",
      questions: [
        {
          question: "How long does it take to develop a professional company website?",
          answer: "A professional company website typically takes 6-10 weeks to develop, depending on the complexity and features required. This includes discovery and planning (1-2 weeks), design (2-3 weeks), development (2-4 weeks), and testing/launch (1 week). We prioritize creating websites that are not only visually impressive but also optimized for conversion and client engagement."
        },
        {
          question: "Will my website be mobile-responsive and SEO-friendly?",
          answer: "Absolutely. All our websites are built with mobile-responsiveness as a core feature, ensuring optimal viewing experiences across all devices. We also implement comprehensive SEO best practices during development, including proper heading structure, schema markup for legal services, optimized page speed, and accessible design to ensure your site performs well in search rankings."
        }
      ]
    },
    {
      category: "Digital Marketing",
      questions: [
        {
          question: "What digital marketing strategies work best for companies?",
          answer: "The most effective digital marketing strategies for companies include local SEO optimization, targeted PPC campaigns for industry-specific keywords, content marketing focusing on guides and resources, email nurturing campaigns, and reputation management. We create a custom marketing mix based on your business areas, target client base, and competitive landscape."
        },
        {
          question: "How do you measure the success of digital marketing campaigns?",
          answer: "We measure success through comprehensive analytics tracking key performance indicators specific to companies, including cost per lead acquisition, conversion rates from website visitors to consultations, organic search ranking improvements, engagement metrics, and ultimately new client acquisition. We provide transparent monthly reporting with actionable insights to continuously refine your marketing strategy."
        }
      ]
    },
    {
      category: "Google Business Profile/Bing Places",
      questions: [
        {
          question: "Why is Google Business Profile important for my company?",
          answer: "Google Business Profile is crucial for companies because it significantly impacts local search visibility. When potential clients search for services in your area, a well-optimized profile increases your chances of appearing in the valuable 'Local Pack' results. It also provides essential information like your location, hours, contact details, and showcases client reviews, all of which influence potential clients' decision-making process."
        },
        {
          question: "How do you optimize a Google Business Profile for legal services?",
          answer: "We optimize your Google Business Profile by ensuring complete and accurate business information, selecting the most relevant practice area categories, adding high-quality photos of your office and team, implementing local keywords in your business description, actively managing and responding to reviews, regularly posting updates about your services, and utilizing all available features like Q&A and booking links to maximize engagement."
        }
      ]
    },
    {
      category: "SEO/AEO",
      questions: [
        {
          question: "What's the difference between SEO and AEO for companies?",
          answer: "SEO (Search Engine Optimization) focuses on ranking your website in traditional search results by optimizing for keywords, content quality, and technical factors. AEO (Answer Engine Optimization) specifically targets voice searches and featured snippets by structuring content to directly answer questions potential clients might ask. For companies, both are important – SEO drives overall visibility while AEO captures the growing segment of voice searches and question-based queries."
        },
        {
          question: "How long does it take to see results from SEO efforts?",
          answer: "SEO for companies is typically a medium to long-term strategy, with initial improvements visible within 3-6 months. You may see some ranking improvements for less competitive keywords within the first few months, while more competitive industry keywords may take 6-12 months to show significant movement. We set realistic expectations and provide monthly progress reports tracking key metrics to demonstrate incremental improvements."
        }
      ]
    },
    {
      category: "Custom AI Chatbot",
      questions: [
        {
          question: "How can an AI chatbot benefit my company?",
          answer: "An AI chatbot provides immediate 24/7 response to potential client inquiries, qualifying leads by collecting key information, answering common questions, scheduling consultations, and reducing administrative workload. This improves client experience by providing instant engagement while ensuring your company never misses an opportunity, even outside business hours. Our chatbots can be trained on your specific business areas to provide relevant, helpful responses."
        },
        {
          question: "Can AI chatbots handle sensitive legal information securely?",
          answer: "Yes, our AI chatbots are designed with legal-grade security measures that comply with confidentiality requirements. We implement end-to-end encryption, secure data storage, and clear disclaimers about attorney-client privilege. The chatbots can be configured to collect only necessary preliminary information before connecting potential clients with an actual attorney, maintaining the appropriate balance between automation and personal service."
        }
      ]
    },
    {
      category: "Lead Generation Systems",
      questions: [
        {
          question: "What lead generation methods are most effective for companies?",
          answer: "The most effective lead generation methods for companies include optimized landing pages with strong calls-to-action, targeted PPC campaigns for high-intent keywords, educational content marketing that addresses common questions, strategic email nurture campaigns, and reputation management systems that leverage positive reviews. We create comprehensive multi-channel lead generation systems tailored to your specific business areas and ideal client profiles."
        },
        {
          question: "How do you qualify and nurture leads for legal services?",
          answer: "Our lead qualification and nurturing process for companies uses strategic intake forms that assess opportunity validity and potential value, automated email sequences providing relevant information based on the potential client's needs, retargeting campaigns to maintain visibility, and CRM integration to track all touchpoints. This systematic approach ensures you focus your valuable time on the most promising potential clients while still providing value to everyone who contacts your company."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-left max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Frequently Asked <span className="highlight-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-700">
            Find answers to common questions about our services and how we can help your company succeed in the digital landscape.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-legal-dark">{category.category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left font-medium text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
