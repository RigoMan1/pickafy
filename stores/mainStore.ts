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
    updateChoice(id: string, patch: Partial<Choice>) {
      const idx = this.choices.findIndex((c) => c.id === id);
      if (idx !== -1) this.choices[idx] = { ...this.choices[idx], ...patch };
    },
    removeChoice(id: string) {
      this.choices = this.choices.filter((c) => c.id !== id);
      if (this.activeChoiceId === id) {
        const nextChoice = this.choices[0];
        this.setActiveChoiceId(nextChoice ? nextChoice.id : '');
      }
    },

    addCriterion(payload: { title: string; type: FactorType; icon: string }) {
      this.criteria.push({
        id: crypto.randomUUID(),
        title: payload.title,
        description: '',
        icon: payload.icon,
        type: payload.type,
        weight: 0,
      });
    },
    updateCriterion(id: string, patch: Partial<Criterion>) {
      const idx = this.criteria.findIndex((c) => c.id === id);
      if (idx !== -1) this.criteria[idx] = { ...this.criteria[idx], ...patch };
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
