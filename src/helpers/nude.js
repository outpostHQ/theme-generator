export function requireNude() {
  if (typeof window === 'undefined') return new Promise(() => {});

  if (window.Nude) {
    return Promise.resolve(window.Nude);
  } else {
    return new Promise((resolve) => {
      window.addEventListener('nudeReady', () => {
        resolve(window.Nude);
      });
    });
  }
}

export function convertThemeToMarkup(props, escape) {
  let markup = `<nu-theme
  hue="${props.accentHue != null ? props.accentHue : props.hue}"
  saturation="${props.saturation}"${props.pastel ? '\npastel' : ''}${props.mod ? `\nmod="${props.mod}"` : ''}
></nu-theme>${
    props.accentHue != null ? `
<nu-theme
  name="secondary"
  hue="${props.hue}"
  saturation="${props.saturation}"${props.pastel ? '\npastel' : ''}${props.mod ? `\nmod="${props.mod}"` : ''}
></nu-theme>
<nu-props
  bg-color="#secondary-bg"
  text-color="#secondary-text"
  text-soft-color="#secondary-text-soft"
  text-strong-color="#secondary-text-strong"
  subtle-color="#secondary-subtle"
  shadow-color="#secondary-shadow"
  border-color="#secondary-border"
  special-shadow-color="#secondary-special-shadow"
></nu-props>` : ''}`;

  if (escape) {
    markup = markup
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return markup;
}
