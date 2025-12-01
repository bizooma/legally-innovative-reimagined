export const SantaWalk = () => {
  return (
    <div className="fixed bottom-8 left-0 z-[100] pointer-events-none">
      <div 
        className="text-6xl animate-santa-walk"
        style={{
          animation: 'santa-walk 25s linear infinite',
        }}
      >
        🎅
      </div>
    </div>
  );
};
