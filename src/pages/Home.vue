<script lang="ts">
import {defineComponent} from 'vue'
import {useTournamentStore} from '@/stores/tournament.ts'

export default defineComponent({
  name: "Tournament",
  data() {
    return {
      tournament: useTournamentStore()
    }
  },
  methods: {
    newTournament() {
      this.$router.push('/tournament-setup')
    },
    goToTournament() {
      this.$router.push('/tournament')
    }
  },
  mounted() {
    const load_tournament_button = document.getElementById('load_tournament')
    if (this.tournament.court_count < 1) {
      load_tournament_button?.setAttribute('disabled', 'true')
    } else {
      load_tournament_button?.removeAttribute('disabled')
    }
  }
})

</script>

<template>
  <div id="app">
    <div id="buttons">
      <button id="load-tournament" data-test="load-tournament-button" @click="goToTournament">Load Last Tournament</button>
      <button data-test="new-tournament-button" @click="newTournament">New Tournament</button>
    </div>
  </div>
</template>

<style scoped>
#buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
}
</style>
