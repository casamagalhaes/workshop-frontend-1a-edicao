import getters from './getters'

describe('src/store/getters', () => {
  it('getters devem ser exportados como objeto', () => {
    expect(typeof getters === 'object').toBe(true)
  })
})
