const VideoSection = () => {
  return <section id="video" className="section-padding bg-gradient-to-br from-legal-primary/5 to-legal-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">Transform Your Businesses Digital Presence</h2>
          <p className="text-lg text-legal-dark/80 max-w-2xl mx-auto">Watch our interactive video to learn more about our services.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-sm bg-white/80 p-2 rounded-3xl border border-legal-primary/20 shadow-2xl">
            <iframe src="https://www.videoask.com/f5jr9rk94" title="Bizooma video introduction" allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;" width="100%" height="600px" style={{
            border: 'none',
            borderRadius: '24px'
          }} className="w-full" />
          </div>
        </div>
      </div>
    </section>;
};
export default VideoSection;