const sampleFragment = {
  id: 'nxp-ax200-calibration-001',
    path: '/content/dam/nxp/content-fragments/ax200-calibration',
  title: 'AX-200 Calibration Guide',
  model: { name: 'TechnicalArticle' },
  fields: {
    articleId: 'NXP-AX200-CAL-001',
    title: 'AX-200 Calibration Guide',
    body: 'Verify sensor output, record the result, and return the controller to service.',
    product: 'AX-200 Controller',
    status: 'Approved',
    classification: 'Public',
    topic: 'Calibration',
    lastReviewed: '2026-09-15',
  },
};

const steps = [
  {
    eyebrow: 'DA SOURCE DOCUMENT', title: 'Author page metadata', file: 'tools/nxp-demo/metadata-demo.html',
    text: 'In Document Authoring, add a two-column metadata table to the document. The first row is Metadata; later rows set page properties. Preview and publish through the DA sidekick.',
    code: '<table>\n  <tr><th colspan="2">Metadata</th></tr>\n  <tr><td>title</td><td>AX-200 Calibration Guide</td></tr>\n  <tr><td>description</td><td>Verify sensor output and record calibration results.</td></tr>\n  <tr><td>keywords</td><td>Calibration, Industrial Controls, AX-200</td></tr>\n  <tr><td>product</td><td>AX-200 Controller</td></tr>\n  <tr><td>topic</td><td>Calibration</td></tr>\n  <tr><td>classification</td><td>Public</td></tr>\n  <tr><td>status</td><td>Approved</td></tr>\n  <tr><td>json-ld</td><td>{"@context":"https://schema.org","@type":"TechArticle","headline":"AX-200 Calibration Guide"}</td></tr>\n</table>',
    links: [['Page Metadata docs', 'https://www.aem.live/docs/metadata']],
    note: 'The metadata-demo.html source is included in this repository as an authoring artifact. DA must contain/publish the corresponding document for EDS to render it.',
  },
  {
    eyebrow: 'EDS PAGE RESPONSE', title: 'Inspect what EDS publishes', file: 'https://main--eds-da-syncpoint--syncpoint-digital.aem.page/tools/nxp-demo/metadata-demo.html',
    text: 'EDS converts the authored metadata table into HTML head metadata and JSON-LD. In the published page, use View Source to inspect the actual response. The URL below is assembled from this repository and the DA mount owner; publication and routing still have to exist.',
    code: '<head>\n  <title>AX-200 Calibration Guide</title>\n  <meta name="description" content="Verify sensor output and record calibration results.">\n  <meta name="keywords" content="Calibration, Industrial Controls, AX-200">\n  <meta name="product" content="AX-200 Controller">\n  <meta name="topic" content="Calibration">\n  <meta name="classification" content="Public">\n  <meta name="status" content="Approved">\n  <script type="application/ld+json">{"@context":"https://schema.org","@type":"TechArticle","headline":"AX-200 Calibration Guide"}</script>\n</head>',
    links: [['Open expected EDS preview route', 'https://main--eds-da-syncpoint--syncpoint-digital.aem.page/tools/nxp-demo/metadata-demo.html'], ['Publishing to EDS docs', 'https://www.aem.live/docs/publishing-from-authoring']],
    note: 'The destination domain is real EDS, but this demo cannot assert the page is published. If it 404s, publish the source document from DA first.',
  },
  {
    eyebrow: 'INDEX ADMIN → QUERY INDEX', title: 'Index published metadata', file: 'Index Admin properties',
    text: 'Configure properties in Adobe Index Admin, scope the index to this route, save, and reindex. The EDS site exposes published index records at /query-index.json; this block’s search UI below calls that endpoint directly.',
    code: 'scope: /tools/nxp-demo/**\nproperties:\n  title           ← og:title\n  description     ← meta[name="description"]\n  tags            ← meta[name="article:tag"]\n  product         ← meta[name="product"]\n  topic           ← meta[name="topic"]\n  classification  ← meta[name="classification"]\n  status          ← meta[name="status"]\n\npublished JSON: /query-index.json',
    links: [['Open Adobe Index Admin', 'https://tools.aem.live/tools/index-admin/index.html'], ['Indexing docs', 'https://www.aem.live/developer/indexing']],
    note: 'The query-index.json request in the search panel below is live against the current EDS origin. It requires the published index to be configured.',
  },
  {
    eyebrow: 'JSON-LD · PAGE HEAD', title: 'Validate semantic output', file: 'application/ld+json',
    text: 'EDS publishes the json-ld metadata value as structured data. Inspect the page source and validate JSON syntax and the selected schema type against the actual content.',
    code: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'AX-200 Calibration Guide', description: 'Verify sensor output and record calibration results.', about: { '@type': 'Thing', name: 'AX-200 Controller' }, keywords: ['Calibration', 'Industrial Controls', 'AX-200'] }, null, 2),
    links: [['Rich Results Test', 'https://search.google.com/test/rich-results'], ['Metadata docs', 'https://www.aem.live/docs/metadata']],
    note: 'If NXP specifically needs a controlled tag taxonomy, demonstrate the AEM Tagging Console separately; free-text EDS page metadata is not a substitute for governed AEM Tags.',
  },
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function metadataWorkflow(block) {
  const shell = element('div', 'nxp-metadata-workflow');
  const nav = element('nav', 'nxp-step-nav');
  nav.setAttribute('aria-label', 'Metadata workflow');
  const content = element('div', 'nxp-step-content');
  const buttons = [];
  steps.forEach((step, index) => {
    const button = element('button', 'nxp-step-button');
    button.type = 'button';
    button.append(element('span', 'nxp-step-number', `0${index + 1}`), element('span', 'nxp-step-label', ['Author in DA', 'Publish with EDS', 'Index metadata', 'Validate JSON-LD'][index]));
    button.addEventListener('click', () => showStep(index));
    buttons.push(button);
    nav.append(button);
  });
  function showStep(index) {
    const step = steps[index];
    buttons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    content.replaceChildren();
    content.append(element('p', 'nxp-eyebrow', step.eyebrow));
    content.append(element('h3', '', step.title));
    content.append(element('p', 'nxp-step-copy', step.text));
    const artifact = element('div', 'nxp-artifact');
    const bar = element('div', 'nxp-artifact-bar');
    bar.append(element('code', '', step.file));
    const copy = element('button', 'nxp-copy', 'Copy');
    copy.type = 'button';
    copy.addEventListener('click', async () => {
      await navigator.clipboard.writeText(step.code);
      copy.textContent = 'Copied';
      window.setTimeout(() => { copy.textContent = 'Copy'; }, 1000);
    });
    bar.append(copy);
    artifact.append(bar, element('pre', '', step.code));
    content.append(artifact);
    const links = element('div', 'nxp-doc-links');
    step.links.forEach(([label, url]) => {
      const link = element('a', '', `${label} ↗`);
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      links.append(link);
    });
    content.append(links, element('p', 'nxp-disclaimer', step.note));
  }
  shell.append(nav, content);
  block.append(shell);
  showStep(0);
}

function filterIndexData(data, query, classification) {
  const q = query.toLowerCase();
  return data.filter((item) => {
    const values = Object.values(item).flat().join(' ').toLowerCase();
    const allowed = classification === 'all' || item.classification === classification;
    return allowed && values.includes(q);
  });
}

function renderIndexResults(root, items) {
  root.replaceChildren();
  if (!items.length) {
    root.append(element('p', 'nxp-no-results', 'No matching items in the live query index.'));
    return;
  }
  items.forEach((item) => {
    const row = element('article', 'nxp-index-result');
    const link = element('a', '', item.title || item.path);
    link.href = item.path || '#';
    const desc = element('p', '', item.description || '');
    const meta = element('div', 'nxp-index-tags');
    [item.product, item.topic, item.classification, item.status, ...(Array.isArray(item.tags) ? item.tags : [item.tags])].filter(Boolean).forEach((value) => meta.append(element('span', '', value)));
    row.append(link, desc, meta);
    root.append(row);
  });
}

function liveIndexSearch(block) {
  const panel = element('div', 'nxp-index-demo');
  const intro = element('div', 'nxp-index-intro');
  intro.append(element('p', 'nxp-eyebrow', 'LIVE EDS QUERY INDEX'), element('h3', '', 'Search published metadata'));
  const status = element('p', 'nxp-index-status', `Reading ${window.location.origin}/query-index.json`);
  intro.append(status);
  const input = element('input', 'nxp-search-input');
  input.type = 'search';
  input.placeholder = 'Try calibration, AX-200, safety…';
  input.setAttribute('aria-label', 'Search published query index');
  const filters = element('div', 'nxp-index-filters');
  let selected = 'all';
  const resultRoot = element('div', 'nxp-index-results');
  let data = [];
  let timer;
  async function load() {
    try {
      const response = await fetch('/query-index.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      data = json.data || [];
      status.textContent = `${data.length} published records from /query-index.json`;
      renderIndexResults(resultRoot, filterIndexData(data, input.value.trim(), selected));
    } catch (error) {
      status.textContent = `Live index unavailable (${error.message}). Publish pages and configure/reindex with Adobe Index Admin.`;
      resultRoot.replaceChildren(element('p', 'nxp-no-results', 'This search reads the actual EDS query-index.json. It will show records after the published index is configured.'));
    }
  }
  input.addEventListener('input', () => renderIndexResults(resultRoot, filterIndexData(data, input.value.trim(), selected)));
  ['all', 'Public', 'Internal', 'Restricted'].forEach((value) => {
    const button = element('button', `nxp-filter${value === 'all' ? ' active' : ''}`, value === 'all' ? 'All' : value);
    button.type = 'button';
    button.addEventListener('click', () => {
      selected = value;
      filters.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
      renderIndexResults(resultRoot, filterIndexData(data, input.value.trim(), selected));
    });
    filters.append(button);
  });
  panel.append(intro, input, filters, resultRoot);
  block.append(panel);
  window.clearTimeout(timer);
  load();
}

function mapFragment(fragment) {
  const fields = fragment.fields || fragment.properties || fragment;
  const id = fragment.id || fields.articleId || 'unknown';
  return {
    externalId: fields.articleId || id,
    contentType: 'technical-article',
    title: fields.title || fragment.title || 'Untitled',
    body: fields.body || '',
    metadata: {
      product: fields.product || null,
      status: fields.status || null,
      classification: fields.classification || null,
      topic: fields.topic || null,
      lastReviewed: fields.lastReviewed || null,
    },
    source: { system: 'AEM Content Fragment Delivery API', fragmentId: id, fragmentPath: fragment.path || null },
  };
}

function portability(block) {
  const wrapper = element('div', 'nxp-portability');
  const description = element('p', 'nxp-step-copy', 'AEM Content Fragment Model → authored fragment in Assets → published Content Fragment Delivery API → destination-specific record. The API call below can read a real endpoint; destination mapping stays local.');
  const sourcePanel = element('section', 'nxp-api-panel');
  sourcePanel.append(element('p', 'nxp-eyebrow', 'AEM DELIVERY API · JSON RESPONSE'), element('h3', '', 'Content Fragment'));
  const source = element('pre', 'nxp-json-source', JSON.stringify(sampleFragment, null, 2));
  const label = element('label', 'nxp-endpoint-label', 'Published Content Fragment endpoint');
  const input = element('input', 'nxp-endpoint-input');
  input.type = 'url';
  input.placeholder = 'https://publish-…adobeaemcloud.com/adobe/contentFragments/{id}';
  label.append(input);
  const fetchButton = element('button', 'nxp-fetch-button', 'Fetch from AEM');
  fetchButton.type = 'button';
  const status = element('p', 'nxp-api-status', 'Illustrative response loaded. Paste an authorized published endpoint to load real Adobe JSON.');
  sourcePanel.append(source, label, fetchButton, status);
  const targetPanel = element('section', 'nxp-api-panel nxp-target-panel');
  targetPanel.append(element('p', 'nxp-eyebrow', 'MAPPED DESTINATION RECORD'), element('h3', '', 'External CMS schema'));
  const target = element('pre', 'nxp-json-target', JSON.stringify(mapFragment(sampleFragment), null, 2));
  targetPanel.append(target);
  fetchButton.addEventListener('click', async () => {
    if (!input.value.trim()) {
      status.textContent = 'Enter the full published Delivery API endpoint.';
      return;
    }
    status.textContent = 'Fetching published fragment…';
    try {
      const response = await fetch(input.value.trim(), { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const fragment = await response.json();
      source.textContent = JSON.stringify(fragment, null, 2);
      target.textContent = JSON.stringify(mapFragment(fragment), null, 2);
      status.textContent = 'Live Adobe response mapped locally. No write was sent to the destination CMS.';
    } catch (error) {
      status.textContent = `Could not load endpoint: ${error.message}. Check publish access and CORS; alternatively use Adobe API Try It and a saved response.`;
    }
  });
  const links = element('div', 'nxp-doc-links');
  [['Adobe headless tutorial', 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/getting-started-with-aem-headless/open-api/basic/overview'], ['API overview', 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/headless/apis-headless-and-content-fragments']].forEach(([name, href]) => {
    const link = element('a', '', `${name} ↗`);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    links.append(link);
  });
  wrapper.append(description, sourcePanel, targetPanel, links, element('p', 'nxp-disclaimer', 'This is an EDS block rendering an AEM API walkthrough, not a claim that the DA repo is backed by AEM Assets. Live AEM data needs a published Content Fragment endpoint and browser CORS.'));
  block.append(wrapper);
}

export default function decorate(block) {
  const kind = block.classList.contains('nxp-portability') ? 'portability' : block.classList.contains('nxp-index') ? 'index' : 'workflow';
  block.replaceChildren();
  if (kind === 'workflow') metadataWorkflow(block);
  if (kind === 'index') liveIndexSearch(block);
  if (kind === 'portability') portability(block);
}
