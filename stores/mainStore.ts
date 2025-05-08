import { defineStore } from 'pinia';

const sampleOptions: Choice[] = [
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

export interface Choice {
  id: string;
  label: string;
  values: Record<string, any>;
}

export const useMainStore = defineStore('main-store', {
  state: () => ({
    selectedCriteria: [] as Criterion[],
    choices: sampleOptions.map((o) => ({ ...o, values: {} })) as Choice[],
    activeChoiceId: '' as string, // keep only the id
    results: [] as Array<Choice & { score: number }>,
  }),

  actions: {
    setActiveChoiceId(id: string) {
      this.activeChoiceId = id;
    },
    addChoice(label = `Choice ${this.choices.length + 1}`) {
      const id = crypto.randomUUID();
      this.choices.push({ id, label, values: {} });
      if (!this.activeChoiceId) this.setActiveChoiceId(id);
    },

    /** write a single cell */
    setValue(criTitle: string, choiceId: string, val: any) {
      const ch = this.choices.find((c) => c.id === choiceId);
      if (ch) ch.values[criTitle] = val;
    },

    /** compute & rank */
    computeScores() {
      const costExtremes: Record<string, { min: number; max: number }> = {};
      // find min/max once
      this.selectedCriteria
        .filter((c) => c.type === 'cost')
        .forEach((cri) => {
          const vals = this.choices.map((c) => Number(c.values[cri.title] ?? 0));
          costExtremes[cri.title] = { min: Math.min(...vals), max: Math.max(...vals) };
        });

      const totalWeights = this.selectedCriteria.reduce((s, c) => s + c.weight, 0);

      this.results = this.choices
        .map((ch) => {
          let total = 0;
          this.selectedCriteria.forEach((cri) => {
            const raw = ch.values?.[cri.title];
            let norm = 0;

            switch (cri.type) {
              case 'scale-rating':
                norm = (Math.min(Math.max(Number(raw) || 0, 0), 10) / 10) * 100;
                break;
              case 'boolean':
                norm = raw ? 100 : 0;
                break;
              case 'percentage':
                norm = Math.min(Math.max(Number(raw) || 0, 0), 100);
                break;
              case 'cost':
                const { min, max } = costExtremes[cri.title];
                norm = max === min ? 100 : ((max - Number(raw || 0)) / (max - min)) * 100;
                break;
              case 'text':
                norm = raw && String(raw).trim() ? 100 : 0;
                break;
            }
            total += (cri.weight * norm) / 100;
          });

          return {
            ...ch,
            score: totalWeights ? Math.round((total / totalWeights) * 100) : 0,
          };
        })
        .sort((a, b) => b.score - a.score);
    },
  },
});
