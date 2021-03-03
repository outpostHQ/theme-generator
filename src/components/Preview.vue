<template>
  <nu-block
    :is-show="show || null"
    interactive="no"
    fill="#clear||#clear :show[#dark.50]"
    place="fixed cover"
  >
    <nu-card
      :is-show="show || null"
      interactive="yes"
      place="fixed right"
      radius="2r left"
      clear
      border="top left bottom"
      fill="subtle"
      height="100wh - 4x"
      width="41x||40x (100% - 6x) 78x"
      transition="move"
      move="0 0||100% 0 :show[0 0]"
      display="flex"
      flow="column"
      z="0"
    >
      <Theme
        :hue="props.theme.hue"
        :accentHue="props.theme.accentHue"
        :saturation="props.theme.saturation"
        :pastel="props.theme.pastel"
        :mod="props.theme.mod"
      />
      <nu-flow>
        <nu-pane content="space-between">
          <nu-h2>Preview</nu-h2>
          <ThemeSwitch/>
        </nu-pane>
        <nu-line />
      </nu-flow>

      <nu-flow gap="2x" overflow="auto" padding="2x" space="0 2x 2x 2x" grow="1">
        <nu-pane content="space-between">
          <nu-h5>Numl.Design</nu-h5>
          <nu-link clear :to="replLink">Open REPL</nu-link>
        </nu-pane>

        <nu-pane>
          <nu-block>
            Paragraph text
          </nu-block>

          <nu-line orient="v"/>

          <nu-block color="#special">
            Special paragraph text
          </nu-block>
        </nu-pane>

        <nu-pane>
          <nu-card>
            Basic Card
          </nu-card>
          <nu-card clear>
            Clear Card
          </nu-card>
        </nu-pane>

        <nu-pane flow="row wrap">
          <nu-badge>Basic badge</nu-badge>
          <nu-badge special>Special badge</nu-badge>
        </nu-pane>

        <nu-flow gap>
          <nu-h5>Basic button states</nu-h5>
          <nu-pane flow="row wrap">
            <nu-btn use-action="n">Default</nu-btn>
            <nu-btn use-action="n" is-hover mark>Hover</nu-btn>
            <nu-btn use-action="n" is-active>Pressed</nu-btn>
            <nu-btn use-action="n" is-pressed>Toggled</nu-btn>
            <nu-btn use-action="n" outline="focus" is-focus>Focused</nu-btn>
            <nu-btn use-action="n" disabled>Disabled</nu-btn>
          </nu-pane>
        </nu-flow>

        <nu-flow gap>
          <nu-h5>Special button states</nu-h5>
          <nu-pane flow="row wrap">
            <nu-btn special use-action="n">Default</nu-btn>
            <nu-btn special use-action="n" is-hover mark>Hover</nu-btn>
            <nu-btn special use-action="n" is-active>Pressed</nu-btn>
            <nu-btn special use-action="n" is-pressed>Toggled</nu-btn>
            <nu-btn special use-action="n" outline="focus" is-focus
              >Focused</nu-btn
            >
            <nu-btn special use-action="n" disabled>Disabled</nu-btn>
          </nu-pane>
        </nu-flow>

        <nu-h5>Various widgets</nu-h5>

        <nu-radiogroup value="one" gap="2x">
          <nu-pane>
            <nu-radio value="one"/>
            <nu-label>One</nu-label>
          </nu-pane>
          <nu-pane>
            <nu-radio value="two"/>
            <nu-label>Two</nu-label>
          </nu-pane>
          <nu-pane>
            <nu-radio value="three"/>
            <nu-label>Three</nu-label>
          </nu-pane>
        </nu-radiogroup>

        <nu-pane gap="2x">
          <nu-switch/>
          <nu-switch checked/>
          <nu-checkbox/>
          <nu-checkbox checked/>
        </nu-pane>

        <nu-listbox value="one">
          <nu-option value="one">
            Option 1
          </nu-option>
          <nu-option value="two">
            Option 2
          </nu-option>
          <nu-option value="three">
            Option 3
          </nu-option>
        </nu-listbox>

        <nu-tablist value="one" border="bottom inside">
          <nu-tab value="one">One</nu-tab>
          <nu-tab value="two">Two</nu-tab>
          <nu-tab value="three">Three</nu-tab>
        </nu-tablist>

        <nu-menu border>
          <nu-menuitem>Menuitem 1</nu-menuitem>
          <nu-menuitem>Menuitem 2</nu-menuitem>
          <nu-menuitem>Menuitem 3</nu-menuitem>
        </nu-menu>

        <nu-progressbar/>

        <nu-slider value="50"></nu-slider>

        <nu-input placeholder="Placeholder"/>

        <nu-datepicker mode="range" />

        <nu-card fill="#dark" color="#light">
          Dark area
        </nu-card>

        <nu-card fill="#light" color="#dark">
          Light area
        </nu-card>
      </nu-flow>

      <nu-btn
        show="n||y"
        place="outside-left top 3x 0"
        special
        padding
        radius="99x 0 0 99x"
        toggle
        border="top left bottom"
        width="auto"
        inset="n :active[y]"
        :checked="show"
        @tap="show = !show"
        label="Toggle Preview"
      >
        <nu-icon name="^ eye-outline :checked[chevron-forward-circle-outline]"/>
      </nu-btn>
    </nu-card>
  </nu-block>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import LZString from 'lz-string';
import ThemeSwitch from './ThemeSwitch.vue';
import Theme from './Theme.vue';
import { convertThemeToMarkup } from '../helpers/nude';
import replMarkup from '../data/repl-markup';

const show = ref(false);
const props = defineProps({
  theme: Object,
  show: Boolean,
});
const themeMarkup = computed(() => {
  return convertThemeToMarkup(props.theme);
});
const replHash = computed(() => {
  return LZString.compressToEncodedURIComponent(
    JSON.stringify({
      markup: replMarkup(themeMarkup.value),
    }),
  );
});
// Original: https://numl.design/repl#6038e9246cd202483f3a87a4
const replLink = computed(() => `!https://numl.design/repl#${replHash.value}`);
</script>
