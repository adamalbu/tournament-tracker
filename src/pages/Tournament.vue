<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Tournament",
  data() {
    return {
      players: [] as { name: string; points: number }[],
      court_amounts: 1,
    }
  },
  mounted() {
    // players and court amounts stored in local storage as JSON in a string
    this.players = JSON.parse(localStorage.getItem('players') || '[]')
    this.court_amounts = parseInt(localStorage.getItem('court_amounts') || '0')
  }
})
</script>

<template>
  <h1>Players:</h1>
  <pre>{{ players }}</pre>
  <h1>Court amounts:</h1>
  <pre>{{ court_amounts }}</pre>
</template>

<style scoped>

</style>
