<template>
  <nu-inputgroup>
    <nu-btn
      padding="0 .25x"
      @tap="() => (props.value - 1 >= props.min) && $emit('input', props.value - 1)"
    >
      <nu-icon size="md" name="remove-outline"></nu-icon>
    </nu-btn>
    <nu-numinput
      :value="props.value"
      @input="$emit('input', $event.detail)"
      width="4.5x" padding="0 .5x"
      text="b"
      :min="props.min"
      :max="props.max"
    />
    <nu-btn
      padding="0 .25x"
      @tap="() => (props.value + 1 <= props.max) && $emit('input', props.value + 1)"
    >
      <nu-icon size="md" name="add-outline"></nu-icon>
    </nu-btn>
  </nu-inputgroup>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  value: Number,
  min: {
    default: 0,
    type: Number,
  },
  max: {
    default: 100,
    type: Number,
  },
});
</script>
