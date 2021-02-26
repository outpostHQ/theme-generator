<template>
  <nu-btn
    fill="#white" color="#black"
    border="n" padding="0 .5x" content="center start" radius="8r 2r 2r 8r" @click="copyColor">
    <nu-circle
      v-if="props.data.rawRgba[3] === 1" :fill="props.data.rgba"
      border="#lightgrey 1bw" size="4x"
    />
    <nu-circle
      v-else image="transparent url(/img/contrast-bg.png) repeat 3px 0% / 8px 8px" box="y"
      border="#lightgrey 1bw" size="4x"
    >
      <nu-block :fill="props.data.rgb" place="left" height="100%" width="50%" radius="99rem 0 0 99rem"/>
      <nu-block :fill="props.data.rgba" place="right" height="100%" width="50%" radius="0 99rem 99rem 0"/>
    </nu-circle>
    <nu-tooltip text="nowrap" size="sm">
      <nu-heading level="6">
        usage:
      </nu-heading>
      <nu-flow v-html="getTooltip(props.data.name)"/>
    </nu-tooltip>
    <nu-flow box="y">
      <nu-block>{{ props.data.name }}</nu-block>
      <nu-block size="xs" text="sb" opacity="^btn .75 :hover[0]" transition="opacity">
        {{ props.data[notation] }}
      </nu-block>
      <nu-block
        color="#special" place="left bottom" size="xs"
        opacity="^btn 0 :hover[1]" transition="opacity"
      >
        <nu-block v-if="!copied">
          CLICK TO COPY
        </nu-block>
        <nu-block v-else>
          <nu-icon name="checkmark-outline"/>
          COPIED
        </nu-block>
      </nu-block>
    </nu-flow>
  </nu-btn>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import copy from 'clipboard-copy';

const TOOLTIP_MAP = {
  bg: [
    'main background',
    'default widget background',
  ],
  text: [
    'main text',
    'widget text',
    'border of checkboxes and radio buttons',
  ],
  'text-soft': [
    'headings',
  ],
  'text-strong': [
    'high contrast text',
  ],
  subtle: [
    'secondary background',
  ],
  border: [
    'borders',
    'lines',
  ],
  shadow: [
    'main shadow',
  ],
  input: [
    'input background',
    'select background',
  ],
  outline: [
    'focus outline',
  ],
  mark: [
    'highlighted areas',
  ],
  special: [
    'special text',
  ],
  'special-bg': [
    'background of special areas',
    'background of special elements',
  ],
  'special-text': [
    'text of special areas',
    'text of special elements',
  ],
  'special-shadow': [
    'shadow for special areas',
    'shadow for of special elements',
  ],
  'special-mark': [
    'highlight for special areas',
    'highlight for of special elements',
  ],
  'light': [
    'light area background',
    'dark area text',
  ],
  'dark': [
    'dark area background',
    'light area text',
  ],
};

const props = defineProps({
  data: Object,
  notation: String,
});
const copied = ref(false);

function getTooltip(name) {
  return (TOOLTIP_MAP[name] || [])
    .map(label => `<nu-block>- ${label}</nu-block>`).join('');
}

let copyTimer;

function copyColor() {
  clearTimeout(copyTimer);

  copy(props.data[props.notation]);

  copied.value = true;

  copyTimer = setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>
