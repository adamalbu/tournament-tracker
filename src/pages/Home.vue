<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Tournament",
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
    if (!localStorage.getItem('players')) {
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
      <button id="load_tournament" @click="goToTournament">Load Last Tournament</button>
      <button @click="newTournament">New Tournament</button>
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
