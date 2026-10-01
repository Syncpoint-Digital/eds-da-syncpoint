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

const metadataSource = `<!-- DA document metadata table -->
<table>
  <tr><th colspan="2">Metadata</th></tr>
  <tr><td>title</td><td>AX-200 Calibration Guide</td></tr>
  <tr><td>description</td><td>Verify sensor output and record calibration results.</td></tr>
  <tr><td>keywords</td><td>Calibration, Industrial Controls, AX-200</td></tr>
  <tr><td>product</td><td>AX-200 Controller</td></tr>
  <tr><td>topic</td><td>Calibration</td></tr>
  <tr><td>classification</td><td>Public</td></tr>
  <tr><td>status</td><td>Approved</td></tr>
  <tr><td>json-ld</td><td>{"@context":"https://schema.org","@type":"TechArticle","headline":"AX-200 Calibration Guide","about":{"@type":"Thing","name":"AX-200 Controller"}}</td></tr>
</table>`;

const publishedHtml = `<!-- Published EDS page: selected head metadata -->
<head>
  <title>AX-200 Calibration Guide</title>
  <meta name="description" content="Verify sensor output and record calibration results.">
  <meta name="keywords" content="Calibration, Industrial Controls, AX-200">
  <meta name="product" content="AX-200 Controller">
  <meta name="topic" content="Calibration">
  <meta name="classification" content="Public">
  <meta name="status" content="Approved">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"TechArticle","headline":"AX-200 Calibration Guide"}</script>
</head>`;

const indexConfig = `Index Admin properties
title           ← og:title
description     ← meta[name="description"]
tags            ← meta[name="article:tag"]
product         ← meta[name="product"]
topic           ← meta[name="topic"]
classification  ← meta[name="classification"]
status          ← meta[name="status"]

Scope: /tools/nxp-demo/**
Published output: /query-index.json`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'AX-200 Calibration Guide',
  description: 'Verify sensor output and record calibration results.',
  about: { '@type': 'Thing', name: 'AX-200 Controller' },
  keywords: ['Calibration', 'Industrial Controls', 'AX-200'],
};

const walkthroughSteps = [
  {
    eyebrow: 'AUTHORING SOURCE · DOCUMENT AUTHORING',
    title: 'Add metadata to the DA document',
    copy: 'In the DA document, add a two-column table at the end. Its first row must say “Metadata”; each following row is a property and value. Publish the page after editing.',
    name: 'metadata-demo · DA source table',
    artifact: metadataSource,
    action: '<a href="https://www.aem.live/docs/metadata" target="_blank" rel="noreferrer">Adobe guide: Page Metadata ↗</a>',
    note: 'This is a DA authoring example. It does not open or modify your DA tenant.',
  },
  {
    eyebrow: 'PUBLISHED EXPERIENCE · EDGE DELIVERY SERVICES',
    title: 'Inspect the published page response',
    copy: 'After preview/publish, inspect the delivered page source. EDS turns the authored metadata block into head metadata; the JSON-LD block is emitted as structured data for crawlers and downstream discovery.',
    name: 'published-page · selected HTML head',
    artifact: publishedHtml,
    action: '<a href="https://www.aem.live/docs/publishing-from-authoring" target="_blank" rel="noreferrer">Adobe guide: Publishing from AEM Sites ↗</a>',
    note: 'HTML shown here is illustrative. For a tenant-backed demo, open the real preview/live URL and inspect View Source.',
  },
  {
    eyebrow: 'INDEX ADMIN · PUBLISHED JSON',
    title: 'Build discovery fields from metadata',
    copy: 'In Index Admin, define properties that extract the metadata from the published HTML, save, and reindex. The published `/query-index.json` becomes a feed that a site search or external client can filter.',
    name: 'Index Admin · property checklist',
    artifact: indexConfig,
    action: '<a href="https://tools.aem.live/tools/index-admin/index.html" target="_blank" rel="noreferrer">Open Adobe Index Admin ↗</a> <a href="https://www.aem.live/developer/indexing" target="_blank" rel="noreferrer">Adobe guide: Indexing ↗</a>',
    note: 'Index Admin settings are tenant-specific. This repository is DA-backed; Adobe says query-index configuration is managed through Index Admin for this source type.',
  },
  {
    eyebrow: 'STRUCTURED DATA · PAGE HEAD',
    title: 'Validate JSON-LD output',
    copy: 'The JSON-LD value is published into the page head. Inspect the script and validate its syntax and schema properties. Use a schema type that matches the actual content and only state facts the page supports.',
    name: 'application/ld+json · TechArticle',
    artifact: JSON.stringify(jsonLd, null, 2),
    action: '<a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">Open Rich Results Test ↗</a> <a href="https://www.aem.live/docs/metadata" target="_blank" rel="noreferrer">Adobe metadata guide ↗</a>',
    note: 'AEO outcomes are not guaranteed by JSON-LD. If the requirement is AEM Tags taxonomy governance, demonstrate it separately in the AEM Tagging Console.',
  },
];

const searchRecords = [
  { path: '/tools/nxp-demo/metadata-demo.html', title: 'AX-200 Calibration Guide', description: 'Verify sensor output and record calibration results.', product: 'AX-200 Controller', topic: 'Calibration', classification: 'Public', status: 'Approved', tags: ['Calibration', 'Industrial Controls', 'AX-200'] },
  { path: '/tools/nxp-demo/safety-procedures.html', title: 'Industrial Safety Procedures', description: 'Safety checklist for servicing industrial controls.', product: 'AX-200 Controller', topic: 'Safety', classification: 'Internal', status: 'Approved', tags: ['Safety', 'Maintenance'] },
  { path: '/tools/nxp-demo/release-notes.html', title: 'AX-200 Release Notes', description: 'Release notes and service advisories for AX-200 firmware.', product: 'AX-200 Controller', topic: 'Release information', classification: 'Public', status: 'Review', tags: ['AX-200', 'Release'] },
];

const artifact = document.querySelector('#artifact');
const stepTitle = document.querySelector('#step-title');
const stepCopy = document.querySelector('#step-copy');
const stepEyebrow = document.querySelector('#step-eyebrow');
const stepName = document.querySelector('#artifact-name');
const stepActions = document.querySelector('#step-actions');
const stepDisclaimer = document.querySelector('#step-disclaimer');
const queryInput = document.querySelector('#search-query');
const resultRoot = document.querySelector('#search-results');
const apiOutput = document.querySelector('#api-json');
const targetOutput = document.querySelector('#target-content');
const endpointStatus = document.querySelector('#endpoint-status');
let activeStep = 0;
let activeFilter = 'all';
let currentFragment = sampleFragment;

function renderStep(index) {
  activeStep = index;
  const step = walkthroughSteps[index];
  stepEyebrow.textContent = step.eyebrow;
  stepTitle.textContent = step.title;
  stepCopy.textContent = step.copy;
  stepName.textContent = step.name;
  artifact.textContent = step.artifact;
  stepActions.innerHTML = step.action;
  stepDisclaimer.textContent = step.note;
  document.querySelectorAll('.step-button').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.step) === index);
    button.setAttribute('aria-current', Number(button.dataset.step) === index ? 'step' : 'false');
  });
}

function renderSearch() {
  const query = queryInput.value.trim().toLowerCase();
  const matches = searchRecords.filter((record) => {
    const searchable = Object.values(record).flat().join(' ').toLowerCase();
    return searchable.includes(query) && (activeFilter === 'all' || record.classification === activeFilter);
  });
  resultRoot.replaceChildren();
  matches.forEach((record) => {
    const row = document.createElement('article');
    row.className = 'result-row';
    const title = document.createElement('strong');
    title.textContent = record.title;
    const desc = document.createElement('p');
    desc.textContent = record.description;
    const meta = document.createElement('div');
    meta.className = 'result-meta';
    [...record.tags, record.product, record.topic, record.classification, record.status].filter(Boolean).forEach((value) => {
      const item = document.createElement('span');
      item.textContent = value;
      meta.append(item);
    });
    row.append(title, desc, meta);
    resultRoot.append(row);
  });
  if (!matches.length) resultRoot.textContent = 'No results. Try another term or filter.';
}

function mapFragment(fragment) {
  const fields = fragment.fields || fragment.properties || fragment;
  const id = fragment.id || fields.articleId || 'unknown';
  const mapped = {
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
  currentFragment = fragment;
  apiOutput.textContent = JSON.stringify(fragment, null, 2);
  targetOutput.textContent = JSON.stringify(mapped, null, 2);
}

document.querySelectorAll('.step-button').forEach((button) => button.addEventListener('click', () => renderStep(Number(button.dataset.step))));
document.querySelector('#copy-artifact').addEventListener('click', async (event) => {
  await navigator.clipboard.writeText(walkthroughSteps[activeStep].artifact);
  event.currentTarget.textContent = 'Copied';
  setTimeout(() => { event.currentTarget.textContent = 'Copy example'; }, 1200);
});
document.querySelector('#download-index').addEventListener('click', () => {
  const index = { total: searchRecords.length, offset: 0, limit: searchRecords.length, data: searchRecords, ':type': 'index' };
  const blob = new Blob([JSON.stringify(index, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'query-index-sample.json';
  anchor.click();
  URL.revokeObjectURL(url);
});
queryInput.addEventListener('input', renderSearch);
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  renderSearch();
}));
document.querySelector('#copy-api-source').addEventListener('click', async (event) => {
  await navigator.clipboard.writeText(JSON.stringify(currentFragment, null, 2));
  event.currentTarget.textContent = 'Copied';
  setTimeout(() => { event.currentTarget.textContent = 'Copy'; }, 1200);
});
document.querySelector('#fetch-endpoint').addEventListener('click', async () => {
  const endpoint = document.querySelector('#endpoint-url').value.trim();
  if (!endpoint) {
    endpointStatus.textContent = 'Enter the full published Content Fragment Delivery API URL.';
    return;
  }
  endpointStatus.textContent = 'Requesting published fragment…';
  try {
    const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const fragment = await response.json();
    mapFragment(fragment);
    endpointStatus.textContent = 'Live AEM response loaded and mapped in this browser.';
  } catch (error) {
    endpointStatus.textContent = `Request failed: ${error.message}. Confirm the API URL, publish access, and CORS policy.`;
  }
});

renderStep(0);
renderSearch();
mapFragment(sampleFragment);
