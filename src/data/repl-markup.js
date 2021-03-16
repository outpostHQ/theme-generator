export default themeMarkup => `<nu-card
  radius="2r"
  fill="subtle"
  gap="2x"
  clear
>
  <!-- THEME START -->
${themeMarkup.split('\n').map(s => `  ${s}`).join('\n')}
  <!-- THEME END -->

  <nu-flow>
    <nu-pane content="space-between">
      <nu-h2>Preview</nu-h2>
    </nu-pane>
    <nu-line></nu-line>
  </nu-flow>

  <nu-pane>
    <nu-block>
      Paragraph text
    </nu-block>

    <nu-line orient="v"></nu-line>

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
      <nu-btn special use-action="n" outline="focus" is-focus>Focused</nu-btn>
      <nu-btn special use-action="n" disabled>Disabled</nu-btn>
    </nu-pane>
  </nu-flow>

  <nu-h5>Various widgets</nu-h5>

  <nu-pane gap="2x">
    <nu-radiogroup value="one" gap="2x">
      <nu-pane>
        <nu-radio value="one"></nu-radio>
        <nu-label>1</nu-label>
      </nu-pane>
      <nu-pane>
        <nu-radio value="two"></nu-radio>
        <nu-label>2</nu-label>
      </nu-pane>
    </nu-radiogroup>
    <nu-line orient="v"></nu-line>
    <nu-radiogroup value="three" gap="2x" disabled>
      <nu-pane>
        <nu-radio value="three"></nu-radio>
        <nu-label>3</nu-label>
      </nu-pane>
      <nu-pane>
        <nu-radio value="four"></nu-radio>
        <nu-label>4</nu-label>
      </nu-pane>
    </nu-radiogroup>
  </nu-pane>

  <nu-pane gap="2x">
    <nu-switch></nu-switch>
    <nu-switch checked></nu-switch>
    <nu-switch disabled></nu-switch>
    <nu-switch checked disabled></nu-switch>
  </nu-pane>

  <nu-pane gap="2x">
    <nu-checkbox></nu-checkbox>
    <nu-checkbox checked></nu-checkbox>
    <nu-checkbox disabled></nu-checkbox>
    <nu-checkbox checked disabled></nu-checkbox>
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

  <nu-progressbar></nu-progressbar>

  <nu-slider value="50"></nu-slider>
  <nu-slider value="50" disabled></nu-slider>

  <nu-input placeholder="Default input"></nu-input>
  <nu-input placeholder="Disabled default input" disabled></nu-input>
  <nu-input placeholder="Special input" special></nu-input>
  <nu-input placeholder="Disabled special input" special disabled></nu-input>

  <nu-datepicker mode="range"></nu-datepicker>

  <nu-card fill="#dark" color="#light">
    Dark area
  </nu-card>

  <nu-card fill="#light" color="#dark">
    Light area
  </nu-card>
</nu-card>`;
