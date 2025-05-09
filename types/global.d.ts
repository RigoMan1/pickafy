type FactorType = 'scale-rating' | 'boolean' | 'percentage' | 'cost' | 'text';

interface Criterion {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: FactorType;
  weight: number;
}

interface TemplateData {
  id: string;
  name: string;
  criteria: Criterion[];
  choices: Choice[];
}
