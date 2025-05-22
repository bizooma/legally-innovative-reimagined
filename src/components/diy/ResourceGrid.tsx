
import { DownloadableResource } from "./DownloadableResource";

interface ResourceData {
  title: string;
  description: string;
  bucketName: string;
  fileName: string;
  displayName?: string;
  buttonText?: string;
}

interface ResourceGridProps {
  resources: ResourceData[];
}

export const ResourceGrid = ({ resources }: ResourceGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
      {resources.map((resource, index) => (
        <DownloadableResource
          key={index}
          title={resource.title}
          description={resource.description}
          bucketName={resource.bucketName}
          fileName={resource.fileName}
          displayName={resource.displayName}
          buttonText={resource.buttonText}
        />
      ))}
    </div>
  );
};
