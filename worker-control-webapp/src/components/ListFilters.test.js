import ListFilters from './ListFilters.vue'
import Vuex from 'vuex'

// Indicando ao Jest que deve utilizar timers fake para que possam ser executados
// ao chamar método jest.runAllTimers
jest.useFakeTimers()

// Criando instância local do Vue com Vuex
const localVue = createLocalVue()
localVue.use(Vuex)

describe('src/components/ListFilters.vue', () => {
  const saveFilterValuesMock = jest.fn()
  let store

  beforeEach(() => {
    // Mock da store do Vuex com o getter e ação utilizados no componente
    store = new Vuex.Store({
      getters: {
        filters: () => ({ nome: 'Store test' }),
      },
      actions: {
        saveFilterValues: saveFilterValuesMock,
      },
    })
  })

  it('ListFilters.vue - SHOULD be a valid component', () => {
    expect(ListFilters).toBeAValidComponent()
  })

  describe('watchers', () => {
    it('watcher filters - SHOULD initialize filter values', () => {
      const wrapper = shallowMount(ListFilters, {
        localVue,
        store,
      })

      // Testando valor inicial, já que o watcher tem uma flag immediate: true
      expect(wrapper.vm.filterValues).toEqual({ nome: 'Store test' })

      // Chamando manualmente a função handler do watcher para observar lógica
      wrapper.vm.$options.watch.filters.handler.call(wrapper.vm, {
        nome: 'Watcher test',
      })

      // Verificando valor após chamada manual
      expect(wrapper.vm.filterValues).toEqual({ nome: 'Watcher test' })
    })
  })

  describe('Search methods', () => {
    it('method onTypeOnSearch - SHOULD define filter value on data and call emitValue after 500ms', () => {
      const wrapper = shallowMount(ListFilters, {
        localVue,
        store,
      })

      // Mockando função que será chamada dentro desta,
      // já que o interesse é apenas nesta função onTypeOnSearch
      const emitValueMock = jest.fn()
      wrapper.vm.emitValue = emitValueMock

      wrapper.vm.onTypeOnSearch('Leonardo', 'nome')
      expect(wrapper.vm.filterValues.nome).toEqual('Leonardo')

      // Rodando os timers de 500ms
      jest.runAllTimers()

      // Verificando se função mockada foi chamada,
      // a lógica dela será testada no teste seguinte.
      expect(wrapper.vm.emitValue).toHaveBeenCalled()
      expect(emitValueMock).toHaveBeenCalledWith('Leonardo', 'nome')
    })

    it('method emitValue - should NOT emit value if value passed as argument is NOT EQUAL to equivalent data value', () => {
      const wrapper = shallowMount(ListFilters, {
        localVue,
        store,
      })

      // Definindo manualmente valor no data
      wrapper.setData({ filterValues: { nome: 'João da Silva' } })

      wrapper.vm.emitValue('Leonardo', 'nome')

      // Prefixo not indicando negação da assertiva
      expect(saveFilterValuesMock).not.toHaveBeenCalled()
    })

    it('method emitValue - SHOULD emit value if value passed as argument is EQUAL to equivalent data value', () => {
      const wrapper = shallowMount(ListFilters, {
        localVue,
        store,
      })

      // Definindo manualmente valor no data
      wrapper.setData({ filterValues: { nome: 'João da Silva' } })

      wrapper.vm.emitValue('João da Silva', 'nome')

      expect(saveFilterValuesMock).toHaveBeenCalled()

      // Verificando emissão de evento e seu valor
      expect(wrapper.emitted('filter')).toBeTruthy()
      expect(wrapper.emitted('filter')).toEqual([[{ nome: 'João da Silva' }]])
    })
  })
})
