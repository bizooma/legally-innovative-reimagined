
import { RESOURCE_FILES } from "@/config/documentConfig";

export interface ResourceItem {
  title: string;
  description: string;
  bucketName: string;
  fileName: string;
  displayName?: string;
  buttonText?: string;
}

export const getResourceData = (): ResourceItem[] => {
  return [
    {
      title: "Law Firm Digital Marketing Checklist",
      description: "Essential marketing considerations when promoting your law practice online.",
      bucketName: "downloads",
      fileName: RESOURCE_FILES.LAW_FIRM_MARKETING_CHECKLIST,
      displayName: "Law Firm Digital Marketing Checklist.pdf",
      buttonText: "Download Checklist"
    },
    {
      title: "Legal Marketing GDPR Compliance Guide",
      description: "A practical guide to understanding and implementing GDPR requirements in legal marketing.",
      bucketName: "downloads",
      fileName: RESOURCE_FILES.GDPR_GUIDE,
      displayName: "Legal Marketing GDPR Compliance Guide.pdf",
      buttonText: "Download Guide"
    }
  ];
};
