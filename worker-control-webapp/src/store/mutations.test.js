import mutations from './mutations'

describe('src/store/mutations', () => {
  it('mutations devem ser exportadas como objeto', () => {
    expect(typeof mutations === 'object').toBe(true)
  })

  it('mutation SET_FILTERS_VALUE - DEVE alterar o state com o valor passado', () => {
    const state = {
      filters: {},
    }

    const valorFiltro = { nome: 'Pedro', id: 1 }

    mutations.SET_FILTERS_VALUE(state, valorFiltro)

    expect(state.filters).toEqual(valorFiltro)
  })
})
