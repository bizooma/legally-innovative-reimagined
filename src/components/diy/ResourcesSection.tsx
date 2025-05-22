
import { ResourceGrid } from "@/components/diy/ResourceGrid";
import { getResourceData } from "@/components/diy/resourceData";
import { useResourceValidation } from "@/components/diy/useResourceValidation";
import { Loader2 } from "lucide-react";

export const ResourcesSection = () => {
  const { isCheckingBuckets } = useResourceValidation();
  const resources = getResourceData();

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-legal-primary mt-8 mb-4">
        Free Marketing Templates & Resources
      </h2>
      
      {isCheckingBuckets ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="animate-spin h-8 w-8 border-b-2 border-legal-primary" />
          <span className="ml-3 text-legal-primary">Loading resources...</span>
        </div>
      ) : (
        <ResourceGrid resources={resources} />
      )}
    </div>
  );
};
