import Header from './Header.vue'

describe('src/components/Header.vue', () => {
  it('Header.vue - SHOULD be a valid component', () => {
    expect(Header).toBeAValidComponent()
  })

  describe('Common methods', () => {
    // Teste com mock da instância do $router através do objeto mocks
    // https://vue-test-utils.vuejs.org/api/options.html#mocks
    it('SHOULD define default props', () => {
      // Função mockada que será usada no mock do método push do router
      const pushMock = jest.fn()

      const wrapper = shallowMount(Header, {
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      })

      wrapper.vm.goToHomePage()
      expect(pushMock).toHaveBeenCalled()
      expect(pushMock).toHaveBeenCalledWith({ name: 'Home' })
    })
  })
})
