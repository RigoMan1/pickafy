type FactorType = 'scale-rating' | 'boolean' | 'percentage' | 'cost' | 'text';

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
  values: Record<string, any>;
}

interface TemplateData {
  id: string;
  name: string;
  criteria: Criterion[];
  choices: Choice[];
}
