import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'

import App from '@/App.vue'
import { router } from '@/router.ts'

let pinia: ReturnType<typeof createPinia>
let wrapper: VueWrapper

beforeEach(async () => {
  pinia = createPinia()
  setActivePinia(pinia)

  await router.push('/')
  await router.isReady()

  wrapper = mount(App, {
    global: {
      plugins: [pinia, router]
    }
  })
})

describe('Home.vue', () => {
  it('has a new tournament and a load last tournament button', () => {
    const newTournamentButton = wrapper.find('[data-test="new-tournament-button"]')
    const loadLastTournamentButton = wrapper.find('[data-test="load-tournament-button"]')
    expect(newTournamentButton.exists()).toBe(true)
    expect(loadLastTournamentButton.exists()).toBe(true)
  })

  it('has a new tournament button that works', async () => {
    const newTournamentButton = wrapper.find('[data-test="new-tournament-button"]')

    expect(newTournamentButton.exists()).toBe(true)
    await newTournamentButton.trigger('click')
    await flushPromises()

    expect(wrapper.vm.$route.path).toBe('/tournament-setup')
    const addPlayerButton = wrapper.find('[data-test="add-player"]')
    expect(addPlayerButton.exists()).toBe(true)
  })

  it('has a load last tournament button that works', async () => {
    const loadLastTournamentButton = wrapper.find('[data-test="load-tournament-button"]')

    expect(loadLastTournamentButton.exists()).toBe(true)
    await loadLastTournamentButton.trigger('click')
    await flushPromises()

    expect(wrapper.vm.$route.path).toBe('/tournament')
    const tournamentPageEmpty = wrapper.find('[data-test="tournament-page"]')
    expect(tournamentPageEmpty.exists()).toBe(true)
  })

  it('has a navbar with a home button that works', async () => {
    await router.push('/tournament')
    let tournamentPageEmpty = wrapper.find('[data-test="tournament-page"]')
    expect(tournamentPageEmpty.exists()).toBe(true)

    const homeButton = wrapper.find('[data-test="home-button"]')
    expect(homeButton.exists()).toBe(true)
    await homeButton.trigger('click')
    await flushPromises()
    expect(wrapper.vm.$route.path).toBe('/')

    tournamentPageEmpty = wrapper.find('[data-test="tournament-page"]')
    expect(tournamentPageEmpty.exists()).toBe(false)

    const newTournamentButton = wrapper.find('[data-test="new-tournament-button"]')
    expect(newTournamentButton.exists()).toBe(true)
  })
})
