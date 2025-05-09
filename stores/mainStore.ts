import { defineStore } from 'pinia';
import { sampleCriteria, sampleOptions } from '~/utils/index';

export interface Choice {
  id: string;
  label: string;
  values: Record<string, any>;
}

export const useMainStore = defineStore('main-store', {
  state: () => ({
    // criteria: sampleCriteria as Criterion[],
    // choices: sampleOptions as Choice[],'
    criteria: [] as Criterion[],
    choices: [] as Choice[],
    activeChoiceId: '' as string, // keep only the id
    results: [] as Array<Choice & { score: number }>,
  }),

  getters: {
    selectedCriteria: (state) => {
      return state.criteria.filter((c) => c.weight > 0);
    },
  },

  actions: {
    setActiveChoiceId(id: string) {
      this.activeChoiceId = id;
    },
    addChoice(label: string) {
      const id = crypto.randomUUID();
      this.choices.push({ id, label, values: {} });
      if (!this.activeChoiceId) this.setActiveChoiceId(id);
    },
    removeChoice(id: string) {
      this.choices = this.choices.filter((c) => c.id !== id);
      if (this.activeChoiceId === id) {
        const nextChoice = this.choices[0];
        this.setActiveChoiceId(nextChoice ? nextChoice.id : '');
      }
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
          const vals = this.choices.map((c) => Number(c.values[cri.id] ?? 0));
          // costExtremes[cri.title] = { min: Math.min(...vals), max: Math.max(...vals) };
          costExtremes[cri.id] = { min: Math.min(...vals), max: Math.max(...vals) };
        });

      const totalWeights = this.selectedCriteria.reduce((s, c) => s + c.weight, 0);

      this.results = this.choices
        .map((ch) => {
          let total = 0;
          this.selectedCriteria.forEach((cri) => {
            const raw = ch.values?.[cri.id];
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
                const { min, max } = costExtremes[cri.id];
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
