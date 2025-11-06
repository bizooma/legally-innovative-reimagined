import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  widths?: number[];
  className?: string;
}

/**
 * ResponsiveImage component that generates srcset for optimized image loading
 * across different screen sizes and pixel densities.
 */
export const ResponsiveImage = ({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  widths = [320, 640, 768, 1024, 1280, 1536],
  className,
  ...props
}: ResponsiveImageProps) => {
  // Generate srcset with different widths
  const srcSet = widths
    .map((width) => {
      // For imported images, we can't dynamically resize them
      // So we'll use the same image for all sizes
      // In production, you'd use an image optimization service
      return `${src} ${width}w`;
    })
    .join(", ");

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      loading="lazy"
      className={className}
      {...props}
    />
  );
};

interface BackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: string;
  children?: React.ReactNode;
}

/**
 * BackgroundImage component with responsive srcset for hero sections
 */
export const BackgroundImage = ({
  src,
  alt,
  className = "",
  overlay,
  children,
}: BackgroundImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <ResponsiveImage
        src={src}
        alt={alt}
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: overlay }}
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};
