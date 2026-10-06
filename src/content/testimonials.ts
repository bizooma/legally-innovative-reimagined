export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
}

// Only real, attributed quotes with permission. Never placeholders or examples.
export const testimonials: Testimonial[] = [];
