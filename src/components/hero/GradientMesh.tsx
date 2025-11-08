export const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--legal-accent)) 0%, transparent 70%)',
          animation: 'float-slow 8s ease-in-out infinite',
          top: '20%',
          left: '10%',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
          animation: 'float-slow 10s ease-in-out infinite',
          animationDelay: '2s',
          bottom: '20%',
          right: '10%',
        }}
      />
    </div>
  );
};
