export const sampleOptions: Choice[] = [
  {
    id: 'wix',
    label: 'Wix',
    values: {},
  },
  {
    id: 'squarespace',
    label: 'Squarespace',
    values: {},
  },
  {
    id: 'shopify',
    label: 'Shopify',
    values: {},
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    values: {},
  },
  {
    id: 'webflow',
    label: 'Webflow',
    values: {},
  },
];

export const sampleCriteria: Criterion[] = [
  {
    id: 'id-pricing',
    title: 'Pricing',
    description: 'Affordability and value for features offered.',
    icon: 'i-mdi-currency-usd',
    type: 'cost',
    weight: 4,
  },
  {
    id: 'id-ease-of-use',
    title: 'Ease of Use',
    description: 'How intuitive and beginner-friendly the builder is.',
    icon: 'i-mdi-hand-pointing-up',
    type: 'percentage',
    weight: 5,
  },
  {
    id: 'id-performance',
    title: 'Design & Templates',
    description: 'Quality and variety of available themes and customization.',
    icon: 'i-mdi-palette',
    type: 'scale-rating',
    weight: 4,
  },
  {
    id: 'id-features',
    title: 'Features & Flexibility',
    description: 'Breadth of tools, plugins, and customization options.',
    icon: 'i-mdi-cog',
    type: 'text',
    weight: 5,
  },
  {
    id: 'id-support',
    title: 'E-Commerce Support',
    description: 'Support for online selling and commerce features.',
    icon: 'i-mdi-cart',
    type: 'boolean',
    weight: 4,
  },
  {
    id: 'id-support-resources',
    title: 'Support & Resources',
    description: 'Availability of help docs, tutorials, and customer support.',
    icon: 'i-mdi-lifebuoy',
    type: 'scale-rating',
    weight: 3,
  },
];
