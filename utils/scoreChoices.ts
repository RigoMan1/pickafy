export function scoreChoices(
  choices: Choice[],
  criteria: Criterion[]
): Array<Choice & { score: number }> {
  const selected = criteria.filter((c) => c.weight > 0);
  const costExtremes: Record<string, { min: number; max: number }> = {};

  selected
    .filter((c) => c.type === 'cost')
    .forEach((c) => {
      const vals = choices.map((ch) => Number(ch.values[c.id] ?? 0));
      costExtremes[c.id] = { min: Math.min(...vals), max: Math.max(...vals) };
    });

  const totalWeights = selected.reduce((s, c) => s + c.weight, 0);

  return choices
    .map((ch) => {
      let total = 0;
      selected.forEach((c) => {
        const raw = ch.values?.[c.id];
        let norm = 0;
        switch (c.type) {
          case 'scale-rating':
            norm = (Math.min(Math.max(+raw || 0, 0), 10) / 10) * 100;
            break;
          case 'boolean':
            norm = raw ? 100 : 0;
            break;
          case 'percentage':
            norm = Math.min(Math.max(+raw || 0, 0), 100);
            break;
          case 'cost': {
            const { min, max } = costExtremes[c.id];
            norm = max === min ? 100 : ((max - (+raw || 0)) / (max - min)) * 100;
            break;
          }
          case 'text':
            norm = raw && String(raw).trim() ? 100 : 0;
            break;
        }
        total += (c.weight * norm) / 100;
      });
      return {
        ...ch,
        score: totalWeights ? Math.round((total / totalWeights) * 100) : 0,
      };
    })
    .sort((a, b) => b.score - a.score);
}
