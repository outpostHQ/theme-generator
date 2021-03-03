<template>
  <nu-flow gap>
    <nu-attrs for="btn" padding="1x 2x" />
    <nu-pane content="space-between">
      <nu-pane gap="2x">
        <nu-label>Switch by</nu-label>
        <nu-btngroup use-radiogroup :value="outputType" @input="outputType = $event.detail" inline>
          <nu-btn value="auto">CSS</nu-btn>
          <nu-btn value="manual">JS</nu-btn>
        </nu-btngroup>
      </nu-pane>
      <nu-pane>
        <nu-btn clear @tap="copyCSS" padding=".5x 1x">
          <nu-icon v-if="!copied" name="copy-outline"/>
          <nu-icon v-else name="checkmark-outline"/>
          CSS
          <nu-tooltip text="nowrap">
            {{ copied ? 'Copied' : 'Copy CSS to Clipboard' }}
          </nu-tooltip>
        </nu-btn>
        <nu-btn clear @tap="downloadCSS" padding=".5x 1x">
          <nu-icon name="download-outline"/>
          CSS
        </nu-btn>
        <nu-btn v-if="outputType === 'manual'" clear @tap="downloadJS" padding=".5x 1x">
          <nu-icon name="download-outline"/>
          JS
        </nu-btn>
      </nu-pane>
    </nu-pane>

    <nu-card v-if="outputType === 'manual'" padding="1x 2x" warning gap=".5x">
      <nu-block>
        The <b>Switch by JS</b> declaration <nu-el text="u">requires a script</nu-el> to be used. Download it here <nu-icon name="arrow-forward-outline" rotate="-45deg"/>
      </nu-block>
      <nu-block>
        Add <nu-cd>nu-scheme="dark"</nu-cd> or <nu-cd>nu-scheme="light"</nu-cd> attribute to the <nu-cd>&lt;html/&gt;</nu-cd> element to force specific scheme.
      </nu-block>
      <nu-block>
        Add <nu-cd>nu-contrast="high"</nu-cd> attribute to the <nu-cd>&lt;html/&gt;</nu-cd> element to force increased contrast mode.
      </nu-block>
    </nu-card>

    <nu-card v-if="outputType === 'auto'" padding="1x 2x" warning gap=".5x">
      <nu-block>
        The <b>Switch by CSS</b> declaration uses <nu-link to="!https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries">CSS Media Queries</nu-link> to adapt the theme to system preferences.
      </nu-block>
      <nu-block>
        <b>Note:</b> CSS Media Query <nu-cd>prefers-contrast</nu-cd> is an experimental feature and currently <nu-el text="u">is not supported by any browser</nu-el>.
      </nu-block>
      <nu-block>
        See compatibility tables on <b>caniuse.com</b>: <nu-link to="!https://caniuse.com/mdn-css_at-rules_media_prefers-contrast">prefers-contrast</nu-link>, <nu-link to="!https://caniuse.com/prefers-color-scheme">prefers-color-scheme</nu-link>.
      </nu-block>
    </nu-card>

    <nu-pane gap="2x">
      <nu-pane grow="1">
        <nu-label>
          Theme name
        </nu-label>
        <nu-icon name="information-circle-outline" use-hover>
          <nu-tooltip width="30x">If you want to use several themes you can specify a name for each theme. It will be used as a prefix in color names.</nu-tooltip>
        </nu-icon>
        <nu-input :value="name" @input="name = $event.detail" grow="1"/>
      </nu-pane>
      <nu-pane grow="1">
        <nu-label>
          Selector
        </nu-label>
        <nu-icon name="information-circle-outline" use-hover>
          <nu-tooltip width="30x">If you want to apply the theme to the specific element then use this field to provide a CSS selector for it.</nu-tooltip>
        </nu-icon>
        <nu-input :value="selector" @input="selector = $event.detail" grow="1"/>
      </nu-pane>
    </nu-pane>
    <nu-card fill="bg" v-if="objData" padding="0">
      <nu-code height="max 48x" overflow="auto" padding="1x 2x">
        <nu-block v-html="css"/>
      </nu-code>
    </nu-card>
  </nu-flow>
</template>

<script setup>
import saveAs from 'file-saver';
import copy from 'clipboard-copy';
import { computed, defineProps, ref } from 'vue';
import schemeScript from '../data/scheme-script';

const { convertToProps } = window.Nude.themes;

const props = defineProps({
  data: Array,
});

const objData = computed(() => {
  return props.data.map(theme => {
    return theme.reduce((obj, color) => {
      obj[color.name] = color.rawHsluv;

      return obj;
    }, {});
  });
});
const outputType = ref('auto');
const type = ref('automatic');
const name = ref('');
const selector = ref('');
const css = computed(() => {
  const sel = selector.value || (outputType.value === 'manual' ? 'body' : ':root');

  if (outputType.value === 'manual') {
    return objData ? `html[data-nu-scheme-is="light"][data-nu-contrast-is="low"] ${sel} {
${stylesString(convertToProps(name.value, objData.value[0]), 1)}
}

html[data-nu-scheme-is="dark"][data-nu-contrast-is="low"] ${sel} {
${stylesString(convertToProps(name.value, objData.value[1]), 1)}
}

html[data-nu-scheme-is="light"][data-nu-contrast-is="high"] ${sel} {
${stylesString(convertToProps(name.value, objData.value[2]), 1)}
}

html[data-nu-scheme-is="dark"][data-nu-contrast-is="high"] ${sel} {
${stylesString(convertToProps(name.value, objData.value[3]), 1)}
}` : '';
  } else {
    return objData ? `${sel} {
${stylesString(convertToProps(name.value, objData.value[0]), 1)}
}

@media (prefers-color-scheme: dark) {
  ${sel} {
${stylesString(convertToProps(name.value, objData.value[1]), 2)}
  }
}

@media (prefers-color-scheme: light) and (prefers-contrast: more) {
  ${sel} {
${stylesString(convertToProps(name.value, objData.value[2]), 2)}
  }
}

@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  ${sel} {
${stylesString(convertToProps(name.value, objData.value[3]), 2)}
  }
}` : '';
  }

});

function stylesString(styles, indent = 0) {
  return Object.keys(styles)
    .reduce((string, style) => !style.startsWith('$') ? `${string}${styles[style] ? `${'  '.repeat(indent)}${style}: ${styles[style]}` : ''};\n` : string, '').slice(0, -1);
}

function downloadCSS() {
  const content = css.value;

  const blob = new Blob([content], { type: 'text/css;charset=utf-8' });

  saveAs(blob, 'theme.css');
}

function downloadJS() {
  const blob = new Blob([schemeScript], { type: 'text/css;charset=utf-8' });

  saveAs(blob, 'theme.js');
}

const copied = ref(false);

let copyTimer;

function copyCSS() {
  clearTimeout(copyTimer);

  copy(css.value);

  copied.value = true;

  copyTimer = setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>
