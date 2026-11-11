const pos = (...v) => v.every((x) => Number.isFinite(x) && x > 0);

/** Índice de masa corporal (adultos, categorías de la OMS). */
export function bmi({ weight, height }) {
  if (!pos(weight, height) || weight > 500 || height > 280) return null;
  const value = Math.round((weight / (height / 100) ** 2) * 10) / 10;
  const category = value < 18.5 ? 'low' : value < 25 ? 'normal' : value < 30 ? 'over' : 'obese';
  return { value, category };
}

/** Metabolismo basal (Mifflin-St Jeor) y calorías de mantenimiento. activity es el factor como texto. */
export function calories({ sex, age, weight, height, activity }) {
  const factor = Number(activity);
  if (!pos(age, weight, height, factor) || age < 15 || age > 100 || weight > 500 || height > 280) return null;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'm' ? 5 : -161);
  const maintenance = bmr * factor;
  return { bmr, maintenance, lose: Math.max(1200, maintenance - 500), gain: maintenance + 300 };
}

/** Proteína diaria orientativa en gramos. factor es g por kg como texto. */
export function protein({ weight, factor }) {
  const f = Number(factor);
  if (!pos(weight, f) || weight > 500) return null;
  const grams = weight * f;
  return { grams, perMeal: grams / 4 };
}

const n0 = (lang, n) => new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(n);
const T = {
  es: { bmi: 'Tu IMC', low: 'Bajo peso', normal: 'Peso normal', over: 'Sobrepeso', obese: 'Obesidad', bmr: 'Metabolismo basal', maint: 'Para mantener tu peso', lose: 'Para perder unos 0,5 kg por semana', gain: 'Para ganar peso poco a poco', kcal: 'kcal al día', g: 'g al día', perMeal: 'Repartidos en 4 comidas', gm: 'g por comida', prot: 'Proteína diaria orientativa' },
  en: { bmi: 'Your BMI', low: 'Underweight', normal: 'Normal weight', over: 'Overweight', obese: 'Obesity', bmr: 'Basal metabolic rate', maint: 'To maintain your weight', lose: 'To lose about 0.5 kg per week', gain: 'To gain weight gradually', kcal: 'kcal per day', g: 'g per day', perMeal: 'Split across 4 meals', gm: 'g per meal', prot: 'Suggested daily protein' },
};
export const describe = {
  bmi: (r, lang) => `${T[lang].bmi}: ${new Intl.NumberFormat(lang, { minimumFractionDigits: 1 }).format(r.value)} (${T[lang][r.category]})`,
  calories: (r, lang) => `${T[lang].bmr}: ${n0(lang, r.bmr)} ${T[lang].kcal}\n${T[lang].maint}: ${n0(lang, r.maintenance)} ${T[lang].kcal}\n${T[lang].lose}: ${n0(lang, r.lose)} ${T[lang].kcal}\n${T[lang].gain}: ${n0(lang, r.gain)} ${T[lang].kcal}`,
  protein: (r, lang) => `${T[lang].prot}: ${n0(lang, r.grams)} ${T[lang].g}\n${T[lang].perMeal}: ${n0(lang, r.perMeal)} ${T[lang].gm}`,
};
