export interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  destination: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  rating?: number;
}
