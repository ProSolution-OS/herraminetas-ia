// Exporta un sitio como repositorio independiente y lo sube a su remoto.
// Si el remoto ya tiene historial, añade un commit encima (no reescribe nada).
// Uso: node scripts/export-site.mjs <id> <url-del-repo> [mensaje de commit]
import { cp, mkdir, rm, writeFile, readFile, readdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [id, remote, ...msg] = process.argv.slice(2);
if (!id || !remote) { console.error('Uso: node scripts/export-site.mjs <id> <url-del-repo> [mensaje]'); process.exit(1); }

const config = JSON.parse(await readFile(join(root, 'sites', `${id}.json`), 'utf8'));
const dir = await mkdtemp(join(tmpdir(), `export-${id}-`));
const run = (cwd, ...a) => execFileSync('git', a, { cwd, stdio: 'pipe' }).toString();
const git = (...a) => run(dir, ...a);

// Clona el remoto si tiene la rama main; si está vacío, inicializa.
let cloned = true;
try { run(tmpdir(), 'clone', '-q', '--branch', 'main', remote, dir); } catch { cloned = false; }
if (!cloned) { git('init', '-q', '-b', 'main'); git('remote', 'add', 'origin', remote); }
for (const e of await readdir(dir)) if (e !== '.git') await rm(join(dir, e), { recursive: true, force: true });

for (const f of ['build.mjs', 'package.json', 'vercel.json', '.gitignore', 'src']) await cp(join(root, f), join(dir, f), { recursive: true });
await mkdir(join(dir, 'sites'));
await cp(join(root, 'sites', `${id}.json`), join(dir, 'sites', `${id}.json`));
await mkdir(join(dir, 'test'));
for (const f of ['build', 'lib', 'lib2', 'tools', 'seo', 'adsense']) await cp(join(root, 'test', `${f}.test.mjs`), join(dir, 'test', `${f}.test.mjs`));
await writeFile(join(dir, 'README.md'), `# ${config.siteName}

Sitio estático bilingüe (es/en) publicado en ${config.domain}.
Generado desde el repositorio de sitios; no edites aquí, vuelve a exportar.

\`\`\`bash
npm test
node build.mjs   # genera dist/
\`\`\`

Vercel: sin framework, build \`node build.mjs\`, salida \`dist\` (ya definido en vercel.json). No necesita variables de entorno.
`);

git('add', '-A');
if (!git('status', '--porcelain').trim()) { console.log(`Sin cambios en ${id}.`); process.exit(0); }
git('-c', 'user.name=ProSolution-OS', '-c', 'user.email=qfreddy03@gmail.com', 'commit', '-q', '-m', msg.join(' ') || `feat: actualiza sitio ${id}`);
git('push', '-u', 'origin', 'main');
console.log(`Exportado ${id} (${cloned ? 'actualización' : 'primer commit'}) desde ${dir}`);
