<script lang="ts">
import { defineComponent } from 'vue'
import Trash from "@/components/icons/trash.vue"

export default defineComponent({
  name: "PlayerEdit",
  components: { Trash },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      model_value: this.modelValue,
    }
  },
  watch: {
    modelValue(newValue) {
      this.model_value = newValue
    },
  },
  methods: {
    updateValue(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('update:modelValue', input.value)
    },
    deletePlayer() {
      this.$emit('delete')
    },
  },
})
</script>

<template>
  <div class="player_edit">
    <input
      :value="model_value"
      @input="updateValue($event)"
      :placeholder="`Player ${index + 1}`"
    />
    <button class="center" @click="deletePlayer" id="delete"><Trash /></button>
  </div>
</template>

<style scoped>
.player_edit {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  width: 100%;
}

#delete {
  width: 34px;
  height: 34px;
  background-color: #ff4040;

}

#delete:hover {
  background-color: #ff7373;
}

</style>
