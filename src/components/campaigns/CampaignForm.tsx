
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the campaign form schema with all fields optional
const campaignFormSchema = z.object({
  // Campaign Overview
  campaignTitle: z.string().optional(),
  campaignType: z.string().optional(),
  background: z.string().optional(),
  
  // Objectives
  primaryGoals: z.string().optional(),
  kpisMetrics: z.string().optional(),
  
  // Target Audience
  demographics: z.string().optional(),
  psychographics: z.string().optional(),
  buyerPersonas: z.string().optional(), 
  painPoints: z.string().optional(),
  
  // Key Messaging
  valueProposition: z.string().optional(),
  supportingMessages: z.string().optional(),
  toneVoice: z.string().optional(),
  callToAction: z.string().optional(),
  
  // Marketing Channels
  ownedMedia: z.string().optional(),
  paidMedia: z.string().optional(),
  earnedMedia: z.string().optional(),
  socialPlatforms: z.string().optional(),
  
  // Creative Requirements
  visualAssets: z.string().optional(),
  copyRequirements: z.string().optional(),
  brandGuidelines: z.string().optional(),
  
  // Timeline
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  milestones: z.string().optional(),
  
  // Budget
  totalBudget: z.string().optional(),
  budgetBreakdown: z.string().optional(),
  spendVsProduction: z.string().optional(),
  
  // Stakeholders
  projectOwner: z.string().optional(),
  creativeLead: z.string().optional(),
  otherTeamMembers: z.string().optional(),
  approvalProcess: z.string().optional(),
  
  // Measurement & Reporting
  trackingTools: z.string().optional(),
  reportingFrequency: z.string().optional(),
  reportRecipients: z.string().optional(),
  
  // Appendices
  previousResults: z.string().optional(),
  researchInsights: z.string().optional(),
  referenceAssets: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface CampaignFormProps {
  clientId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CampaignForm({ clientId, onSuccess, onCancel }: CampaignFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define default values
  const defaultValues: Partial<CampaignFormValues> = {
    campaignTitle: "",
    campaignType: "",
  };
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues,
  });
  
  async function onSubmit(data: CampaignFormValues) {
    setIsSubmitting(true);
    try {
      // In a real app, this would save to Supabase or another backend
      console.log("Campaign form submitted:", { clientId, ...data });
      
      toast({
        title: "Campaign created",
        description: "The campaign has been created successfully.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "There was a problem creating the campaign.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const campaignTypes = [
    "Awareness",
    "Lead Generation",
    "Product Launch",
    "Content Marketing",
    "Event Promotion",
    "Rebranding",
    "Sales/Promotion",
    "Customer Retention",
    "Other"
  ];
  
  const reportingFrequencies = [
    "Daily",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Quarterly",
    "End of Campaign",
    "Custom"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Campaign Overview Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Campaign Overview</h3>
          
          <FormField
            control={form.control}
            name="campaignTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter campaign title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campaignType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Campaign</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background/Context</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Why this campaign is needed" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Objectives Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Objectives</h3>
          
          <FormField
            control={form.control}
            name="primaryGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Goals</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., increase traffic by 20%, generate 500 qualified leads" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kpisMetrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KPIs & Success Metrics</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., CTR, conversions, engagement rate, ROAS"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Target Audience Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Target Audience</h3>
          
          <FormField
            control={form.control}
            name="demographics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demographics</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Age, location, gender, income, etc."
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="psychographics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Psychographics</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Values, interests, behaviors"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buyerPersonas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buyer Personas</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your target personas"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="painPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pain Points and Motivations</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What problems does your audience face?"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Key Messaging Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Key Messaging</h3>
          
          <FormField
            control={form.control}
            name="valueProposition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Value Proposition</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What's the main benefit you're offering?"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supportingMessages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supporting Messages</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional points that reinforce your main message"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toneVoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone and Voice</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., friendly, authoritative, emotional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call to Action (CTA)</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Download Now, Book a Free Call" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Marketing Channels Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Marketing Channels</h3>
          
          <FormField
            control={form.control}
            name="ownedMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owned Media</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., email list, website, blog"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paidMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paid Media</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., PPC, social ads, display ads"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="earnedMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Earned Media</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., PR, influencer mentions"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialPlatforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Platforms</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List relevant social platforms"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Creative Requirements Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Creative Requirements</h3>
          
          <FormField
            control={form.control}
            name="visualAssets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visual Assets Needed</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., banners, video, landing pages"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copyRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copy Requirements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Headlines, body text, captions"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandGuidelines"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Guidelines to Follow</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List relevant brand guidelines"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Timeline Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Timeline</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select start date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="milestones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Milestones</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., design review, launch, mid-campaign review"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Budget Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Budget</h3>
          
          <FormField
            control={form.control}
            name="totalBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Budget</FormLabel>
                <FormControl>
                  <Input placeholder="Total campaign budget" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budgetBreakdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakdown by Channel or Activity</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Budget allocation across channels"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spendVsProduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Media Spend vs. Production Costs</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Breakdown of spend vs. production costs"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Stakeholders Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Stakeholders & Responsibilities</h3>
          
          <FormField
            control={form.control}
            name="projectOwner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Owner</FormLabel>
                <FormControl>
                  <Input placeholder="Name of project owner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creativeLead"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creative Lead</FormLabel>
                <FormControl>
                  <Input placeholder="Name of creative lead" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherTeamMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Team Members</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Copywriter, Media Buyer, etc."
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="approvalProcess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review and Approval Process</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the review/approval workflow"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Measurement Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Measurement & Reporting</h3>
          
          <FormField
            control={form.control}
            name="trackingTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Tools/Platforms</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., GA4, HubSpot, Meta Ads Manager"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportingFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reporting Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reporting frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reportingFrequencies.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportRecipients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who Receives Reports</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List of people who should receive campaign reports"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Appendices Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Appendices / Supporting Materials</h3>
          
          <FormField
            control={form.control}
            name="previousResults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Campaign Results</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Results from related past campaigns"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="researchInsights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Research or Insights</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Relevant research or insights"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referenceAssets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Assets or Competitor Examples</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Links or descriptions of reference materials"
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
