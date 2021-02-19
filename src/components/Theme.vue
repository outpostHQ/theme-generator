<template>
  <nu-theme
    :hue="props.accentHue != null ? props.accentHue : props.hue"
    :saturation="props.saturation"
    :pastel="props.pastel || null"
    :mod="props.mod || ''"/>
  <template v-if="props.accentHue != null">
    <nu-theme
      name="secondary"
      :hue="props.hue"
      :saturation="props.saturation"
      :pastel="props.pastel || null"
      :mod="props.mod || ''"/>
    <nu-props
      bg-color="#secondary-bg"
      text-color="#secondary-text"
      text-soft-color="#secondary-text-soft"
      text-strong-color="#secondary-text-strong"
      subtle-color="#secondary-subtle"
      shadow-color="#secondary-shadow"
      border-color="#secondary-border"
      input-color="#secondary-input"
    />
  </template>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  hue: Number,
  accentHue: Number,
  saturation: Number,
  pastel: Boolean,
  mod: String,
});
</script>
