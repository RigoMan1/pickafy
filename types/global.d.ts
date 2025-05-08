type FactorType =
  | 'scale-rating'
  | 'boolean'
  | 'percentage'
  | 'cost'
  | 'text'
  | 'star-rating';

interface Criterion {
  title: string;
  description: string;
  icon: string;
  type: FactorType;
  weight: number;
}
