import mutations from './mutations'

describe('src/store/mutations', () => {
  it('mutations devem ser exportadas como objeto', () => {
    expect(typeof mutations === 'object').toBe(true)
  })
})
