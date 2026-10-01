const input = document.querySelector('#nxp-search-query');
const results = document.querySelector('#nxp-search-results');

function render(items, query) {
  const filtered = items.filter((item) => Object.values(item)
    .join(' ')
    .toLowerCase()
    .includes(query.toLowerCase()));

  results.replaceChildren();
  if (!filtered.length) {
    results.textContent = 'No matching pages in the published index.';
    return;
  }

  const list = document.createElement('ul');
  filtered.forEach((item) => {
    const entry = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.path;
    link.textContent = item.title || item.path;
    const details = document.createElement('p');
    details.textContent = [item.product, item.topic, item.classification, item.status, item.tags]
      .filter(Boolean)
      .join(' · ');
    entry.append(link, details);
    list.append(entry);
  });
  results.append(list);
}

async function loadIndex() {
  results.textContent = 'Loading published content index…';
  try {
    const response = await fetch('/query-index.json');
    if (!response.ok) throw new Error(`Index request failed: ${response.status}`);
    const data = await response.json();
    const items = data.data || data;
    input.addEventListener('input', () => render(items, input.value.trim()));
    render(items, '');
  } catch (error) {
    results.textContent = `${error.message}. Publish the demo page and configure the query index first.`;
  }
}

loadIndex();
