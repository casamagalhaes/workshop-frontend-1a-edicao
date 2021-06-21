import Header from './Header.vue'

describe('src/components/Header.vue', () => {
  it('Header.vue - SHOULD be a valid component', () => {
    expect(Header).toBeAValidComponent()
  })

  describe('Common methods', () => {
    it('SHOULD define default props', () => {
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
