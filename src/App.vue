<template>
  <nu-root
    id="root"
    font="Baloo 2"
    fill="subtle"
    height="min 100vh"
    overflow="no"
    width="max 100vw"
    color="text"
    responsive="1050px|700px"
    :style="styles"
  >
    <Theme
      :hue="hue"
      :accentHue="toneType === 'duo' ? accentHue : null"
      :saturation="saturation"
      :pastel="isPastel"
    />
    <nu-block width="max 130x" space="0 auto">
      <nu-flow width="(100% - 42x)||100%" gap="2x" padding="2x">
        <nu-flow gap="1x">
          <nu-pane items="baseline start">
            <nu-h1 size="h2|h3">CSS Theme Generator</nu-h1>
            <nu-el size="lg" text="b">v1.0.0</nu-el>
          </nu-pane>
          <nu-flow text="sb">
            <nu-block size="h4">
              <nu-icon name="logo-github" size="1em"/>
              open source • light/dark scheme • normal/high contrast
            </nu-block>
            <nu-block>
              Based on
              <nu-link to="!https://numl.design">Numl.Design</nu-link>
              theme generator
              by <nu-link to="!https://tenphi.me">
                @tenphi
              </nu-link> and <nu-link to="!https://www.hsluv.org">HSLuv</nu-link> color
              space by <nu-link to="!https://twitter.com/boronine">@boronine</nu-link>
            </nu-block>
          </nu-flow>

          <nu-tablist
            :value="section" @input="section = $event.detail"
            border="bottom center 2bw" size="h3|h4" text="sb">
            <nu-tab value="colors">Colors</nu-tab>
            <nu-tab value="properties">Properties</nu-tab>
          </nu-tablist>

          <nu-flow v-show="section === 'properties'">
            <nu-h5>Coming soon...</nu-h5>
          </nu-flow>

          <nu-flow v-show="section === 'colors'" gap="2x">
            <nu-tablist :value="toneType" @input="toneType = $event.detail" border="bottom inside">
              <nu-tab value="single">Single tone</nu-tab>
              <nu-tab value="duo">Duo tone</nu-tab>
            </nu-tablist>

            <nu-grid columns="auto 1fr" gap="2x" items="center stretch" width="max 70x">
              <nu-pane flow="column" gap="2x">
                <nu-card
                  v-show="toneType === 'single'"
                  width="12x"
                  height="12x"
                  radius="2r"
                  shadow="#shadow"
                  clear
                  :fill="`hue(${hue} ${saturation} special ${
                    isPastel ? 'pastel' : ''
                  })`"
                />
                <template v-if="toneType === 'duo'">
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
                  <nu-pane content="space-between">
                    <nu-pane>
                      <nu-label>{{ toneType === 'duo' ? 'Main ' : '' }}Hue:</nu-label>
                      <NumInput
                        :value="hue"
                        @input="hue = $event"
                        :min="0"
                        :max="359"
                      />
                    </nu-pane>
                    <nu-btn padding="0 .5x" clear @tap="insertColor()">
                      insert
                      <nu-icon name="color-palette-outline"/>
                    </nu-btn>
                  </nu-pane>
                  <nu-slider
                    id="hue"
                    :value="hue"
                    min="0"
                    max="359"
                    @input="hue = $event.detail"
                    image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))"
                  >
                  </nu-slider>
                </nu-flow>

                <nu-flow v-show="toneType === 'duo'" gap=".5x">
                  <nu-pane content="space-between">
                    <nu-pane>
                      <nu-label>Accent Hue:</nu-label>
                      <NumInput
                        :value="accentHue"
                        @input="accentHue = $event"
                        :min="0"
                        :max="359"
                      />
                    </nu-pane>
                    <nu-btn padding="0 .5x" clear @tap="insertColor(true)">
                      insert
                      <nu-icon name="color-palette-outline"/>
                    </nu-btn>
                  </nu-pane>
                  <nu-slider
                    id="hue"
                    :value="accentHue"
                    min="0"
                    max="359"
                    @input="accentHue = $event.detail"
                    image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))"
                  >
                  </nu-slider>
                </nu-flow>

                <nu-flow gap=".5x">
                  <nu-pane>
                    <nu-label>Saturation:</nu-label>
                    <NumInput
                      :value="saturation"
                      @input="saturation = $event"
                    />
                  </nu-pane>
                  <nu-slider
                    :value="saturation"
                    min="0"
                    max="100"
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
              <nu-block v-show="disableEmphasizing" size="sm">
                <nu-icon name="alert-circle-outline"/>
                Only for
                <nu-strong>Tone</nu-strong>
                and
                <nu-strong>Swap</nu-strong>
                types.
              </nu-block>
            </nu-pane>
          </nu-flow>
        </nu-flow>

        <nu-h3>Output</nu-h3>

        <nu-progressbar v-if="loading" />

        <nu-flow v-else gap>
          <nu-attrs for="tab" text="sb nowrap"/>
          <nu-pane content="space-between" border="bottom inside">
            <nu-tablist
              :value="outputTab"
              @input="outputTab = $event.detail"
            >
              <nu-tab value="css">CSS</nu-tab>
              <nu-tab value="colors">Colors</nu-tab>
              <nu-tab value="numl">Numl</nu-tab>
            </nu-tablist>
          </nu-pane>

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

        <nu-pane
          content="space-between" flow="row|column"
          items="flex-start stretch|center" text="left|center"
        >
          <nu-flow gap>
            <nu-pane>
              <nu-attrs for="btn" clear padding radius="round" size="xs"/>
              Built by
              <nu-link to="!https://tenphi.me">Andrey Yamanov</nu-link>
              <nu-pane gap="0">
                <nu-btn to="!https://twitter.com/tenphi">
                  <nu-icon name="logo-twitter"/>
                </nu-btn>
                <nu-btn to="!https://github.com/tenphi">
                  <nu-icon name="logo-github"/>
                </nu-btn>
              </nu-pane>
            </nu-pane>

            <nu-block>
              Stack:
              <nu-link to="!https://numl.design">Numl.Design</nu-link>,
              <nu-link to="!https://vitejs.dev">Vite v2</nu-link>,
              <nu-link to="!https://vuejs.org">Vue v3</nu-link>
            </nu-block>
          </nu-flow>

          <nu-block>
            <nu-btn clear to="!https://github.com/numldesign/theme-generator">
              <nu-icon name="logo-github"/>
              Source Code
            </nu-btn>
          </nu-block>
        </nu-pane>
      </nu-flow>

      <Preview v-show="themeIsReady" :theme="{
        hue: hue,
        accentHue: toneType === 'duo' ? accentHue : null,
        saturation: saturation,
        pastel: isPastel,
        mod: mod,
      }"/>
    </nu-block>
    <ColorModal ref="colorModal" />
  </nu-root>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { setFavIcon } from './services/favicon';
import { THEME_COLORS, MAIN_THEME_COLORS, rgbToHex } from './helpers/colors';
import { convertThemeToMarkup } from './helpers/nude';
import ColorsOutput from './components/ColorsOutput.vue';
import CSSOutput from './components/CSSOutput.vue';
import NumlOutput from './components/NumlOutput.vue';
import Theme from './components/Theme.vue';
import Preview from './components/Preview.vue';
import ColorModal from './components/ColorModal.vue';
import NumInput from './components/NumInput.vue';

const Nude = window.Nude;

// const theme = {
//   hue: 272,
//   saturation: 70,
//   type: "main",
//   pastel: false,
//   contrast: "normal",
//   emphasizing: "normal",
// };

const ROOT = document.documentElement;

ROOT.dataset.nuReducedMotion = '';

const loading = ref(true);

onMounted(() => {
  updateFavIcon();

  setTimeout(() => loading.value = false, 1000);
});

watch(loading, () => {
  if (!loading.value) {
    delete ROOT.dataset.nuReducedMotion;
  }
});

const colorModal = ref();
const toneType = ref('single');

const initialHue = 242;
const hue = ref(initialHue);
const initialAccentHue = 0;
const accentHue = ref(initialAccentHue);

const initialSaturation = 75;
const saturation = ref(initialSaturation);

const type = ref("main");
const isPastel = ref(false);
const contrast = ref("normal");
const emphasizing = ref("normal");

const section = ref('colors');

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
    pastel: isPastel.value,
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
          hsluv[i] = Math.round(val * 10) / 10;
        }
      });

      colors.push({
        name: key,
        rawRgba: rgba,
        rawHsluv: hsluv,
        rgb: `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`,
        rgba: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] || 1})`,
        hsluv: `hsluv(${hsluv[0]},${hsluv[1]},${hsluv[2]},${hsluv[3] || 1})`,
        numl: `#${key}`,
        hex: rgbToHex(...rgba),
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

const outputTab = ref("css");

watch(hue, () => {
  if (hue.value < 0 || hue.value > 359) {
    hue.value = 0;
  }
});
watch(accentHue, () => {
  if (accentHue.value < 0 || accentHue.value > 359) {
    accentHue.value = 0;
  }
});
watch(saturation, () => {
  if (saturation.value < 0 || saturation.value > 100) {
    saturation.value = 0;
  }
});

const themeIsReady = ref(true);

let hideTimer;

function updateFavIcon() {
  const mainHue = toneType.value === 'duo' ? accentHue : hue;

  setFavIcon(Nude.hue(`${mainHue.value} ${saturation.value}`, ROOT.dataset.nuSchemeIs === 'dark'));
}

watch([hue, accentHue, saturation, toneType], updateFavIcon);

watch([hue, accentHue, saturation], () => {
  clearTimeout(hideTimer);

  themeIsReady.value = false;

  updateFavIcon();

  hideTimer = setTimeout(() => {
    themeIsReady.value = true;
  }, 500);
});

watch(themeIsReady, () => {
  if (themeIsReady.value) {
    setTimeout(() => {
      delete ROOT.dataset.nuReducedMotion;
    });
  } else {
    ROOT.dataset.nuReducedMotion = '';
  }
});

function insertColor(isAccent) {
  colorModal.value.open()
    .then(({ hue: newHue, saturation: newSaturation }) => {
      if (!isAccent) {
        hue.value = newHue;
        saturation.value = newSaturation;
      } else {
        accentHue.value = newHue;
        saturation.value = newSaturation;
      }
    })
    .catch(() => {
      // do nothing
    });
}

const styles = computed(() => {
  let stls = '';

  colorData.value.forEach((theme, index) => {
    theme.forEach(color => {
      stls += `--${color.name}-color${index}: ${color.rgba};`;
      stls += `--${color.name}-color-opaque${index}: ${color.rgb};`;
      stls += `--${color.name}-color-rgb${index}: ${color.rawRgba.slice(0, 3).join(',')};`;
    });
  });

  return stls;
});
</script>
