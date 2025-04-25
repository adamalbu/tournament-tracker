<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    options: {
      type: Array as () => string[],
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:selectedOption'],
  methods: {
    selectOption(option: string) {
      this.$emit('update:selectedOption', option);
    },
  },
});
</script>

<template>
  <div>
    <span>{{ label }}</span>
    <button
      v-for="(option, index) in options"
      :key="option"
      :class="{
        alternative: option !== selectedOption,
        left: index === 0,
        right: index === options.length - 1
      }"
      @click="selectOption(option)"
    >
      {{ option.charAt(0).toUpperCase() + option.slice(1) }}
    </button>
  </div>
</template>

<style scoped>
.left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid var(--color-accent);
  border-right: none;
}

.right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid var(--color-accent);
  border-left: none;
}
</style>
