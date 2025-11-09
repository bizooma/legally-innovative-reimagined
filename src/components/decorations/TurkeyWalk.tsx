export const TurkeyWalk = () => {
  return (
    <div className="fixed bottom-8 left-0 z-[100] pointer-events-none">
      <div 
        className="text-6xl animate-turkey-walk"
        style={{
          animation: 'turkey-walk 20s linear infinite',
        }}
      >
        🦃
      </div>
    </div>
  );
};
