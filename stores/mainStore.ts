import { defineStore } from 'pinia';
import { scoreChoices } from '~/utils/scoreChoices';

export const useMainStore = defineStore('main-store', {
  state: () => ({
    activeTemplateId: '' as string,
    activeChoiceId: '' as string,
    choices: [] as Choice[],
    criteria: [] as Criterion[],
    results: [] as Array<Choice & { score: number }>,
  }),

  getters: {
    selectedCriteria: (state) => {
      return state.criteria.filter((c) => c.weight > 0);
    },
  },

  actions: {
    loadTemplate(template: TemplateData) {
      // deep-clone to avoid reactive reference issues
      this.criteria = template.criteria.map((c) => ({ ...c }));
      this.choices = template.choices.map((o) => ({ ...o }));

      // pick first choice as active (or clear if none)
      this.activeChoiceId = this.choices[0]?.id ?? '';

      this.activeTemplateId = template.id;
    },

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
      // if (ch) ch.values[criTitle] = val;
      if (ch) ch.values = { ...ch.values, [criTitle]: val };
    },

    /** compute & rank */
    computeScores() {
      this.results = scoreChoices(this.choices, this.criteria);
    },
  },
});
