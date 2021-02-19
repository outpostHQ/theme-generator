<template>
  <nu-card fill="bg" v-if="objData">
    <nu-code>
      <nu-block v-html="css"/>
    </nu-code>
  </nu-card>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import { THEME_TITLES } from '../helpers/colors';

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
const type = ref('automatic');
const name = ref('name');
const css = computed(() => {
  return objData ? `html[data-nu-scheme-is="light"][data-nu-contrast-is="low"] body {
${stylesString(convertToProps(name.value, objData.value[0]))}
}
html[data-nu-scheme-is="dark"][data-nu-contrast-is="low"] body {
${stylesString(convertToProps(name.value, objData.value[1]))}
}
html[data-nu-scheme-is="light"][data-nu-contrast-is="high"] body {
${stylesString(convertToProps(name.value, objData.value[2]))}
}
html[data-nu-scheme-is="dark"][data-nu-contrast-is="high"] body {
${stylesString(convertToProps(name.value, objData.value[3]))}
}` : '';
});

function stylesString(styles) {
  return Object.keys(styles)
    .reduce((string, style) => !style.startsWith('$') ? `${string}${styles[style] ? `  ${style}: ${styles[style]}` : ''};\n` : string, '').slice(0, -1);
}
</script>
