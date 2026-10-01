import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  if (window.location.pathname.startsWith('/content/nxp-documentation/')) {
    footer.innerHTML = '<div class="nxp-footer-main"><a href="https://www.nxp.com/" aria-label="NXP Home"><img src="/icons/nxp-logo.svg" alt="NXP" width="93" /></a><nav aria-label="Footer"><a href="https://www.nxp.com/about/about-nxp:ABOUT-NXP">About NXP</a><a href="https://www.nxp.com/support:SUPPORT">Support</a><a href="https://www.nxp.com/design/design-center/documentation:DOCUMENTATION">Documentation</a><a href="https://community.nxp.com/">Community</a><a href="https://www.nxp.com/contactus:CONTACT-US">Contact</a></nav><small>© NXP Semiconductors</small></div>';
  }

  block.append(footer);
}
