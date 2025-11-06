import { useEffect, useState } from "react";
import routeToResultsLogo from "@/assets/route-to-results-logo.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const Newsletter = () => {
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

    return () => {
      document.head.removeChild(cssLink);
      document.body.removeChild(validateScript);
    };
  }, []);
  return <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-auto flex items-center justify-center">
              <img src={routeToResultsLogo} alt="Route to Results Logo" className="h-12 w-auto object-contain" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-dark">
            Stay Ahead of <span className="highlight-text">AI Marketing & Development</span> Innovations
          </h2>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-600">
            With the Route to Results Newsletter
          </h3>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Get exclusive insights, case studies, and updates on the latest technology trends. Join thousands of legal professionals transforming their practices with innovative solutions.</p>

          <div id="mc_embed_shell" className="max-w-2xl mx-auto">
            <style dangerouslySetInnerHTML={{__html: `
              #mc_embed_signup {
                background: #fff;
                clear: left;
                font: 14px Helvetica, Arial, sans-serif;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
              }
              #mc_embed_signup h2 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1rem;
              }
              #mc_embed_signup .mc-field-group {
                margin-bottom: 1rem;
              }
              #mc_embed_signup .mc-field-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
              }
              #mc_embed_signup .mc-field-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                font-size: 1rem;
              }
              #mc_embed_signup .button {
                background-color: #991b1b;
                color: white;
                padding: 0.75rem 2rem;
                border: none;
                border-radius: 0.375rem;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.3s;
              }
              #mc_embed_signup .button:hover {
                background-color: #7f1d1d;
              }
              #mc_embed_signup .asterisk {
                color: #991b1b;
              }
              #mc_embed_signup .indicates-required {
                text-align: right;
                font-size: 0.875rem;
                margin-bottom: 1rem;
              }
            `}} />
            
            <div id="mc_embed_signup">
              <form 
                action="https://bizooma.us14.list-manage.com/subscribe/post?u=621f128c71e19e8d9b92ff1e3&amp;id=7f8858c903&amp;f_id=00f8b5e5f0" 
                method="post" 
                id="mc-embedded-subscribe-form" 
                name="mc-embedded-subscribe-form" 
                className="validate" 
                target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <h2>Subscribe</h2>
                  <div className="indicates-required">
                    <span className="asterisk">*</span> indicates required
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL">
                      Email Address <span className="asterisk">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="EMAIL" 
                      className="required email" 
                      id="mce-EMAIL" 
                      required 
                      defaultValue=""
                    />
                  </div>
                  <div id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                    <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                  </div>
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                    <input 
                      type="text" 
                      name="b_621f128c71e19e8d9b92ff1e3_7f8858c903" 
                      tabIndex={-1} 
                      defaultValue=""
                    />
                  </div>
                  <div className="clear">
                    <input 
                      type="submit" 
                      name="subscribe" 
                      id="mc-embedded-subscribe" 
                      className="button" 
                      value="Subscribe"
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyPolicy(true)}
                      className="text-legal-primary hover:text-legal-secondary underline"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none text-sm">
                <p className="text-gray-500">Last Updated: May 3, 2025</p>
                <h2 className="text-xl font-semibold mt-6">Introduction</h2>
                <p>
                  Welcome to our newsletter. We respect your privacy and are committed to protecting your personal information. 
                  By subscribing to our newsletter, you agree to receive updates about AI marketing, development innovations, 
                  and related services.
                </p>
                <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
                <p>
                  When you subscribe to our newsletter, we collect your email address. This information is used solely 
                  to send you updates and newsletters.
                </p>
                <h2 className="text-xl font-semibold mt-6">How We Use Your Information</h2>
                <p>
                  We use your email address to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Send newsletter updates and insights</li>
                  <li>Provide information about our services</li>
                  <li>Share case studies and industry trends</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
                <p>
                  You can unsubscribe from our newsletter at any time by clicking the unsubscribe link 
                  at the bottom of any email we send you.
                </p>
                <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, please contact us at joe@bizooma.com
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Weekly Insights</h3>
              <p className="text-gray-600 text-sm">
                Get the latest trends in legal technology and practice management delivered every Tuesday.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm">
                Learn from real law firms that have successfully implemented innovative solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-legal-dark mb-2">Exclusive Access</h3>
              <p className="text-gray-600 text-sm">
                Be the first to know about new tools, templates, and resources for legal professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Newsletter;