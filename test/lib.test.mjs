import test from 'node:test';
import assert from 'node:assert/strict';
import { llmCost } from '../src/lib/llm-cost.mjs';
import { countText } from '../src/lib/text-count.mjs';
import { parseNumber } from '../src/lib/parse-number.mjs';

test('llmCost suma entrada y salida por millón de tokens', () => {
  assert.equal(llmCost({ inputTokens: 1_000_000, outputTokens: 500_000, inputPricePerM: 3, outputPricePerM: 15 }), 10.5);
});

test('llmCost lanza RangeError con entradas no finitas o negativas', () => {
  for (const bad of [NaN, Infinity, -1]) {
    assert.throws(() => llmCost({ inputTokens: bad, outputTokens: 1, inputPricePerM: 1, outputPricePerM: 1 }), RangeError);
  }
});

test('parseNumber respeta coma decimal en es y punto en en', () => {
  assert.equal(parseNumber('1,5', 'es'), 1.5);
  assert.equal(parseNumber('1.5', 'en'), 1.5);
  assert.equal(parseNumber('1.500', 'es'), 1500);
  assert.equal(parseNumber('1,500', 'en'), 1500);
  assert.equal(parseNumber('1.500,25', 'es'), 1500.25);
});

test('parseNumber devuelve null para vacío, texto o negativos', () => {
  for (const bad of ['', '  ', 'abc', '-2', '1e999']) assert.equal(parseNumber(bad, 'en'), null);
});

test('countText cuenta puntos de código Unicode', () => {
  assert.deepEqual(countText('hola 😀 mundo'), { words: 3, chars: 12, estTokens: 3 });
  assert.deepEqual(countText(''), { words: 0, chars: 0, estTokens: 0 });
  assert.equal(countText('a\n\nb').words, 2);
});
