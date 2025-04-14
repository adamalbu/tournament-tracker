import { defineStore } from 'pinia'

export const useTournamentStore = defineStore('tournament', {
  state: () => ({
    players: [] as {name: string, points: number} [],
    court_count: 0,
  }),
  persist: true,
})
