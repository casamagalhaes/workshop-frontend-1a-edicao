import ConfirmationModal from './ConfirmationModal.vue'

describe('src/components/ConfirmationModal.vue', () => {
  it('ConfirmationModal.vue - SHOULD be a valid component', () => {
    expect(ConfirmationModal).toBeAValidComponent()
  })

  describe('Initialization', () => {
    // Teste que verifica se as props foram inicializadas com
    // valores default corretos. Garante segurança em caso
    // de mudança no valor default das props.
    it('SHOULD define default props', () => {
      const pushMock = jest.fn()
      // Método shallowMount monta o componente e está registrado globalmente no setup.js
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
