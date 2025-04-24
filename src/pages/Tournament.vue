<script lang="ts">
import {defineComponent} from 'vue'
import {useTournamentStore} from "@/stores/tournament.ts";

export default defineComponent({
  name: "Tournament",
  data() {
    return {
      tournament: useTournamentStore()
    }
  },
  mounted() {
  }
})
</script>

<template>
  <div data-test="tournament-page" style="display: none;"/>
  <h1>Players:</h1>
  <pre>{{ tournament.players }}</pre>
  <h1>Court amounts:</h1>
  <pre>{{ tournament.court_count }}</pre>
</template>

<style scoped>

</style>
