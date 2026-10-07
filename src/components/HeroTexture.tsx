import techBg from "@/assets/hero-tech-bg.jpg";

/** Shared subtle texture for dark heroes. Parent section needs the `hero-textured` class. Tune opacity in index.css (.hero-texture-img). */
const HeroTexture = () => (
  <>
    <img src={techBg} alt="" aria-hidden="true" loading="eager" decoding="async" className="hero-texture-img" />
    <div aria-hidden="true" className="hero-texture-overlay" />
  </>
);
export default HeroTexture;
