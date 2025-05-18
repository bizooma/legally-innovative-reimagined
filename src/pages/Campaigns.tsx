
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const Campaigns = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold mb-2">Marketing Campaigns</h1>
            <p className="text-lg text-gray-600">Explore our marketing campaign solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  Targeted email marketing to reach your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Our email campaigns help you connect with your audience through personalized messaging that drives engagement and conversions.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Personalized content delivery</li>
                    <li>A/B testing capabilities</li>
                    <li>Detailed analytics and reporting</li>
                    <li>Automated follow-up sequences</li>
                  </ul>
                  <Button className="w-full mt-4">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Social Media Campaigns</CardTitle>
                <CardDescription>
                  Build your brand presence across social platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Our social media campaigns help you build a strong presence across platforms and engage with your target audience effectively.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cross-platform content strategy</li>
                    <li>Engagement-focused campaigns</li>
                    <li>Performance tracking and optimization</li>
                    <li>Influencer collaboration options</li>
                  </ul>
                  <Button className="w-full mt-4">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Content Marketing</CardTitle>
                <CardDescription>
                  Valuable content that establishes your authority
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Our content marketing strategies help you create and distribute valuable, relevant content to attract and engage your target audience.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>SEO-optimized blog writing</li>
                    <li>Case studies and white papers</li>
                    <li>Video content production</li>
                    <li>Content distribution strategies</li>
                  </ul>
                  <Button className="w-full mt-4">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Lead Generation</CardTitle>
                <CardDescription>
                  Convert prospects into qualified leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Our lead generation campaigns help you attract and convert prospects into qualified leads that drive business growth.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Landing page optimization</li>
                    <li>Lead magnet creation</li>
                    <li>Multi-channel acquisition strategies</li>
                    <li>Lead nurturing workflows</li>
                  </ul>
                  <Button className="w-full mt-4">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-12 shadow-sm">
            <CardHeader>
              <CardTitle>Ready to boost your marketing efforts?</CardTitle>
              <CardDescription>
                Schedule a consultation with our marketing team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-2/3">
                  <p className="mb-4">Our marketing experts will work with you to develop a customized campaign strategy tailored to your business goals and target audience.</p>
                  <p>Whether you're looking to increase brand awareness, generate leads, or drive sales, we have the expertise to help you succeed.</p>
                </div>
                <Button size="lg" className="md:w-auto w-full">Book a Consultation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Campaigns;
