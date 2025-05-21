type FactorType =
  | 'scale-rating' // a rating from 1-10
  | 'boolean' // a yes/no question
  | 'percentage' // a percentage from 0-100
  | 'cost'; // a cost value

interface Criterion {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: FactorType;
  weight: number;
}

interface Choice {
  id: string;
  label: string;
  image?: string;
  url?: string;
  values: Record<string, any>;
}

interface TemplateData {
  id: string;
  name: string;
  description: string;
  image: string;
  criteria: Criterion[];
  choices: Choice[];
}
