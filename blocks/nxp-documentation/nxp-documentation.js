/**
 * Renders the NXP documentation library demo as an EDS block.
 * @param {Element} block The NXP documentation block element
 */
export default async function decorate(block) {
  const contentPath = window.hlx.codeBasePath
    ? `${window.hlx.codeBasePath}/tools/nxp-documentation.html`
    : '/tools/nxp-documentation.html';
  const response = await fetch(contentPath);
  if (!response.ok) throw new Error(`Unable to load NXP documentation content (${response.status})`);
  const source = new DOMParser().parseFromString(await response.text(), 'text/html');
  const main = source.querySelector('main');
  if (!main) throw new Error('NXP documentation content is missing its main element');
  block.replaceChildren(...Array.from(main.children));
}
