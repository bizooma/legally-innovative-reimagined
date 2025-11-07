import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TermsOfServiceModalProps {
  triggerClassName?: string;
}

const TermsOfServiceModal = ({ triggerClassName }: TermsOfServiceModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className={triggerClassName || "text-gray-400 hover:text-gray-300 text-sm"}>
          Terms of Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500">Last Updated: May 3, 2025</p>
          
          <h2 className="text-xl font-semibold mt-6">Introduction</h2>
          <p>
            Welcome to Bizooma.com. These Terms of Service ("Terms") govern your access to and use of our website, AI-powered platforms, interactive tools, and other digital services (collectively, the "Services") operated by Bizooma ("we," "us," or "our").
          </p>
          <p>
            Please read these Terms carefully before using our Services. By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">No Attorney-Client Relationship</h2>
          <p className="font-bold">IMPORTANT NOTICE: No Attorney-Client Relationship is Created by Using Our Services</p>
          <p>
            Using our website, Alexa skill, microsites, quizzes, or other digital tools does not create an attorney-client relationship between you and our firm. Information provided through our Services is for general informational purposes only and is not legal advice.
          </p>
          <p>
            An attorney-client relationship is only established when:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>You complete our formal client intake process</li>
            <li>Our firm conducts a conflicts check</li>
            <li>We explicitly agree to represent you</li>
            <li>We provide you with an engagement letter or representation agreement</li>
            <li>You sign such agreement and provide any requested retainer</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-6">Disclaimer of Legal Advice</h2>
          <p>
            The information provided through our Services, including immigration pathways, timelines, cost estimates, and answers to questions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Is not legal advice</li>
            <li>Is not a substitute for consultation with a qualified immigration attorney</li>
            <li>May not reflect recent changes in immigration law or policy</li>
            <li>Does not account for all individual circumstances that may affect your case</li>
          </ul>
          <p>
            Immigration law is complex and frequently changes. You should not act or refrain from acting based solely on information provided through our Services without seeking professional legal advice.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Service Eligibility</h2>
          <p>
            You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this requirement and have the capacity to enter into these Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Use of Our Services</h2>
          
          <h3 className="text-lg font-medium mt-4">Permitted Use</h3>
          <p>You may use our Services for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Learning about immigration law and processes</li>
            <li>Assessing potential immigration pathways</li>
            <li>Estimating timelines and costs</li>
            <li>Scheduling consultations</li>
            <li>Requesting information about our services</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Prohibited Use</h3>
          <p>You may not use our Services to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Violate any applicable law or regulation</li>
            <li>Infringe the rights of others</li>
            <li>Submit false or misleading information</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Disrupt or interfere with the operation of our Services</li>
            <li>Harass, threaten, or intimidate others</li>
            <li>Engage in any fraudulent activity</li>
            <li>Automate interactions except as explicitly permitted</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">User Content and Submissions</h2>
          
          <h3 className="text-lg font-medium mt-4">Information You Provide</h3>
          <p>
            When you provide information through our Services, including through forms, quizzes, or the Alexa skill:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You represent that such information is accurate and complete</li>
            <li>You grant us a non-exclusive license to use such information to provide our Services</li>
            <li>You acknowledge we may retain this information in accordance with our Privacy Policy</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">No Obligation to Retain</h3>
          <p>
            We are not obligated to store, maintain, or provide you a copy of any information or content you provide except as required by law or our Privacy Policy.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Intellectual Property Rights</h2>
          
          <h3 className="text-lg font-medium mt-4">Our Intellectual Property</h3>
          <p>
            All content, features, and functionality of our Services, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Limited License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for personal, non-commercial purposes in accordance with these Terms.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Restrictions</h3>
          <p>You may not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material from our Services</li>
            <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text</li>
            <li>Delete or alter any copyright, trademark, or other proprietary notices</li>
            <li>Access or use our Services for developing a competitive service or product</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Alexa Skill Terms</h2>
          
          <h3 className="text-lg font-medium mt-4">Voice Interactions</h3>
          <p>
            When using our "Immigration Law Myth Buster" Alexa skill:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You agree that your voice interactions may be processed by Amazon and our systems</li>
            <li>You acknowledge that voice recognition technology may not be 100% accurate</li>
            <li>You consent to the collection of usage data to improve the skill</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Alexa Skill Limitations</h3>
          <p>Our Alexa skill:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>May not be available at all times</li>
            <li>May provide simplified information due to the voice format</li>
            <li>Is not a substitute for professional legal advice</li>
            <li>Is subject to Amazon's terms of service in addition to these Terms</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Third-Party Links and Tools</h2>
          <p>
            Our Services may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Interactive Features and User Communities</h2>
          
          <h3 className="text-lg font-medium mt-4">Forums and Comments</h3>
          <p>
            If we provide comment sections, forums, or other interactive features:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are solely responsible for your interactions with other users</li>
            <li>We reserve the right to remove content that violates these Terms</li>
            <li>We are not obligated to monitor all content but may do so at our discretion</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">No Endorsement</h3>
          <p>
            We do not endorse any user content or opinions expressed through interactive features.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Quizzes, Calculators, and Assessment Tools</h2>
          
          <h3 className="text-lg font-medium mt-4">No Guarantee of Results</h3>
          <p>
            Our quizzes, calculators, and assessment tools:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide estimates and general guidance only</li>
            <li>Do not guarantee specific outcomes or results</li>
            <li>Should not replace professional legal assessment</li>
            <li>May not account for all factors relevant to your situation</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Limitations</h3>
          <p>
            Assessment results are based on the information you provide. Incomplete or inaccurate information will affect the relevance and accuracy of results.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Consultations and Appointments</h2>
          
          <h3 className="text-lg font-medium mt-4">Scheduling</h3>
          <p>
            When scheduling consultations through our Services:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You agree to provide accurate contact information</li>
            <li>You commit to attending scheduled appointments or providing notice of cancellation</li>
            <li>You understand that appointments are subject to attorney availability</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Cancellation Policy</h3>
          <p>
            We require 24 hours notice for cancellation of scheduled consultations. Failure to provide notice may result in being charged for the missed appointment.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Disclaimers</h2>
          
          <h3 className="text-lg font-medium mt-4">"As Is" and "As Available"</h3>
          <p>
            Our Services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied.
          </p>
          
          <h3 className="text-lg font-medium mt-4">No Warranties</h3>
          <p>
            We disclaim all warranties, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Implied warranties of merchantability and fitness for a particular purpose</li>
            <li>Accuracy, reliability, or completeness of content</li>
            <li>Uninterrupted, secure, or error-free service</li>
            <li>Correction of defects or errors</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Legal Outcomes</h3>
          <p>
            We make no guarantees regarding:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Success of any immigration application or petition</li>
            <li>Processing times by government agencies</li>
            <li>Outcomes of any legal matter</li>
            <li>Continued availability of any immigration program or policy</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, in no event will we be liable for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Any indirect, special, incidental, consequential, or punitive damages</li>
            <li>Any damages for personal injury, lost profits, lost data, business interruption, or loss of business opportunity</li>
            <li>Any damages exceeding the amount paid by you (if any) for accessing our Services in the past 12 months</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold us harmless from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current version will be posted on our website with the effective date. Your continued use of our Services after the posting of revised Terms means you accept the changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Termination</h2>
          <p>
            We may terminate or suspend your access to all or part of our Services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Florida, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located in Florida.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Dispute Resolution</h2>
          
          <h3 className="text-lg font-medium mt-4">Informal Resolution</h3>
          <p>
            Before filing a claim against us, you agree to attempt to resolve the dispute informally by contacting us at joe@bizooma.com. We will similarly attempt to resolve the dispute by contacting you via the email address you provide.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Arbitration</h3>
          <p>
            If the dispute cannot be resolved informally, you and we agree to resolve any dispute through binding arbitration in Jacksonville, Florida before one arbitrator, under the rules of the American Arbitration Association.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Class Action Waiver</h3>
          <p>
            You agree that any proceedings to resolve disputes will be conducted only on an individual basis and not in a class, consolidated, or representative action.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Small Claims Exception</h3>
          <p>
            The arbitration agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies or from seeking relief in small claims court for disputes within the scope of such court's jurisdiction.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding our Services and supersede all prior and contemporaneous agreements, proposals, or representations.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-semibold">
            Bizooma<br />
            2465 US-1S, Suite 1045<br />
            St. Augustine, FL 32086<br />
            Email: joe@bizooma.com<br />
            Phone: <a href="tel:9042956670" className="text-legal-primary hover:underline">904-295-6670</a>
          </p>
          
          <hr className="my-6" />
          
          <p className="italic">
            By using Bizooma.com, our Alexa skill, microsites, or any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
