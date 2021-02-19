<template>
  <nu-card
    place="fixed right 0"
    radius="2r left"
    clear
    border="top left bottom"
    fill="subtle"
    height="100vh - 4x"
    overflow="auto"
    width="41x"
    gap="2x"
    padding="0 2x 2x 2x"
  >
    <slot></slot>
    <nu-flow place="sticky top" fill="subtle" z="front" gap padding="2x 2x 0 2x" space="0 2x">
      <nu-pane content="space-between">
        <nu-h2>Preview</nu-h2>
        <ThemeSwitch/>
      </nu-pane>
      <nu-line />
    </nu-flow>

    <nu-pane content="space-between">
      <nu-h5>Numl.Design elements</nu-h5>
      <nu-link clear to="!https://numl.design/repl">Open REPL</nu-link>
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
  </nu-card>
</template>

<script setup>
import ThemeSwitch from './ThemeSwitch.vue';
</script>
