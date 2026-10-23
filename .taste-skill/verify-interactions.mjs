import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const url = pathToFileURL(resolve('lmct-sa-fuel-million-preview.html')).href;
const browser = await Browser.launch({ width: 390, height: 844 });

try {
  const page = await browser.newPage({ width: 390, height: 844, mobile: true });
  await page.goto(url, { settleMs: 1100 });

  const baseline = await page.eval(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    configPresent: typeof LMCT_SA_FUEL_CONFIG !== 'undefined',
    detailsCount: document.querySelectorAll('.lmct-sa-faq details').length,
    stickyVisibleAtTop: !document.querySelector('[data-lmct-sa-sticky]')?.hidden,
    consoleReady: document.readyState,
  }));

  const slider = await page.eval(() => {
    const input = document.querySelector('[data-lmct-sa-range]');
    input.value = '130';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return {
      entries: document.querySelector('[data-lmct-sa-entry-output]')?.textContent.trim(),
      remainder: document.querySelector('[data-lmct-sa-entry-label]')?.textContent.trim(),
      fill: document.querySelector('[data-lmct-sa-meter-fill]')?.style.transform,
    };
  });

  await page.eval(() => document.querySelectorAll('.lmct-sa-faq details')[0].querySelector('summary').click());
  await sleep(80);
  await page.eval(() => document.querySelectorAll('.lmct-sa-faq details')[1].querySelector('summary').click());
  await sleep(80);
  const faq = await page.eval(() => {
    const items = [...document.querySelectorAll('.lmct-sa-faq details')];
    return {
      firstOpen: items[0].open,
      secondOpen: items[1].open,
      openCount: items.filter((item) => item.open).length,
    };
  });

  const cta = await page.eval(() => {
    let calledWith = null;
    const offer = document.querySelector('#lmct-sa-fuel-offer');
    offer.scrollIntoView = (options) => { calledWith = options; };
    document.querySelector('[data-lmct-sa-cta]')?.click();
    return { calledWith, hash: location.hash };
  });

  const focus = await page.eval(() => {
    const cta = document.querySelector('[data-lmct-sa-cta]');
    cta.focus();
    const style = getComputedStyle(cta);
    return {
      focused: document.activeElement === cta,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      minHeight: style.minHeight,
    };
  });

  await page.eval(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await sleep(250);
  const sticky = await page.eval(() => ({
    hiddenAtBottom: document.querySelector('[data-lmct-sa-sticky]')?.hidden,
    footerVisible: Boolean(document.querySelector('.lmct-sa-footer')),
  }));

  const reduced = await browser.newPage({ width: 390, height: 844, mobile: true, reducedMotion: true });
  await reduced.goto(url, { settleMs: 300 });
  const reducedMotion = await reduced.eval(() => ({
    mediaMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
    revealTransition: getComputedStyle(document.querySelector('.lmct-sa-rate')).transitionDuration,
    rootScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));

  console.log(JSON.stringify({ baseline, slider, faq, cta, focus, sticky, reducedMotion, consoleErrors: page.consoleErrors }, null, 2));
  await reduced.close();
  await page.close();
} finally {
  await browser.close();
}
