import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from '../build.mjs';
import { buildPrompt } from '../src/lib/prompt-template.mjs';

const config = { domain: 'https://ejemplo.com', siteName: 'Test', adsensePublisherId: '', contactEmail: 'a@ejemplo.com' };
const TOOL_PAGES = [
  'herramientas/costo-llm', 'herramientas/contador-tokens', 'herramientas/generador-prompts',
  'en/tools/llm-cost', 'en/tools/token-counter', 'en/tools/prompt-generator',
];
const visibleWords = (html) => {
  const main = html.match(/<main>([\s\S]*)<\/main>/)[1];
  return main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
};

test('cada herramienta existe en ambos idiomas con h1, 300+ palabras y JSON-LD', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build(config, out);
  for (const p of TOOL_PAGES) {
    const html = await readFile(join(out, p, 'index.html'), 'utf8');
    assert.match(html, /<h1>/, p);
    assert.ok(visibleWords(html) >= 300, `${p}: ${visibleWords(html)} palabras`);
    assert.match(html, /"@type":"SoftwareApplication"/, p);
    assert.match(html, /"@type":"FAQPage"/, p);
  }
});

test('los índices de herramientas enlazan a todas las herramientas', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build(config, out);
  const es = await readFile(join(out, 'herramientas/index.html'), 'utf8');
  const en = await readFile(join(out, 'en/tools/index.html'), 'utf8');
  for (const s of ['costo-llm', 'contador-tokens', 'generador-prompts']) assert.ok(es.includes(`/herramientas/${s}/`));
  for (const s of ['llm-cost', 'token-counter', 'prompt-generator']) assert.ok(en.includes(`/en/tools/${s}/`));
});

test('buildPrompt incluye las cuatro entradas', () => {
  const p = buildPrompt({ role: 'editor', task: 'resumir', format: 'lista', tone: 'formal' });
  for (const w of ['editor', 'resumir', 'lista', 'formal']) assert.ok(p.includes(w));
});

test('buildPrompt tolera campos vacíos sin escribir undefined', () => {
  const p = buildPrompt({ role: '', task: 'resumir', format: '', tone: '' });
  assert.ok(p.includes('resumir'));
  assert.ok(!/undefined|null/.test(p));
});
