
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DIY = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-legal-dark">
              DIY Legal Resources
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-gray-700 mb-6">
                Welcome to our DIY legal resources section. Here you'll find tools, templates, and guides 
                to help you handle common legal tasks for your business or personal needs.
              </p>
              
              <h2 className="text-2xl font-semibold text-legal-primary mt-8 mb-4">
                Free Templates & Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Simple NDA Template</h3>
                  <p className="text-gray-600 mb-4">A straightforward non-disclosure agreement template suitable for most business situations.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Template</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Client Service Agreement</h3>
                  <p className="text-gray-600 mb-4">Protect your business with our professional service agreement template.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Template</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Legal Checklist for Startups</h3>
                  <p className="text-gray-600 mb-4">Essential legal considerations when launching your new business.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Checklist</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">GDPR Compliance Guide</h3>
                  <p className="text-gray-600 mb-4">A practical guide to understanding and implementing GDPR requirements.</p>
                  <Button className="bg-legal-primary hover:bg-legal-secondary">Download Guide</Button>
                </div>
              </div>
              
              <div className="bg-legal-light/30 p-6 rounded-lg border border-legal-light mt-12">
                <h3 className="text-xl font-semibold mb-3">Need Custom Legal Solutions?</h3>
                <p>
                  While these DIY resources are helpful for many situations, complex legal matters often require 
                  professional guidance. Contact us today to discuss your specific needs.
                </p>
                <Button 
                  className="bg-legal-primary hover:bg-legal-secondary mt-4"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DIY;
