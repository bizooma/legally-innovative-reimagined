import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { NewsletterCalendar } from "@/components/Newsletter/NewsletterCalendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trackFormSubmission } from "@/utils/gtmTracking";
import routeToResultsLogo from "@/assets/route-to-results-logo.png";
import { ResponsiveImage } from "@/components/ui/responsive-image";

const RouteToResultsNewsletter = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    // Load Mailchimp CSS
    const cssLink = document.createElement("link");
    cssLink.href = "//cdn-images.mailchimp.com/embedcode/classic-061523.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);

    // Load Mailchimp validation script
    const validateScript = document.createElement("script");
    validateScript.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    validateScript.type = "text/javascript";
    document.body.appendChild(validateScript);

    // Add form submission handler for success message
    const handleFormSubmit = () => {
      const form = document.getElementById('mc-embedded-subscribe-form');
      if (form) {
        form.addEventListener('submit', () => {
          trackFormSubmission('Route to Results Newsletter', 'newsletter');
          
          setTimeout(() => {
            const successDiv = document.getElementById('mce-success-response');
            if (successDiv && successDiv.style.display !== 'none') {
              successDiv.innerHTML = '✓ Thank you for subscribing! Check your email for confirmation.';
            }
          }, 1000);
        });
      }
    };

    setTimeout(handleFormSubmit, 500);
    return () => {
      document.head.removeChild(cssLink);
      document.body.removeChild(validateScript);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Route to Results Newsletter - AI Marketing & Development Insights | Bizooma</title>
        <meta name="description" content="Subscribe to Route to Results Newsletter for weekly insights on AI marketing, web development, SEO, and digital transformation. Join thousands of professionals staying ahead of technology trends." />
        <meta property="og:title" content="Route to Results Newsletter - Weekly AI & Marketing Insights" />
        <meta property="og:description" content="Get exclusive insights, case studies, and updates on the latest AI and technology trends delivered every Tuesday." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bizooma.com/route-to-results-newsletter" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <ResponsiveImage 
                src={routeToResultsLogo} 
                alt="Route to Results Newsletter" 
                sizes="(max-width: 768px) 96px, 128px"
                widths={[96, 128, 192, 256]}
                className="h-24 md:h-32 w-auto object-contain" 
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-legal-dark">
              Stay Ahead of <span className="highlight-text">AI Marketing & Development</span> Innovations
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Every Tuesday, get insights you can actually use
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-legal-dark mb-2">Latest AI Tools</h3>
                <p className="text-gray-600 text-sm">Practical applications for your business</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-legal-dark mb-2">Real Case Studies</h3>
                <p className="text-gray-600 text-sm">See how others are succeeding</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-semibold text-legal-dark mb-2">Expert Insights</h3>
                <p className="text-gray-600 text-sm">From industry veterans and innovators</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Form */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-legal-dark">
              Subscribe to Route to Results
            </h2>

            <div id="mc_embed_shell">
              <style dangerouslySetInnerHTML={{
                __html: `
                  #mc_embed_signup {
                    background: #fff;
                    clear: left;
                    font: 14px Helvetica, Arial, sans-serif;
                    width: 100%;
                  }
                  #mc_embed_signup .mc-field-group {
                    margin-bottom: 1rem;
                  }
                  #mc_embed_signup .mc-field-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                  }
                  #mc_embed_signup input[type="email"],
                  #mc_embed_signup input[type="text"] {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                  }
                  #mc_embed_signup input[type="submit"] {
                    background-color: hsl(var(--primary));
                    color: white;
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                  }
                  #mc_embed_signup input[type="submit"]:hover {
                    background-color: hsl(var(--primary) / 0.9);
                  }
                  #mc_embed_signup .asterisk {
                    color: hsl(var(--destructive));
                  }
                  #mc-embedded-subscribe-form div#mce-responses {
                    margin: 1rem 0;
                  }
                  #mc-embedded-subscribe-form .response {
                    padding: 1rem;
                    border-radius: 0.375rem;
                    margin: 0.5rem 0;
                  }
                  #mce-error-response {
                    background-color: #fee;
                    border: 1px solid #fcc;
                    color: #c33;
                  }
                  #mce-success-response {
                    background-color: #efe;
                    border: 1px solid #cfc;
                    color: #3c3;
                  }
                `
              }} />
              
              <div id="mc_embed_signup">
                <form action="https://bizooma.us11.list-manage.com/subscribe/post?u=46ed10ada4faf85f50e67dbb6&amp;id=6e2e15aec5&amp;f_id=00fb75e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
                  <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                      <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required />
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-FNAME">First Name </label>
                      <input type="text" name="FNAME" className="text" id="mce-FNAME" />
                    </div>
                    
                    <div className="mc-field-group">
                      <label htmlFor="mce-LNAME">Last Name </label>
                      <input type="text" name="LNAME" className="text" id="mce-LNAME" />
                    </div>
                    
                    <div id="mce-responses" className="clear foot">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                      <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                    </div>
                    
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                      <input type="text" name="b_46ed10ada4faf85f50e67dbb6_6e2e15aec5" tabIndex={-1} />
                    </div>
                    
                    <div className="clear foot mt-4">
                      <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                      <p className="text-sm text-gray-600 mt-4">
                        By subscribing, you agree to our{' '}
                        <button 
                          type="button"
                          onClick={() => setShowPrivacyPolicy(true)}
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Calendar Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <NewsletterCalendar />
          </div>
        </section>

        {/* Privacy Policy Modal */}
        <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Privacy Policy - Newsletter Subscription</DialogTitle>
            </DialogHeader>
            <div className="prose prose-sm max-w-none">
              <h3>Information We Collect</h3>
              <p>When you subscribe to our newsletter, we collect:</p>
              <ul>
                <li>Email address (required)</li>
                <li>First and last name (optional)</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <p>We use your information solely to:</p>
              <ul>
                <li>Send you our weekly newsletter</li>
                <li>Personalize your newsletter experience</li>
                <li>Improve our content based on engagement</li>
              </ul>

              <h3>Data Protection</h3>
              <p>We use Mailchimp as our email service provider. Your information is stored securely and we never sell or share your data with third parties for marketing purposes.</p>

              <h3>Your Rights</h3>
              <p>You can:</p>
              <ul>
                <li>Unsubscribe at any time using the link in any email</li>
                <li>Request to see what data we have about you</li>
                <li>Request deletion of your data</li>
              </ul>

              <h3>Contact Us</h3>
              <p>For questions about our privacy practices, contact us at privacy@bizooma.com</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* SoundCloud Widget */}
        <section className="py-8 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2209780067&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            />
            <div style={{ fontSize: '10px', color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100 }}>
              <a href="https://soundcloud.com/joseph-murphy-350953080" title="Joseph Murphy" target="_blank" rel="noopener noreferrer" style={{ color: '#cccccc', textDecoration: 'none' }}>Joseph Murphy</a> · <a href="https://soundcloud.com/joseph-murphy-350953080/the-click-is-dead" title="The Click Is Dead" target="_blank" rel="noopener noreferrer" style={{ color: '#cccccc', textDecoration: 'none' }}>The Click Is Dead</a>
            </div>
          </div>
        </section>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default RouteToResultsNewsletter;
