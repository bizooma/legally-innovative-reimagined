import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bizooma</title>
        <meta name="description" content="Bizooma's privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            
            <p className="text-muted-foreground mb-8">
              <strong>Last Updated:</strong> May 3, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                Welcome to Bizooma.com. We understand that privacy is critically important. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile applications, use our services, interact with our platforms, or engage with our AI-powered marketing and development solutions.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site, mobile applications, or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium mt-4">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out forms on our website</li>
                <li>Register for consultations</li>
                <li>Complete our immigration assessment quizzes</li>
                <li>Use our immigration timeline calculators</li>
                <li>Interact with our "Immigration Law Myth Buster" Alexa skill</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Participate in our surveys or promotions</li>
              </ul>
              
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Country of citizenship and residency status</li>
                <li>Immigration history and goals</li>
                <li>Family relationships relevant to immigration status</li>
                <li>Employment information and qualifications</li>
                <li>Financial information relevant to certain visa categories</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6">Non-Personal Information</h3>
              <p>
                We may also collect non-personal information automatically when you visit our website or use our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Geographic location (country/region level only)</li>
                <li>Voice interactions with our Alexa skill (without personal identifiers)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including to:</p>
              
              <h3 className="text-xl font-medium mt-4">Provide Services</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and respond to your inquiries</li>
                <li>Provide immigration consultations and representation</li>
                <li>Deliver personalized immigration guidance based on your situation</li>
                <li>Perform conflict-of-interest checks</li>
                <li>Maintain attorney-client relationships</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4">Improve User Experience</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalize your experience on our platforms</li>
                <li>Develop new tools, services, and features</li>
                <li>Analyze usage trends to improve our website and services</li>
                <li>Respond to your feedback</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4">Marketing and Communications</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send newsletters and updates on immigration law changes</li>
                <li>Inform you about services that may be relevant to your situation</li>
                <li>Communicate about events, promotions, or surveys</li>
                <li>Provide information requested through our lead generation tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing Personal Information</h2>
              <p>
                If you are from the European Economic Area (EEA), our legal basis for collecting and using your personal information depends on the specific information concerned and the context in which we collect it:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consent:</strong> You have given us consent to process your personal information for specific purposes.</li>
                <li><strong>Contract Performance:</strong> Processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.</li>
                <li><strong>Legal Obligations:</strong> Processing is necessary for compliance with our legal obligations.</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests or those of a third party, provided those interests are not overridden by your rights and interests.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Attorney-Client Privilege and Confidentiality</h2>
              <p>
                Information shared in the context of seeking legal advice or representation is subject to attorney-client privilege and professional confidentiality obligations. These protections apply in addition to this Privacy Policy.
              </p>
              <p>
                When you become a client of our firm, additional confidentiality protections apply according to applicable rules of professional conduct for attorneys in our jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, rent, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              
              <h3 className="text-xl font-medium mt-4">Service Providers</h3>
              <p>
                We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
              
              <h3 className="text-xl font-medium mt-4">Legal Requirements</h3>
              <p>
                We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes.
              </p>
              
              <h3 className="text-xl font-medium mt-4">Business Transfers</h3>
              <p>
                If we or our assets are acquired by another company, or in the unlikely event of a merger, bankruptcy, or similar event, your information may be transferred as part of that transaction.
              </p>
              
              <h3 className="text-xl font-medium mt-4">With Your Consent</h3>
              <p>
                We may share your information with third parties when we have your consent to do so.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                <li><strong>Data Portability:</strong> Request transfer of your personal information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on consent to process your information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the details provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no Internet transmission is completely secure, and we cannot guarantee the security of information transmitted to our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p>
                We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements. Client-related information is retained in accordance with applicable legal and professional requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p>
                Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites, including social media platforms. These websites have their own privacy policies, and we are not responsible for their content or privacy practices. We encourage you to read the privacy policy of any website you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">California Privacy Rights</h2>
              <p>
                California residents may have additional rights regarding their personal information under the California Consumer Privacy Act (CCPA) and other state laws. Please contact us to learn more about these rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that differ from your country's laws. We take appropriate safeguards to ensure your information remains protected.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Updates to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Alexa Skill Specific Privacy Information</h2>
              <p>
                When using our "Immigration Law Myth Buster" Alexa skill:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voice recordings of your interactions with the skill are processed by Amazon according to their privacy policy before being transmitted to us as text.</li>
                <li>If you provide personal information through the skill (such as email or phone number for follow-up), it will be handled according to this Privacy Policy.</li>
                <li>Usage data from the skill is collected to improve functionality and content.</li>
                <li>Account linking features, if used, will be subject to both this policy and Amazon's policies.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Mobile Application Privacy Information</h2>
              <p>
                When using our mobile applications (including Progressive Web Apps installed on your device):
              </p>
              
              <h3 className="text-xl font-medium mt-4">Information We Collect Through Mobile Apps</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> We may collect information about your mobile device, including device type, operating system version, unique device identifiers, and mobile network information.</li>
                <li><strong>Usage Data:</strong> We collect information about how you interact with our mobile applications, including features used, time spent, and navigation patterns.</li>
                <li><strong>Location Data:</strong> With your consent, we may collect precise or approximate location information from your device to provide location-based services or improve our offerings.</li>
                <li><strong>Push Notification Tokens:</strong> If you opt-in to receive push notifications, we collect device tokens to deliver notifications to your device.</li>
                <li><strong>Camera and Photo Library:</strong> If you grant permission, we may access your camera or photo library to enable features such as document uploads or profile photos.</li>
                <li><strong>Local Storage:</strong> Our apps may store data locally on your device to improve performance and enable offline functionality.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4">How We Use Mobile App Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain app functionality</li>
                <li>To personalize your experience within the app</li>
                <li>To send push notifications (with your consent)</li>
                <li>To analyze app performance and improve user experience</li>
                <li>To troubleshoot issues and provide customer support</li>
                <li>To ensure app security and prevent fraud</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4">Third-Party Services in Mobile Apps</h3>
              <p>
                Our mobile applications may integrate with third-party services such as analytics providers, crash reporting tools, and advertising networks. These third parties may collect information about your use of our apps in accordance with their own privacy policies. We encourage you to review their privacy practices.
              </p>
              
              <h3 className="text-xl font-medium mt-4">Your Mobile App Privacy Choices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Push Notifications:</strong> You can opt out of push notifications through your device settings at any time.</li>
                <li><strong>Location Services:</strong> You can disable location access through your device settings.</li>
                <li><strong>App Permissions:</strong> You can manage app permissions (camera, photos, etc.) through your device's privacy settings.</li>
                <li><strong>Uninstall:</strong> You can stop all data collection by uninstalling our mobile applications from your device.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4">App Store Compliance</h3>
              <p>
                Our mobile applications comply with the privacy requirements of the Apple App Store and Google Play Store. Additional privacy disclosures may be available on the respective app store listing pages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">Bizooma</p>
                <p>2465 US-1S, Suite 1045</p>
                <p>St. Augustine, FL 32086</p>
                <p>Email: <a href="mailto:joe@bizooma.com" className="text-primary hover:underline">joe@bizooma.com</a></p>
                <p>Phone: <a href="tel:9042956670" className="text-primary hover:underline">904-295-6670</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p>
                This Privacy Policy is governed by and construed in accordance with the laws of Florida, without giving effect to any principles of conflicts of law.
              </p>
            </section>

            <hr className="my-6" />
            
            <p className="italic text-muted-foreground">
              By using Bizooma.com or any of our services, you acknowledge that you have read and understand this Privacy Policy.
            </p>
          </article>
        </main>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
