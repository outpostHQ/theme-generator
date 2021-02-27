<template>
  <nu-flow gap>
    <nu-pane content="space-between">
      <nu-attrs for="btn" padding="1x 2x"/>
      <nu-btngroup use-radiogroup :value="notation" @input="notation = $event.detail" inline>
        <nu-btn value="rgba">Rgba</nu-btn>
        <nu-btn value="hex">Hex</nu-btn>
        <nu-btn value="hsluv">HSLuv</nu-btn>
      </nu-btngroup>
      <nu-btn clear @tap="downloadAsJSON" padding=".5x 1x">
        <nu-icon name="download-outline"/>
        JSON
      </nu-btn>
    </nu-pane>

    <nu-card fill="#white" color="#black" gap="4x">
      <slot></slot>
      <nu-attrs for="pane" text="sb"/>

      <template v-for="(theme, index) in props.data" :key="index">
        <nu-flow gap="2x">
          <nu-flow>
            <nu-h5>{{ THEME_TITLES[index] }} variant</nu-h5>
            <nu-line></nu-line>
          </nu-flow>
          <nu-grid
            columns="repeat(auto-fit, minmax(16x, 1fr))"
            flow="row"
            gap="2x 1x"
            width="max 100%"
            text="nowrap"
          >
            <Color v-for="color in theme" :data="color" :notation="notation"/>
          </nu-grid>
        </nu-flow>
      </template>
    </nu-card>
  </nu-flow>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import saveAs from 'file-saver';
import { THEME_TITLES } from '../helpers/colors';
import Color from './Color.vue';

const props = defineProps({
  data: Array,
});
const notation = ref('rgba');

function downloadAsJSON() {
  const content = JSON.stringify({
    light: props.data[0],
    dark: props.data[1],
    lightContrast: props.data[2],
    darkContrast: props.data[3],
  });

  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });

  saveAs(blob, 'design-system-colors.json')
}
</script>
