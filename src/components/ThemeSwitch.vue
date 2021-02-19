<template>
  <nu-pane>
    <nu-attrs for="btn" padding="1x"/>
    <nu-btn
      clear
      id="scheme" toggle label="Scheme" :pressed="scheme === 'dark' || undefined"
      control=":root[data-nu-scheme]" value="dark" off-value="light">
      <nu-icon name="moon-outline"></nu-icon>
      <nu-tooltip>Change scheme</nu-tooltip>
    </nu-btn>
    <nu-btn
      clear
      id="contrast" toggle label="Contrast mode"
      control=":root[data-nu-contrast]" value="high" off-value="low">
      <nu-icon name="contrast-outline"></nu-icon>
      <nu-tooltip>Change contrast</nu-tooltip>
    </nu-btn>
  </nu-pane>
</template>

<script setup>
import { ref, computed } from 'vue';

const ROOT = document.documentElement;
const DATASET = ROOT.dataset;
const queryMedia = ref(matchMedia('(prefers-color-scheme: dark)'));
const scheme = computed(() => {
  return (DATASET.nuScheme === 'dark' || queryMedia.value.matches) ? 'dark' : 'light';
});

queryMedia.value.addListener((media) => {
  queryMedia.value = media;
});
</script>
