
import React from 'react';
import { Button } from "@/components/ui/button";

const DonutHero = () => {
  return (
    <section id="donut-hero" className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-amber-50 to-white py-16">
      {/* Decorative donut elements */}
      <div className="absolute -top-5 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-20 right-10 w-16 h-16 bg-amber-300 rounded-full opacity-30 animate-float-delay"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-rose-300 rounded-full opacity-25 animate-float-slow"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-legal-dark">
              Enjoyed Your <span className="text-pink-500 font-extrabold">Donuts</span>?
            </h1>
            <p className="text-xl mb-8 text-gray-700 max-w-xl mx-auto md:mx-0">
              Thank you for taking a moment to enjoy our sweet treat! We'd love to show you how 
              Legally Innovative can help your law firm rise to new heights with our marketing 
              and AI solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById('donut-services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Our Services
              </Button>
              <Button 
                variant="outline" 
                className="border-pink-500 text-pink-500 hover:bg-pink-50 px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById('schedule-meeting')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule a Meeting
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-pink-200 via-pink-300 to-amber-200 flex items-center justify-center shadow-lg animate-float-slow">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000"
                      alt="Delicious donut" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4">
                <div className="bg-legal-primary text-white p-4 rounded-full shadow-xl animate-bounce-slow">
                  <span className="text-lg font-bold">Yum!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutHero;
