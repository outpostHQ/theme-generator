<template>
  <nu-card fill="bg" gap="2x">
    <nu-flow>
      <nu-h5>HTML</nu-h5>
      <nu-line></nu-line>
    </nu-flow>
    <nu-code>
      <nu-block v-html="html"/>
    </nu-code>
  </nu-card>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { THEME_TITLES } from '../helpers/colors';

const props = defineProps({
  hue: Number,
  accentHue: Number,
  saturation: Number,
  pastel: Boolean,
  mod: String,
});
const html = computed(() => {
  return `<nu-theme
  hue="${props.accentHue != null ? props.accentHue : props.hue}"
  saturation="${props.saturation}"${props.pastel ? '\npastel' : ''}${props.mod ? `\nmod="${props.mod}"` : ''}
></nu-theme>${
    props.accentHue != null ? `
<nu-theme
  hue="${props.hue}
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
></nu-props>` : ''}`
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
});
</script>
