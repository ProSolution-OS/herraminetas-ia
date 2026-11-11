// Exporta un sitio como repositorio independiente y lo sube a su remoto.
// Uso: node scripts/export-site.mjs <id> <url-del-repo> [mensaje de commit]
import { cp, mkdir, rm, writeFile, readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [id, remote, ...msg] = process.argv.slice(2);
if (!id || !remote) { console.error('Uso: node scripts/export-site.mjs <id> <url-del-repo> [mensaje]'); process.exit(1); }

const config = JSON.parse(await readFile(join(root, 'sites', `${id}.json`), 'utf8'));
const dir = await mkdtemp(join(tmpdir(), `export-${id}-`));
const git = (...a) => execFileSync('git', a, { cwd: dir, stdio: 'pipe' }).toString();

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

git('init', '-q', '-b', 'main');
git('add', '-A');
git('-c', 'user.name=ProSolution-OS', '-c', 'user.email=qfreddy03@gmail.com', 'commit', '-q', '-m', msg.join(' ') || `feat: sitio ${id}`);
git('remote', 'add', 'origin', remote);
console.log(git('push', '--force-with-lease', '-u', 'origin', 'main') || 'push ok');
console.log(`Exportado ${id} desde ${dir}`);
