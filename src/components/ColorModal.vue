<template>
  <focus-trap v-model="isOpen">
    <nu-block
      :is-open="isOpen || null"
      opacity="0 :open[1]"
      transition="opacity"
      interactive="n :open[y]"
      place="fixed cover"
      fill="#black.50"
      z="top"
      radius="2r" shadow="#special-shadow">
      <nu-card place="inside" width="max 40x" gap>
        <nu-heading level="4">Insert color:</nu-heading>
        <nu-block>
          You can insert any valid CSS-color: named, hex, rgb, rgba, hsl, etc...
        </nu-block>
        <nu-pane>
          <nu-input
            width="auto" grow="1"
            :value="color" @input="setValue($event.detail)" :success="isValid || null">
            <input ref="inputRef"/>
          </nu-input>
          <nu-card
            width="5x" height="5x" padding="0" radius
            :fill="hue != null && saturation != null ? `hue(${hue} ${saturation} special)` : '#grey'"/>
        </nu-pane>
        <nu-grid columns="1pr 1pr" gap>
          <nu-block text="sb">
            Hue: {{ hue != null && hue === hue ? hue : '–' }}
          </nu-block>
          <nu-block text="sb">
            Saturation: {{ saturation != null && saturation === saturation ? saturation : '–' }}
          </nu-block>
        </nu-grid>
        <nu-grid columns="1pr 1pr" gap>
          <nu-btn special @tap="resolve" :disabled="!isValid">
            Submit
          </nu-btn>
          <nu-btn @tap="reject">
            Cancel
          </nu-btn>
        </nu-grid>
      </nu-card>
    </nu-block>
  </focus-trap>
</template>

<script>
import HTML_COLORS from '../data/html-colors';

function extractColor(str) {
  str = str.trim();

  if (HTML_COLORS[str]) str = HTML_COLORS[str];

  return Nude.color.extractColor(str);
}

export default {
  data() {
    return {
      color: '',
      error: '',
      promise: null,
      resolve: () => {},
      reject: () => {},
      isOpen: false,
    };
  },
  computed: {
    hue() {
      const clr = extractColor(this.color);

      if (!clr) return;

      return Math.round(Nude.color.rgbToHsl(clr)[0]);
    },
    saturation() {
      const clr = extractColor(this.color);

      if (!clr) return;

      return Math.round(Nude.color.rgbToHsl(clr)[1]);
    },
    isValid() {
      return !!extractColor(this.color);
    },
  },
  methods: {
    setValue(value) {
      this.color = value;
      this.error = '';
    },
    open() {
      this.isOpen = true;
      this.color = '';
      this.$refs.inputRef.focus();

      return new Promise((resolve, reject) => {
        this.resolve = () => {
          const { hue, saturation } = this;
          const color = this.color;

          resolve({ hue, saturation });
        };
        this.reject = reject;
      }).finally(() => this.isOpen = false);
    },
  },
}
</script>
