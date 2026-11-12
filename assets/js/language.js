(() => {
  const translations = window.siteTranslations;
  const originals = new WeakMap();
  let language = 'nl';
  try { if (localStorage.getItem('sed-language') === 'en') language = 'en'; } catch {}
  function translated(original) { return language === 'en' ? translations[original] : original; }
  function applyLanguage() {
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script, style, noscript, .language-switch')) continue;
      const original = originals.get(node) ?? node.textContent.trim();
      if (!Object.hasOwn(translations, original)) continue;
      originals.set(node, original);
      const next = node.textContent.replace(/\S[\s\S]*\S|\S/, translated(original));
      if (node.textContent !== next) node.textContent = next;
    }
    document.querySelectorAll('[alt], [aria-label], [title], meta[name="description"]').forEach(element => {
      let values = originals.get(element);
      if (!values) { values = {}; originals.set(element, values); }
      for (const attr of ['alt', 'aria-label', 'title', 'content']) {
        if (!element.hasAttribute(attr)) continue;
        const original = values[attr] ?? element.getAttribute(attr);
        if (!Object.hasOwn(translations, original)) continue;
        values[attr] = original;
        const next = translated(original);
        if (element.getAttribute(attr) !== next) element.setAttribute(attr, next);
      }
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.language;
    try { localStorage.setItem('sed-language', language); } catch {}
    applyLanguage();
    document.querySelector('#span-range')?.dispatchEvent(new Event('input'));
  }));
  applyLanguage();
  // The handbook replaces its panel when a different step is selected.
  const panel = document.querySelector('#step-panel');
  if (panel) new MutationObserver(applyLanguage).observe(panel, { childList: true, subtree: true });
})();
