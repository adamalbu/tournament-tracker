<script lang="ts">
import {defineComponent} from 'vue';
import PlayerEdit from '@/components/PlayerEdit.vue';
import Plus from "@/components/icons/plus.vue";
import CircleCheck from "@/components/icons/circle-check.vue";
import CircleCross from "@/components/icons/circle-cross.vue";
import {useTournamentStore} from "@/stores/tournament.ts";

export default defineComponent({
  name: "Tournament",
  components: {CircleCross, CircleCheck, Plus, PlayerEdit},
  data() {
    return {
      tournament: useTournamentStore(),
      new_players: [] as { name: string; points: number }[],
      court_type: 'full' as 'full' | 'half',
      new_court_count: 1,
    };
  },
  computed: {
    validPlayerCount() {
      return this.new_players.length >= 2;
    },
    validCourtCount() {
      return this.new_court_count > 0;
    },
    isSubmitDisabled() {
      return !this.validPlayerCount || !this.validCourtCount;
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
      this.new_players.push({name: '', points: 0})
      // focus on last input
      this.$nextTick(() => {
        const inputs = document.querySelectorAll('input')
        if (inputs.length > 0) {
          inputs[inputs.length - 2].focus()
        }
      })
    },
    setCourtType(type: 'full' | 'half') {
      this.court_type = type
      const fullButton = document.getElementById('full')
      const halfButton = document.getElementById('half')
      if (type === 'full') {
        fullButton?.classList.remove('alternative')
        halfButton?.classList.add('alternative')
      } else {
        fullButton?.classList.add('alternative')
        halfButton?.classList.remove('alternative')
      }
    },
    updateCourtCount(event: Event) {
      this.new_court_count = parseInt((event.target as HTMLInputElement).value)
    },
    submitClicked() {
      this.tournament.players = this.new_players
      this.tournament.court_count = this.new_court_count

      this.$router.push('/tournament')
    }
  },
})
</script>

<template>
  <div id="players_add">
    <!--suppress JSUnusedLocalSymbols -->
    <PlayerEdit
      v-for="(player, index) in new_players"
      :index="index"
      v-model="new_players[index].name"
      @delete="new_players.splice(index, 1)"
      @keydown.enter="enterPressed"
    />
    <button class="alternative center" id="add" @click="addPlayerAndFocus">
      <Plus/>
      Add Player
    </button>
  </div>
  <span style="color: red" v-if="!validPlayerCount">Must have at least 2 players</span>
  <div id="court_type">
    Court type:
    <button @click="setCourtType('full')" id="full">Full</button>
    <button @click="setCourtType('half')" class="alternative" id="half">Half</button>
  </div>
  <div id="court_amounts">
    {{ court_type.charAt(0).toUpperCase() + court_type.slice(1) }} courts available:
    <input type="number" min="1" max="99" value="1" @input="updateCourtCount"/>
    <circle-check style="color: limegreen" v-if="validCourtCount"/>
    <circle-cross style="color: red" v-else/>
  </div>
  <span style="color: red" v-if="!validCourtCount">Must be a number greater than 0 <br/></span>
  <button id="submit" @click="submitClicked" :disabled="isSubmitDisabled">OK</button>
</template>

<style scoped>
#players_add {
  display: flex;
  flex-direction: column;
  width: 300px;
}

#full {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid var(--color-accent);
  border-right: none;
}

#half {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid var(--color-accent);
  border-left: none;
}

#court_amounts {
  display: flex;
  align-items: center;
  gap: 10px;
}

PlayerEdit {
  width: 100%;
}

#add {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
