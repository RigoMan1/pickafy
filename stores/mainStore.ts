import { defineStore } from 'pinia';

/* ── data contracts ───────────────────────────── */
export interface Criterion {
  title: string;
  description: string;
  icon: string;
  type: 'number' | 'boolean' | 'text'; // FactorType
  weight: number;
}
export interface Choice {
  id: string;
  label: string;
}
type ValuesMatrix = Record<string /*criterion*/, Record<string /*choice*/, any>>;

/* ── store ────────────────────────────────────── */
export const useMainStore = defineStore('main-store', {
  state: () => ({
    /* user inputs */
    selectedCriteria: [] as Criterion[],
    choices: [] as Choice[],
    activeChoice: {} as Choice,

    /* criterion × choice values */
    values: {} as ValuesMatrix,
  }),

  actions: {
    addChoice(label = `Choice ${this.choices.length + 1}`) {
      const id = crypto.randomUUID();
      this.choices.push({ id, label });
      if (!this.activeChoice) this.activeChoice = id;

      /* initialise matrix cells for the new column */
      this.selectedCriteria.forEach((cri) => {
        if (!this.values[cri.title]) this.values[cri.title] = {};
        this.values[cri.title][id] ??= cri.type === 'boolean' ? false : 0;
      });
    },

    setValue(criTitle: string, choiceId: string, val: any) {
      if (!this.values[criTitle]) this.values[criTitle] = {};
      this.values[criTitle][choiceId] = val;
    },
  },
});
