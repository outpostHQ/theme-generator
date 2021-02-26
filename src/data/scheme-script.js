export default `;(function () {
  const ROOT = document.querySelector(':root');
  const DARK = 'dark';
  const LIGHT = 'light';
  const HIGH = 'high';
  const LOW = 'low';
  const SCHEMES = [DARK, LIGHT];
  const CONTRASTS = [HIGH, LOW];

  function observeContext(data) {
    if (data.find(record => !record.attributeName.endsWith('-is'))) {
      setScheme();
      setContrast();
    }
  }

  const schemeMedia = matchMedia('(prefers-color-scheme: dark)');
  const contrastMedia = matchMedia('(prefers-contrast: high)');

  let globalScheme = schemeMedia.matches ? DARK : LIGHT;
  let globalContrast = contrastMedia.matches ? HIGH : LOW;

  schemeMedia.addListener((_media) => {
    globalScheme = _media.matches ? DARK : LIGHT;

    setScheme();
  });

  contrastMedia.addListener((_media) => {
    globalContrast = _media.matches ? HIGH : LOW;

    setContrast();
  });

  function setScheme() {
    const setting = ROOT.dataset.nuScheme;

    ROOT.dataset.nuSchemeIs = (setting !== 'auto' && SCHEMES.includes(setting) && setting)
      || globalScheme;
  }

  function setContrast() {
    const setting = ROOT.dataset.nuContrast;

    ROOT.dataset.nuContrastIs = (setting !== 'auto' && CONTRASTS.includes(setting) && setting)
      || globalContrast;
  }

  const observer = new MutationObserver((data) => observeContext(data));

  observer.observe(ROOT, {
    characterData: false,
    attributes: true,
    childList: false,
    subtree: false
  });

  setScheme();
  setContrast();

  // Switch to dark scheme
  // ROOT.dataset.nuContrast = 'high';
  // Increase contrast
  // ROOT.dataset.nuScheme = 'dark';
})();
`;
