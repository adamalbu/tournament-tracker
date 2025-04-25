<script lang="ts">
import { defineComponent } from 'vue'
import CircleCross from '@/components/icons/circle-cross.vue'
import CircleCheck from '@/components/icons/circle-check.vue'

export default defineComponent({
  name: 'NumberInput',
  components: { CircleCheck, CircleCross },
  props: {
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    value: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    extraCondition: {
      type: Function,
      default: () => true,
    }
  },
  data() {
    return {
      internalValue: this.value,
      valid: true,
    }
  },
  emits: ['update:value', 'update:valid'],
  methods: {
    updateValue(event: Event) {
      const value = parseInt((event.target as HTMLInputElement).value)
      this.internalValue = value
      console.log("update")
      if (value >= this.min && value <= this.max && this.extraCondition(value)) {
        this.$emit('update:value', value)
        this.valid = true
      } else {
        this.valid = false
      }
      console.log(this.valid)
    }
  },
  watch: {
    internalValue(newValue) {
      this.internalValue = newValue
    },
    valid(newValue) {
      this.$emit('update:valid', newValue)
    }
  }
})
</script>

<template>
  <div class="number-input">
    <span>{{ label }}</span>
    <input type="number" min="1" max="99" value="1" data-test="court-count-input"
           @input="updateValue($event)" />
    <circle-check style="color: limegreen" v-if="valid" />
    <circle-cross style="color: red" v-else />
  </div>
  <div style="color: red" v-if="!valid">Must be a number greater than 0</div>
</template>

<style scoped>
.number-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
