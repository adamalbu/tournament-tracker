import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, test } from 'vitest'

import TournamentSetup from '@/pages/TournamentSetup.vue'
import PlayerEdit from '@/components/PlayerEdit.vue'
import { createPinia, setActivePinia } from 'pinia'

import { router } from '@/router.ts'

let pinia: ReturnType<typeof createPinia>
let wrapper: VueWrapper

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
  wrapper = mount(TournamentSetup, {
    global: {
      plugins: [pinia, router]
    }
  })
})

describe('TournamentSetup.vue', () => {

  it('adds a player when the add button is clicked', async () => {
    const addButton = wrapper.find('[data-test="add-player"]')
    const playersDiv = wrapper.find('[data-test="players-container"]')

    let initialLength = playersDiv.findAllComponents(PlayerEdit).length
    expect(playersDiv.findAllComponents(PlayerEdit)).toHaveLength(initialLength)
    await addButton.trigger('click')
    expect(playersDiv.findAllComponents(PlayerEdit)).toHaveLength(initialLength + 1)
  })

  it('removes a player when the remove button is clicked', async () => {
    let playerList = wrapper.find('[data-test="players-container"]')
    let players = playerList.findAllComponents(PlayerEdit)

    await players[0].find('[data-test="player-input"]').setValue('Alice')
    await wrapper.find('[data-test="add-player"]').trigger('click')

    players = playerList.findAllComponents(PlayerEdit)

    await players[1].find('[data-test="player-input"]').setValue('Bob')

    await players[0].find('[data-test="remove-player"]').trigger('click')

    players = playerList.findAllComponents(PlayerEdit)
    expect(players).toHaveLength(1)
    expect(players[0].find('[data-test="player-input"]').element.value).toBe('Bob')
  })

  it('does not allow the user to continue until there are at least two players', async () => {
    const submitButton = wrapper.find('[data-test="submit-button"]')
    const addButton = wrapper.find('[data-test="add-player"]')

    const playersList = wrapper.find('[data-test="players-container"]')
    let players = playersList.findAllComponents(PlayerEdit)


    expect(submitButton.exists()).toBe(true)

    expect(players).toHaveLength(1)
    expect(submitButton.attributes().disabled).toBeDefined()
    await addButton.trigger('click')
    players = playersList.findAllComponents(PlayerEdit)
    expect(players).toHaveLength(2)
    expect(submitButton.attributes().disabled).toBeUndefined()
  })

  it('does not allow the user to continue if the courts are not an integer or less than 1', async () => {
    const courtCount = wrapper.find('[data-test="court-count-input"]')
    const submitButton = wrapper.find('[data-test="submit-button"]')

    await courtCount.setValue('0')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('1.5')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('1')
    expect(submitButton.attributes().disabled).toBe('')
    await courtCount.setValue('2')
    expect(submitButton.attributes().disabled).toBe('')
    await courtCount.setValue('abc')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue(' ')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('-1')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('Infinity')
    expect(submitButton.attributes().disabled).toBeDefined()
    await courtCount.setValue('NaN')
    expect(submitButton.attributes().disabled).toBeDefined()
  })

  it('should route to tournament when submit button is clicked', async () => {
    const addButton = wrapper.find('[data-test="add-player"]')
    const courtCount = wrapper.find('[data-test="court-count-input"]')
    const submitButton = wrapper.find('[data-test="submit-button"]')
    const tournamentPageEmpty = wrapper.find('[data-test="tournament-page"]')

    await addButton.trigger('click')
    await addButton.trigger('click')

    await courtCount.setValue('2')
    expect(submitButton.attributes().disabled).toBeUndefined()

    await submitButton.trigger('click')
    await flushPromises()

    await router.isReady()
    expect(wrapper.vm.$route.path).toBe('/tournament')
  })

  it('has a court type that can be changed', async () => {
    let fullCourtButton = wrapper.find('[data-test="full-court-button"]')
    let halfCourtButton = wrapper.find('[data-test="half-court-button"]')

    await fullCourtButton.trigger('click')
    expect((wrapper.vm.$data as { court_type: string }).court_type).toBe('full')

    await halfCourtButton.trigger('click')
    expect((wrapper.vm.$data as { court_type: string }).court_type).toBe('half')
  })
})
