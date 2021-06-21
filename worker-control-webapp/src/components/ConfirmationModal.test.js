import ConfirmationModal from './ConfirmationModal.vue'

describe('src/components/ConfirmationModal.vue', () => {
  it('ConfirmationModal.vue - SHOULD be a valid component', () => {
    expect(ConfirmationModal).toBeAValidComponent()
  })

  describe('Initialization', () => {
    it('SHOULD define default props', () => {
      const pushMock = jest.fn()
      const wrapper = shallowMount(ConfirmationModal)

      expect(wrapper.vm.mainText).toEqual(
        'Tem certeza que deseja confirmar essa exclusão?'
      )
      expect(wrapper.vm.subtitle).toEqual('Esta ação é irreversível.')
      expect(wrapper.vm.showModal).toBe(false)
      expect(wrapper.vm.loading).toBe(false)
    })
  })
})
