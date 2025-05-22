
import { ReactNode } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const ResourceCard = ({ title, description, children }: ResourceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};
