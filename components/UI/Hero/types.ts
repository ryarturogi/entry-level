export interface HeroProps {
  title?: string;
  action?: {
    title?: string;
    handler?: () => void;
  };
  logo?: string;
}
