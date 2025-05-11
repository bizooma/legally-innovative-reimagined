
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const DIY = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-legal-dark">
              DIY Legal Resources
            </h1>
            
            {/* AEO Analyzer Promotional Section */}
            <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-blue-100">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="md:w-3/5">
                    <h2 className="text-2xl md:text-3xl font-bold text-legal-dark mb-4">
                      Supercharge Your SEO with AEO Analyzer
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Optimize your website for audio search engines and drive more traffic with our powerful 
                      AEO (Audio Engine Optimization) platform. Stay ahead of the competition in the voice search era.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <p className="text-gray-700">Comprehensive audio search optimization tools</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <p className="text-gray-700">Voice search keyword research and analysis</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-legal-primary p-1 text-white mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <p className="text-gray-700">Actionable insights with detailed reporting</p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button 
                        className="bg-legal-primary hover:bg-legal-secondary text-white"
                        onClick={() => window.open("https://aeoanalyzer.com", "_blank")}
                      >
                        Explore AEO Analyzer <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsOpen(!isOpen)}
                        className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                      >
                        Learn More
                      </Button>
                    </div>
                    
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
                      <CollapsibleContent className="text-gray-700 space-y-4 border-t border-blue-100 pt-4 mt-4 animate-accordion-down">
                        <p>
                          AEO Analyzer helps businesses optimize their online presence for voice search, which is rapidly growing 
                          with the popularity of smart speakers and voice assistants like Alexa, Google Assistant, and Siri.
                        </p>
                        <p>
                          Our platform provides tools to analyze how your content performs in audio search results, identify voice 
                          search keywords, and optimize your content to better answer the questions people are asking through voice.
                        </p>
                        <p>
                          Get a competitive edge with detailed analytics, competitor analysis, and actionable recommendations 
                          tailored specifically for audio search engine optimization.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  
                  <div className="md:w-2/5">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold mb-4 text-legal-dark">Ready to try AEO Analyzer?</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          <span>7-day free trial</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          <span>Cancel anytime</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-legal-primary hover:bg-legal-secondary text-white"
                        onClick={() => window.open("https://aeoanalyzer.com/signup", "_blank")}
                      >
                        Start Free Trial
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
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
