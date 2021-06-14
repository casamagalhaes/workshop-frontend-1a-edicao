import actions from './actions'

describe('src/store/actions', () => {
  it('actions devem ser exportadas como objeto', () => {
    expect(typeof actions === 'object').toBe(true)
  })
})
