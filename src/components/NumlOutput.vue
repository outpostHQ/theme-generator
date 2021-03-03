<template>
  <nu-flow gap>
    <nu-pane content="space-between">
      <nu-block>
        Insert this fragment of code into the element you want to declare theme in.
      </nu-block>
      <nu-btn clear @tap="copyMarkup" padding=".5x 1x">
        <nu-icon v-if="!copied" name="copy-outline"/>
        <nu-icon v-else name="checkmark-outline"/>
        Markup
        <nu-tooltip text="nowrap">
          {{ copied ? 'Copied' : 'Copy markup to Clipboard' }}
        </nu-tooltip>
      </nu-btn>
    </nu-pane>
    <nu-card fill="bg" gap="2x">
      <nu-flow>
        <nu-h5>HTML</nu-h5>
        <nu-line></nu-line>
      </nu-flow>
      <nu-code>
        <nu-block v-html="html"/>
      </nu-code>
    </nu-card>
  </nu-flow>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import copy from 'clipboard-copy';
import { convertThemeToMarkup } from '../helpers/nude';

const props = defineProps({
  hue: Number,
  accentHue: Number,
  saturation: Number,
  pastel: Boolean,
  mod: String,
});
const html = computed(() => {
  return convertThemeToMarkup(props, true);
});

const copied = ref(false);

let copyTimer;

function copyMarkup() {
  clearTimeout(copyTimer);

  copy(html.value);

  copied.value = true;

  copyTimer = setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>
