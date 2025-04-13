import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import TournamentSetup from './pages/TournamentSetup.vue'
import NotFound from './pages/NotFound.vue'
import Tournament from "@/pages/Tournament.vue";

const routes = [
  { path: '/', component: Home, meta: {title: 'Tournament Tracker'} },
  { path: '/tournament-setup', component: TournamentSetup, meta: {title: 'Tournament Setup'} },
  { path: '/tournament', component: Tournament, meta: {title: 'Tournament'} },
  { path: '/:pathMatch(.*)*', component: NotFound}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
