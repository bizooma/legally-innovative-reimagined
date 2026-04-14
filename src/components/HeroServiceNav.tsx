const serviceItems = [
  { label: "Custom Roku Development", id: "service-custom-roku-channel-development" },
  { label: "Mobile App Development", id: "service-mobile-app-development" },
  { label: "Custom AI Chatbots", id: "service-custom-ai-chatbot" },
  { label: "Voice Assisted Marketing", id: "service-voice-assistant-marketing" },
];

const HeroServiceNav = () => {
  const handleClick = (id: string) => {
    window.location.href = `/#${id}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex">
      {serviceItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`flex-1 py-4 text-sm md:text-base font-semibold text-white/90 hover:text-white transition-all duration-300 hover:bg-white/15 backdrop-blur-sm cursor-pointer ${
            index < 3 ? 'border-r border-white/20' : ''
          } bg-white/10`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default HeroServiceNav;
