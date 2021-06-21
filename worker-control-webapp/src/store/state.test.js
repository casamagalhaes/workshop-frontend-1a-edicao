import state from './state'

describe('src/store/state', () => {
  it('state deve ser exportado como objeto', () => {
    expect(typeof state === 'object').toBe(true)
  })

  it('inicialização do state - deve exportar um objeto com a propriedade filters', () => {
    expect(state).toStrictEqual({ filters: {} })
  })
})
