<template>
  <nu-root
    font="Baloo 2"
    fill="subtle"
    height="min 100vh"
    overflow="no"
    width="max 100vw"
    color="text"
  >
    <Theme
      :hue="hue"
      :accentHue="toneType === 'duo' ? accentHue : null"
      :saturation="saturation"
      :pastel="isPastel"
    />
    <nu-block width="max 120x" space="0 auto">
      <nu-flow width="max 88x" gap="2x" padding="2x">
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

          <nu-h2> Options</nu-h2>

          <nu-tablist :value="toneType" @input="toneType = $event.detail" border="bottom inside">
            <nu-tab value="single">Single tone</nu-tab>
            <nu-tab value="duo">Duo tone</nu-tab>
          </nu-tablist>

          <nu-grid columns="auto 1fr" gap="2x" items="center stretch">
            <nu-pane flow="column" gap="2x">
              <nu-card
                v-if="toneType === 'single'"
                width="12x"
                height="12x"
                radius="2r"
                shadow="#shadow"
                clear
                :fill="`hue(${hue} ${saturation} special ${
                  isPastel ? 'pastel' : ''
                })`"
              />
              <template v-else>
                <nu-card
                  width="8x"
                  height="8x"
                  radius="2r"
                  shadow="#shadow"
                  clear
                  :fill="`hue(${hue} ${saturation} special ${
                    isPastel ? 'pastel' : ''
                  })`"
                />
                <nu-card
                  width="8x"
                  height="8x"
                  radius="2r"
                  shadow="#shadow"
                  clear
                  :fill="`hue(${accentHue} ${saturation} special ${
                    isPastel ? 'pastel' : ''
                  })`"
                />
              </template>
            </nu-pane>

            <nu-flow gap>
              <nu-flow gap=".5x">
                <nu-pane>
                  <nu-label>{{ toneType === 'duo' ? 'Main ' : '' }}Hue:</nu-label>
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

              <nu-flow v-if="toneType === 'duo'" gap=".5x">
                <nu-pane>
                  <nu-label>Accent Hue:</nu-label>
                  <nu-el text="b">
                    {{ accentHue }}
                  </nu-el>
                </nu-pane>
                <nu-slider
                  id="hue"
                  :value="initialAccentHue"
                  min="0"
                  max="359"
                  width="max 60x"
                  @input="accentHue = $event.detail"
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
            <nu-attrs for="btn" padding=".5x 1.5x"/>
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
            <nu-attrs for="btn" padding=".5x 1.5x"/>
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

          <nu-pane flow="row wrap">
            <nu-attrs for="btn" padding=".5x 1.5x"/>
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
            <nu-block v-if="disableEmphasizing" size="sm">
              <nu-icon name="alert-circle-outline"/>
              Only for
              <nu-strong>Tone</nu-strong>
              and
              <nu-strong>Swap</nu-strong>
              types.
            </nu-block>
          </nu-pane>
        </nu-flow>

        <nu-h2> Output</nu-h2>

        <nu-flow gap>
          <nu-attrs for="tab" text="sb nowrap"/>
          <nu-tablist
            border="bottom inside"
            :value="outputTab"
            @input="outputTab = $event.detail"
          >
            <nu-tab value="colors">Colors</nu-tab>
            <nu-tab value="css">CSS</nu-tab>
            <nu-tab value="numl">Numl</nu-tab>
          </nu-tablist>

          <ColorsOutput v-if="outputTab === 'colors'" :data="colorData"/>
          <CSSOutput v-if="outputTab === 'css'" :data="colorData"/>
          <NumlOutput
            v-if="outputTab === 'numl'"
            :data="colorData"
            :hue="hue"
            :accentHue="toneType === 'duo' ? accentHue : null"
            :saturation="saturation"
            :pastel="isPastel"
            :mod="mod"
          />
        </nu-flow>

        <nu-line/>

        <nu-pane content="space-between">
          <nu-block>
            Built by
            <nu-link to="!https://tenphi.me">Andrey Yamanov</nu-link>
          </nu-block>

          <nu-block>
            Stack:
            <nu-link to="!https://numl.design">Numl.Design</nu-link>
            &
            <nu-link to="!https://vitejs.dev">Vite</nu-link>
            &
            <nu-link to="!https://vuejs.org">Vue.js</nu-link>
          </nu-block>
        </nu-pane>
      </nu-flow>

      <Preview>
        <Theme
          :hue="hue"
          :accentHue="toneType === 'duo' ? accentHue : null"
          :saturation="saturation"
          :pastel="isPastel"
          :mod="mod"
        />
      </Preview>
    </nu-block>
  </nu-root>
</template>

<script setup>
import { computed, ref } from "vue";
import { THEME_COLORS, MAIN_THEME_COLORS } from './helpers/colors';
import ColorsOutput from './components/ColorsOutput.vue';
import CSSOutput from './components/CSSOutput.vue';
import NumlOutput from './components/NumlOutput.vue';
import Theme from './components/Theme.vue';
import Preview from './components/Preview.vue';

const Nude = window.Nude;

// const theme = {
//   hue: 272,
//   saturation: 70,
//   type: "main",
//   pastel: false,
//   contrast: "normal",
//   emphasizing: "normal",
// };

const toneType = ref('single');

const initialHue = 272;
const hue = ref(initialHue);
const initialAccentHue = 30;
const accentHue = ref(initialAccentHue);

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

  return mod.trim();
});

function getThemeConfig({ hue, darkScheme, highContrast }) {
  return {
    hue,
    saturation: saturation.value,
    type: type.value,
    contrast: contrast.value,
    lightness: emphasizing.value,
    pastel: isPastel,
    darkScheme,
    highContrast,
  };
}

function generateTheme({ darkScheme, highContrast }) {
  const duo = toneType.value === 'duo';
  const { generate } = Nude.themes;

  const mainTheme = generate(getThemeConfig({
    hue: hue.value,
    darkScheme,
    highContrast,
  }));

  let accentTheme;

  if (duo) {
    accentTheme = generate(getThemeConfig({
      hue: accentHue.value,
      darkScheme,
      highContrast,
    }));

    Object.keys(mainTheme).forEach(key => {
      if (!MAIN_THEME_COLORS.includes(key)) {
        mainTheme[key] = accentTheme[key];
      }
    });
  }

  return THEME_COLORS
    .reduce((colors, key) => {
      const value = mainTheme[key];
      const hsluv = value.length === 4 ? value : [...value, 1];
      const rgba = [...Nude.color.hslToRgb(hsluv), hsluv[3] || 1];

      hsluv.forEach((val, i) => {
        if (i < 3) {
          hsluv[i] = Math.round(val);
        }
      });

      colors.push({
        name: key,
        rawRgb: rgba,
        rawHsluv: hsluv,
        rgba: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] || 1})`,
        hsluv: `hsluv(${hsluv[0]},${hsluv[1]},${hsluv[2]},${hsluv[3] || 1})`,
        numl: `#${key}`,
      });

      return colors;
    }, []);
}

const colorData = computed(() => {
  const data = [
    generateTheme({ darkScheme: false, highContrast: false }),
    generateTheme({ darkScheme: true, highContrast: false }),
    generateTheme({ darkScheme: false, highContrast: true }),
    generateTheme({ darkScheme: true, highContrast: true }),
  ];

  return data;
});

const outputTab = ref("colors");
</script>
