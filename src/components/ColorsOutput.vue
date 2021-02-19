<template>
  <nu-card fill="#white" color="#black" gap="4x">
    <slot></slot>
    <nu-attrs for="circle" border="#lightgrey 1bw" size="4x"/>
    <nu-attrs for="pane" text="sb"/>

    <template v-for="(theme, index) in props.data" :key="index">
      <nu-flow gap="2x">
        <nu-flow>
          <nu-h5>{{ THEME_TITLES[index] }} variant</nu-h5>
          <nu-line></nu-line>
        </nu-flow>
        <nu-grid
          columns="repeat(auto-fit, minmax(15x, 1fr))"
          flow="row"
          gap="4x"
          width="max 100%"
          text="nowrap"
        >
          <nu-pane v-for="color in theme">
            <nu-circle :fill="color.rgba"/>
            <nu-flow>
              <nu-block>{{ color.name }}</nu-block>
              <nu-block size="xs" text="sb" opacity=".75">
                {{ color.rgba }}
              </nu-block>
            </nu-flow>
          </nu-pane>
        </nu-grid>
      </nu-flow>
    </template>
  </nu-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { THEME_TITLES } from '../helpers/colors';

const props = defineProps({
  data: Array,
});
</script>
