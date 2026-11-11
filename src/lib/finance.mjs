const ok = (...v) => v.every((x) => Number.isFinite(x) && x >= 0);

/** Interés compuesto mensual con aporte mensual al final de cada mes. Devuelve null si la entrada no es válida. */
export function compoundInterest({ principal, monthly, rate, years }) {
  if (!ok(principal, monthly, rate, years) || years === 0 || years > 100 || rate > 1000) return null;
  const r = rate / 100 / 12;
  const n = Math.round(years * 12);
  const growth = (1 + r) ** n;
  const final = principal * growth + (r === 0 ? monthly * n : monthly * ((growth - 1) / r));
  const contributed = principal + monthly * n;
  if (!Number.isFinite(final)) return null;
  return { final, contributed, interest: final - contributed };
}

/** Cuota mensual fija (sistema francés). */
export function loanPayment({ amount, rate, years }) {
  if (!ok(amount, rate, years) || amount === 0 || years === 0 || years > 100 || rate > 1000) return null;
  const r = rate / 100 / 12;
  const n = Math.round(years * 12);
  const monthly = r === 0 ? amount / n : (amount * r) / (1 - (1 + r) ** -n);
  if (!Number.isFinite(monthly)) return null;
  return { monthly, total: monthly * n, interest: monthly * n - amount };
}

/** Aporte mensual necesario para llegar a una meta. */
export function savingsGoal({ goal, current, rate, years }) {
  if (!ok(goal, current, rate, years) || goal === 0 || years === 0 || years > 100 || rate > 1000) return null;
  const r = rate / 100 / 12;
  const n = Math.round(years * 12);
  const growth = (1 + r) ** n;
  const missing = goal - current * growth;
  if (missing <= 0) return { monthly: 0, months: n };
  const monthly = r === 0 ? missing / n : (missing * r) / (growth - 1);
  if (!Number.isFinite(monthly)) return null;
  return { monthly, months: n };
}

const fmt = (lang, n) => new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const T = {
  es: { final: 'Saldo final', contributed: 'Total aportado', interest: 'Intereses ganados', monthly: 'Cuota mensual', total: 'Total a pagar', loanInterest: 'Intereses totales', need: 'Aporte mensual necesario', reached: 'Ya alcanzas la meta sin aportar más.' },
  en: { final: 'Final balance', contributed: 'Total contributed', interest: 'Interest earned', monthly: 'Monthly payment', total: 'Total to pay', loanInterest: 'Total interest', need: 'Monthly contribution needed', reached: 'You already reach the goal without adding more.' },
};

export const describe = {
  compoundInterest: (r, lang) => `${T[lang].final}: ${fmt(lang, r.final)}\n${T[lang].contributed}: ${fmt(lang, r.contributed)}\n${T[lang].interest}: ${fmt(lang, r.interest)}`,
  loanPayment: (r, lang) => `${T[lang].monthly}: ${fmt(lang, r.monthly)}\n${T[lang].total}: ${fmt(lang, r.total)}\n${T[lang].loanInterest}: ${fmt(lang, r.interest)}`,
  savingsGoal: (r, lang) => (r.monthly === 0 ? T[lang].reached : `${T[lang].need}: ${fmt(lang, r.monthly)}`),
};
