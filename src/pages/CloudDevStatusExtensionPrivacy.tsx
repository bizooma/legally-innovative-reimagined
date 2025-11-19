import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";

const CloudDevStatusExtensionPrivacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Cloud & Dev Provider Status Extension | Bizooma</title>
        <meta name="description" content="Privacy policy for the Cloud & Dev Provider Status Chrome extension by Bizooma. Learn how we protect your privacy and handle data." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy — Cloud & Dev Provider Status (Chrome Extension)</h1>
            
            <p className="text-muted-foreground mb-8">
              <strong>Last Updated:</strong> November 19, 2025<br />
              <strong>Developer:</strong> Bizooma
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p>
                The Cloud & Dev Provider Status extension does not collect, store, transmit, or share any personal or sensitive user data. The extension is designed solely to display the operational status of cloud and development platforms using public status information retrieved from the Bizooma Status API.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p>
                This extension collects no personal information of any kind. Specifically, we do not collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>User names</li>
                <li>Email addresses</li>
                <li>IP addresses</li>
                <li>Browsing history</li>
                <li>Device information</li>
                <li>Cookies or tracking identifiers</li>
                <li>Any personally identifiable information (PII)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data the Extension Accesses</h2>
              <p>The extension only:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fetches cloud provider status information from the Bizooma Status API</li>
                <li>Stores this data locally inside <code>chrome.storage.local</code> to display it within the extension interface</li>
              </ul>
              <p className="mt-4">This cached data includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provider name</li>
                <li>Status (operational, degraded, major outage, unknown)</li>
                <li>Summary text</li>
                <li>Last checked timestamp</li>
              </ul>
              <p className="mt-4">
                <strong>None of this data relates to the user in any way.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
              <p>
                The extension does not transmit any information to Bizooma beyond standard API requests for provider status.
                We do not share data with third parties, advertisers, analytics providers, or other external services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Permissions</h2>
              <p>The extension uses only the minimal permissions required for functionality:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code>storage</code> — to save cached status information</li>
                <li><code>host_permissions</code> — to allow fetching the Bizooma Status API endpoint</li>
              </ul>
              <p className="mt-4">No other permissions are requested.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Security</h2>
              <p>
                Status data is fetched securely using HTTPS. No personal information is ever collected or sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>
                If you have questions about this extension or its privacy practices, you may contact:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">Bizooma</p>
                <p>Website: <a href="https://bizooma.com" className="text-primary hover:underline">https://bizooma.com</a></p>
                <p>Email: <a href="mailto:support@bizooma.com" className="text-primary hover:underline">support@bizooma.com</a></p>
              </div>
            </section>
          </article>
        </main>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default CloudDevStatusExtensionPrivacy;
