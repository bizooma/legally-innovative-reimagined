
interface DIYHeaderProps {
  title: string;
  description: string;
}

export const DIYHeader = ({ title, description }: DIYHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-legal-dark">
        {title}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {description}
      </p>
    </>
  );
};
