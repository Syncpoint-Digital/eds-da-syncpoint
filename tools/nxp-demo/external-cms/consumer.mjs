import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const samplePath = resolve(here, 'sample-content-fragment.json');
const outputDir = resolve(root, 'output');
const args = process.argv.slice(2);
const mock = args.includes('--mock');
const urlArg = args.find((arg) => arg.startsWith('--url='));
const fileArg = args.find((arg) => arg.startsWith('--file='));
const tokenArg = args.find((arg) => arg.startsWith('--token='));
const endpoint = urlArg?.slice('--url='.length) || process.env.AEM_FRAGMENT_URL;
const localFile = fileArg?.slice('--file='.length);
const token = tokenArg?.slice('--token='.length) || process.env.AEM_BEARER_TOKEN;

if (!mock && !endpoint && !localFile) {
  console.error('Provide --url=<published-fragment-json-url>, --file=<api-response.json>, or set AEM_FRAGMENT_URL; use --mock for the offline demo.');
  process.exit(2);
}

const source = mock
  ? JSON.parse(await readFile(samplePath, 'utf8'))
  : localFile
    ? JSON.parse(await readFile(resolve(process.cwd(), localFile), 'utf8'))
  : await (async () => {
    const response = await fetch(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!response.ok) throw new Error(`AEM request failed: ${response.status} ${response.statusText}`);
    return response.json();
  })();

const fields = source.fields || source.properties || source;
const required = ['articleId', 'title', 'body', 'product', 'status', 'classification'];
const missing = required.filter((key) => !fields[key]);
if (missing.length) throw new Error(`Required source fields are missing: ${missing.join(', ')}`);

const externalRecord = {
  externalId: fields.articleId,
  contentType: 'technical-article',
  title: fields.title,
  body: fields.body,
  metadata: {
    product: fields.product,
    status: fields.status,
    classification: fields.classification,
    topic: fields.topic || null,
    lastReviewed: fields.lastReviewed || null,
  },
  source: {
    system: 'AEM Content Fragment Delivery API',
    fragmentId: source.id || null,
    fragmentPath: source.path || null,
  },
};

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'aem-source.json'), `${JSON.stringify(source, null, 2)}\n`);
await writeFile(resolve(outputDir, 'external-cms-record.json'), `${JSON.stringify(externalRecord, null, 2)}\n`);

console.log(`Mode: ${mock ? 'offline mock' : localFile ? 'saved Adobe API response' : 'live AEM endpoint'}`);
console.log('\nAEM source:');
console.log(JSON.stringify(source, null, 2));
console.log('\nMapped external CMS record:');
console.log(JSON.stringify(externalRecord, null, 2));
console.log(`\nWrote output files under ${outputDir}`);
