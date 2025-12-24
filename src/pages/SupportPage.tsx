import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { Headphones, Send, CheckCircle, HelpCircle } from "lucide-react";

const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  product: z.string().min(1, "Please select a product"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

type SupportFormData = z.infer<typeof supportSchema>;

const products = [
  { value: "npo-bots", label: "NPO Bots" },
  { value: "aeo-analyzer", label: "AEO Analyzer" },
  { value: "quickie-qr", label: "Quickie QR" },
  { value: "lead-scraper-crm", label: "Lead Scraper CRM" },
  { value: "support-bots", label: "Support Bots" },
  { value: "signature-pop", label: "Signature Pop" },
  { value: "branded-books", label: "Branded Books" },
  { value: "website-development", label: "Website Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "digital-marketing", label: "Digital Marketing Services" },
  { value: "seo-aeo", label: "SEO/AEO Services" },
  { value: "other", label: "Other / General Inquiry" },
];

const faqs = [
  {
    question: "How long does it take to get a response?",
    answer: "We typically respond to all support requests within 24-48 business hours. For urgent matters, please email us directly at support@bizooma.com with 'URGENT' in the subject line.",
  },
  {
    question: "How do I reset my password or access my account?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page of the respective product. If you're still having trouble, submit a support request and we'll help you regain access.",
  },
  {
    question: "Can I request a feature or suggest an improvement?",
    answer: "Absolutely! We love hearing from our users. Use the support form above and select the relevant product, then describe your feature request or suggestion in detail. Our product team reviews all feedback.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Refund policies vary by product and service. Please refer to your service agreement or contact our support team for specific refund inquiries related to your purchase.",
  },
  {
    question: "How do I cancel or modify my subscription?",
    answer: "You can manage your subscription settings directly in your account dashboard for most products. If you need assistance, submit a support request and our team will help you with any changes.",
  },
  {
    question: "Where can I find documentation or tutorials?",
    answer: "Each product has its own documentation and tutorial resources. Check the 'Help' or 'Resources' section within the product interface, or contact support for specific guidance.",
  },
  {
    question: "Is my data secure with Bizooma products?",
    answer: "Yes, we take data security seriously. All our products use industry-standard encryption and security practices. For more details, please review our Privacy Policy.",
  },
  {
    question: "How do I report a bug or technical issue?",
    answer: "Use the support form above and provide as much detail as possible, including steps to reproduce the issue, screenshots if available, and the browser/device you're using. This helps us resolve issues faster.",
  },
];

const SupportPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      product: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Support request submitted:", data);
      
      setIsSubmitted(true);
      toast({
        title: "Support Request Submitted",
        description: "We'll get back to you within 24-48 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Support | Bizooma</title>
        <meta
          name="description"
          content="Get help with Bizooma products and services. Submit a support request and our team will assist you."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-12 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Headphones className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Support</h1>
            <p className="text-muted-foreground text-lg">
              Having issues with one of our products? Let us know and we'll help you out.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 px-6 bg-muted/50 rounded-xl border">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your support request has been submitted. Our team will review it and get back to you within 24-48 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the product you need help with" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover">
                            {products.map((product) => (
                              <SelectItem key={product.value} value={product.value}>
                                {product.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief description of your issue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe the issue you're experiencing in detail..."
                            className="min-h-[150px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Support Request
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              For urgent matters, you can also reach us at{" "}
              <a
                href="mailto:support@bizooma.com"
                className="text-primary hover:underline"
              >
                support@bizooma.com
              </a>
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find quick answers to common questions
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>

        <Footer />
        <MobileFooterNav />
      </div>
    </>
  );
};

export default SupportPage;
