<script lang="ts">
import { defineComponent } from 'vue'
import PlayerEdit from '@/components/PlayerEdit.vue'
import Plus from '@/components/icons/plus.vue'
import CircleCheck from '@/components/icons/circle-check.vue'
import CircleCross from '@/components/icons/circle-cross.vue'
import { useTournamentStore } from '@/stores/tournament.ts'
import ButtonGroup from '@/components/ButtonGroup.vue'
import NumberInput from '@/components/NumberInput.vue'

export default defineComponent({
  name: 'TournamentSetup',
  components: { NumberInput, ButtonGroup, CircleCross, CircleCheck, Plus, PlayerEdit },
  data() {
    return {
      tournament: useTournamentStore(),
      new_players: [{ name: '', points: 0 }] as { name: string; points: number }[],
      court_type: 'full' as 'full' | 'half',
      match_format: 'traditional' as 'traditional' | 'tiebreak',
      tiebreak_points: 7,
      new_court_count: 1,

      validCourtCount: true,
    }
  },
  computed: {
    validPlayerCount() {
      return this.new_players.length >= 2
    },
    isSubmitDisabled() {
      return !this.validPlayerCount || !this.validCourtCount
    }
  },
  methods: {
    enterPressed() {
      const focusedElement = document.activeElement as HTMLInputElement
      if (focusedElement.tagName === 'INPUT' && focusedElement.type === 'text') {
        this.addPlayerAndFocus()
      }
    },
    addPlayerAndFocus() {
      this.new_players.push({ name: '', points: 0 })
      // focus on last input
      this.$nextTick(() => {
        const inputs = document.querySelectorAll('input')
        if (inputs.length > 0) {
          inputs[inputs.length - 2].focus()
        }
      })
    },
    updateTiebreakPoints(event: Event) {
      this.tiebreak_points = parseInt((event.target as HTMLInputElement).value)
    },
    submitClicked() {
      this.tournament.players = this.new_players
      this.tournament.court_count = this.new_court_count

      this.$router.push('/tournament')
    }
  }
})
</script>

<template>
  <div id="players-container" data-test="players-container">
    <!--suppress JSUnusedLocalSymbols -->
    <PlayerEdit
      v-for="(player, index) in new_players"
      :key="index"
      :index="index"
      v-model="new_players[index].name"
      @delete="new_players.splice(index, 1)"
      @keydown.enter="enterPressed"
    />
    <button class="alternative center" id="add-button" data-test="add-player"
            @click="addPlayerAndFocus">
      <Plus />
      Add Player
    </button>
  </div>
  <span style="color: red" v-if="!validPlayerCount">Must have at least 2 players</span>
  <ButtonGroup
    :options="['full', 'half']"
    :selectedOption="court_type"
    label="Court type: "
    @update:selectedOption="court_type = $event"
  />
  <NumberInput :min="1" :max="99" :value="new_court_count" @update:value="new_court_count = $event  "
               :label="`${court_type.charAt(0).toUpperCase() + court_type.slice(1)} courts available: `" />
  <div style="color: red" v-if="!validCourtCount">Must be a number greater than 0</div>
  <ButtonGroup :selected-option="match_format" label="Match format: "
               :options="['traditional', 'tiebreak']"
               @update:selectedOption="match_format = $event" data-test="match-format" />
  <div id="tiebreak-points" v-if="match_format === 'tiebreak'">
    Tiebreak up to:
    <input type="number" min="1" max="99" :value="tiebreak_points" @input="updateTiebreakPoints" />
    <circle-check style="color: limegreen" v-if="tiebreak_points > 0" />
    <circle-cross style="color: red" v-else />
  </div>
  <button id="submit" data-test="submit-button" @click="submitClicked" :disabled="isSubmitDisabled">
    OK
  </button>
</template>

<style scoped>
#players-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

PlayerEdit {
  width: 100%;
}

#add-button {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
