import actions from './actions'

describe('src/store/actions', () => {
  it('actions devem ser exportadas como objeto', () => {
    expect(typeof actions === 'object').toBe(true)
  })

  it('saveFilterValues', () => {
    const commitMock = jest.fn()
    const filters = { teste: 'teste' }
    actions.saveFilterValues({ commit: commitMock }, filters)

    expect(commitMock).toHaveBeenCalled()
    expect(commitMock).toHaveBeenCalledWith('SET_FILTERS_VALUE', filters)
  })
})
