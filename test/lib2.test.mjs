import test from 'node:test';
import assert from 'node:assert/strict';
import { compoundInterest, loanPayment, savingsGoal } from '../src/lib/finance.mjs';
import { bmi, calories, protein } from '../src/lib/health.mjs';
import { analyzeText, convertCase, slugify } from '../src/lib/text-tools.mjs';

const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

test('compoundInterest: 1000 al 12% anual, 1 año, sin aportes = 1126.83', () => {
  const r = compoundInterest({ principal: 1000, monthly: 0, rate: 12, years: 1 });
  near(r.final, 1126.83);
  near(r.contributed, 1000);
  near(r.interest, 126.83);
});
test('compoundInterest: tasa 0 suma solo aportes', () => {
  const r = compoundInterest({ principal: 100, monthly: 10, rate: 0, years: 1 });
  near(r.final, 220);
});
test('loanPayment: 10000 al 12% a 1 año = 888.49 al mes', () => {
  const r = loanPayment({ amount: 10000, rate: 12, years: 1 });
  near(r.monthly, 888.49);
  near(r.total, 888.49 * 12, 0.1);
});
test('loanPayment: tasa 0 divide en cuotas iguales; plazo 0 es inválido', () => {
  near(loanPayment({ amount: 1200, rate: 0, years: 1 }).monthly, 100);
  assert.equal(loanPayment({ amount: 1200, rate: 5, years: 0 }), null);
});
test('savingsGoal: 12000 en 1 año sin interés = 1000 al mes', () => {
  near(savingsGoal({ goal: 12000, current: 0, rate: 0, years: 1 }).monthly, 1000);
});
test('savingsGoal: si lo ahorrado ya alcanza la meta, el aporte es 0', () => {
  assert.equal(savingsGoal({ goal: 1000, current: 5000, rate: 5, years: 2 }).monthly, 0);
});

test('bmi: 70 kg y 175 cm = 22.9 normal', () => {
  const r = bmi({ weight: 70, height: 175 });
  assert.equal(r.value, 22.9);
  assert.equal(r.category, 'normal');
  assert.equal(bmi({ weight: 70, height: 0 }), null);
});
test('calories: hombre 30 años 70 kg 175 cm sedentario', () => {
  const r = calories({ sex: 'm', age: 30, weight: 70, height: 175, activity: '1.2' });
  near(r.bmr, 1648.75);
  near(r.maintenance, 1978.5);
  assert.ok(r.lose >= 1200);
});
test('protein: 70 kg con factor 1.6 = 112 g', () => {
  near(protein({ weight: 70, factor: '1.6' }).grams, 112);
});

test('analyzeText cuenta palabras, frases, párrafos y tiempo de lectura', () => {
  const r = analyzeText('Hola mundo. Otra frase aquí.\n\nSegundo párrafo');
  assert.equal(r.words, 7);
  assert.equal(r.sentences, 2);
  assert.equal(r.paragraphs, 2);
  assert.equal(r.minutes, 1);
  assert.deepEqual(analyzeText(''), { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, minutes: 0 });
});
test('convertCase: mayúsculas, minúsculas, título y frase con acentos', () => {
  assert.equal(convertCase('hola mundo', 'upper'), 'HOLA MUNDO');
  assert.equal(convertCase('ÁRBOL Grande', 'lower'), 'árbol grande');
  assert.equal(convertCase('hola mundo', 'title'), 'Hola Mundo');
  assert.equal(convertCase('hola mundo. otra frase', 'sentence'), 'Hola mundo. Otra frase');
});
test('slugify quita tildes, ñ y símbolos', () => {
  assert.equal(slugify('Ñandú rápido: ¡Hola Mundo!'), 'nandu-rapido-hola-mundo');
  assert.equal(slugify('  --  '), '');
});
