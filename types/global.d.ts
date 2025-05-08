type FactorType = 'scale-rating' | 'boolean' | 'percentage' | 'cost' | 'text';

interface Criterion {
  title: string;
  description: string;
  icon: string;
  type: FactorType;
  weight: number;
}
