<template>
  <nu-root
    font="Baloo 2"
    fill="subtle"
    height="min 100vh"
    overflow="no"
    width="max 100vw"
  >
    <nu-block width="max 120x" space="0 auto">
      <nu-flow width="max 86x" gap="2x" padding="2x">
        <nu-theme :hue="hue" :saturation="saturation" />
        <nu-flow gap="2x">
          <nu-pane>
            <nu-h1>CSS Theme Builder</nu-h1>
            <nu-pane></nu-pane>
          </nu-pane>
          <nu-flow size="h5" text="sb">
            <nu-block>
              CSS Generator • light/dark scheme • normal/high contrast
            </nu-block>
            <nu-block>
              Based on
              <nu-link to="!https://numl.design">Numl.Design</nu-link>
              theme generator
            </nu-block>
          </nu-flow>

          <nu-h2> Options </nu-h2>

          <nu-grid columns="auto 1fr" gap="2x" items="center stretch">
            <nu-block>
              <nu-card
                width="12x"
                height="12x"
                radius="2r"
                shadow="#shadow"
                clear
                :fill="`hue(${hue} ${saturation} special ${
                  isPastel ? 'pastel' : ''
                })`"
              />
            </nu-block>

            <nu-flow gap>
              <nu-flow gap=".5x">
                <nu-pane>
                  <nu-label>Hue:</nu-label>
                  <nu-el text="b">
                    {{ hue }}
                  </nu-el>
                </nu-pane>
                <nu-slider
                  id="hue"
                  :value="initialHue"
                  min="0"
                  max="359"
                  width="max 60x"
                  @input="hue = $event.detail"
                  image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))"
                >
                </nu-slider>
              </nu-flow>

              <nu-flow gap=".5x">
                <nu-pane>
                  <nu-label>Saturation:</nu-label>
                  <nu-el text="b">
                    {{ saturation }}
                  </nu-el>
                </nu-pane>
                <nu-slider
                  :value="initialSaturation"
                  min="0"
                  max="100"
                  width="max 60x"
                  @input="saturation = $event.detail"
                  :image="`linear(to right, hue(${hue} 0 s), hue(${hue} 100 s))`"
                />
              </nu-flow>

              <nu-pane>
                <nu-label>Use pastel palette:</nu-label>
                <nu-checkbox
                  :checked="isPastel"
                  @input="isPastel = $event.detail"
                />
              </nu-pane>
            </nu-flow>
          </nu-grid>

          <nu-pane>
            <nu-attrs for="btn" padding=".5x 1.5x" />
            <nu-label>Type:</nu-label>
            <nu-btngroup
              use-radiogroup
              :value="type"
              @input="type = $event.detail"
            >
              <nu-btn value="main">Main</nu-btn>
              <nu-btn value="tint">Tint</nu-btn>
              <nu-btn value="tone">Tone</nu-btn>
              <nu-btn value="swap">Swap</nu-btn>
              <nu-btn value="special">Special</nu-btn>
            </nu-btngroup>
          </nu-pane>

          <nu-pane>
            <nu-attrs for="btn" padding=".5x 1.5x" />
            <nu-label>Contrast:</nu-label>
            <nu-btngroup
              use-radiogroup
              :value="contrast"
              @input="contrast = $event.detail"
            >
              <nu-btn value="soft">Soft</nu-btn>
              <nu-btn value="normal">Normal</nu-btn>
              <nu-btn value="strong">Strong</nu-btn>
            </nu-btngroup>
          </nu-pane>

          <nu-pane>
            <nu-attrs for="btn" padding=".5x 1.5x" />
            <nu-label>Emphasizing:</nu-label>
            <nu-btngroup
              use-radiogroup
              :value="emphasizing"
              @input="emphasizing = $event.detail"
              :disabled="disableEmphasizing"
            >
              <nu-btn value="dim">Dim</nu-btn>
              <nu-btn value="normal">Normal</nu-btn>
              <nu-btn value="bold">Bold</nu-btn>
            </nu-btngroup>
          </nu-pane>
          <nu-block v-if="disableEmphasizing">
            Only for <nu-strong>Tone</nu-strong> and
            <nu-strong>Swap</nu-strong> types.
          </nu-block>
        </nu-flow>

        <nu-h2> Output </nu-h2>

        <nu-flow gap>
          <nu-attrs for="tab" text="sb nowrap" />
          <nu-tablist
            border="bottom inside"
            :value="outputTab"
            @input="outputTab = $event.detail"
          >
            <nu-tab value="colors">Colors</nu-tab>
            <nu-tab value="css">CSS</nu-tab>
            <nu-tab value="numl">Numl</nu-tab>
          </nu-tablist>

          <nu-card v-if="outputTab === 'colors'" fill="#white" color="#black">
            <nu-theme
              :hue="hue"
              :saturation="saturation"
              :pastel="isPastel || null"
              :mod="mod"
            />
            <nu-grid
              columns="repeat(auto-fit, minmax(15x, 1fr))"
              flow="row"
              gap="2x"
              width="max 100%"
              text="nowrap"
            >
              <nu-attrs for="circle" border="#lightgrey 1bw" size="4x" />
              <nu-attrs for="pane" text="sb" />

              <nu-pane>
                <nu-circle fill="#bg" />
                <nu-el>bg</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#text" />
                <nu-el>text</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#text-soft" />
                <nu-el>text-soft</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#text-strong" />
                <nu-el>text-strong</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#subtle" />
                <nu-el>subtle</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#border" />
                <nu-el>border</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#shadow" />
                <nu-el>shadow</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#input" />
                <nu-el>input</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#special" />
                <nu-el>special</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#special-bg" />
                <nu-el>special-bg</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#special-text" />
                <nu-el>special-text</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#special-shadow" />
                <nu-el>special-shadow</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#special-mark" />
                <nu-el>special-mark</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#mark" />
                <nu-el>mark</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#outline" />
                <nu-el>outline</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#light" />
                <nu-el>light</nu-el>
              </nu-pane>
              <nu-pane>
                <nu-circle fill="#dark" />
                <nu-el>dark</nu-el>
              </nu-pane>
            </nu-grid>
          </nu-card>
        </nu-flow>

        <nu-line />

        <nu-pane content="space-between">
          <nu-block>
            Built by <nu-link to="!https://tenphi.me">Andrey Yamanov</nu-link>
          </nu-block>

          <nu-block>
            Stack: <nu-link to="!https://numl.design">Numl.Design</nu-link> &
            <nu-link to="!https://vitejs.dev">Vite</nu-link> &
            <nu-link to="!https://vuejs.org">Vue.js</nu-link>
          </nu-block>
        </nu-pane>
      </nu-flow>

      <nu-card
        place="fixed right 0"
        radius="2r left"
        clear
        fill="bg"
        height="100vh - 8x"
        width="41x"
        gap
      >
        <nu-theme
          :hue="hue"
          :saturation="saturation"
          :pastel="isPastel || null"
          :mod="mod"
        />
        <nu-h2>Preview</nu-h2>
        <nu-line />
        <nu-h3>Button states</nu-h3>
        <nu-pane flow="row wrap">
          <nu-btn use-action="n">Default</nu-btn>
          <nu-btn use-action="n" is-hover mark>Hover</nu-btn>
          <nu-btn use-action="n" is-active>Pressed</nu-btn>
          <nu-btn use-action="n" is-pressed>Toggled</nu-btn>
          <nu-btn use-action="n" outline="focus" is-focus>Focused</nu-btn>
          <nu-btn use-action="n" disabled>Disabled</nu-btn>
        </nu-pane>

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
      </nu-card>
    </nu-block>
  </nu-root>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

// const theme = {
//   hue: 272,
//   saturation: 70,
//   type: "main",
//   pastel: false,
//   contrast: "normal",
//   emphasizing: "normal",
// };

const initialHue = 272;
const hue = ref(initialHue);

const initialSaturation = 70;
const saturation = ref(initialSaturation);

const type = ref("main");
const isPastel = ref(false);
const contrast = ref("normal");
const emphasizing = ref("normal");

const disableEmphasizing = computed(() => {
  return (type.value !== "tone" && type.value !== "swap") || null;
});

const mod = computed(() => {
  let mod = "";

  if (type.value !== "main") {
    mod = type.value;
  }

  if (contrast.value !== "normal") {
    mod += ` ${contrast.value}`;
  }

  if (
    emphasizing.value !== "normal" &&
    (type.value === "tone" || type.value === "swap")
  ) {
    mod += ` ${emphasizing.value}`;
  }

  return mod;
});

const outputTab = ref("colors");
</script>
