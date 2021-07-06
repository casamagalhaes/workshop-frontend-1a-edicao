import WorkersList from './WorkersList.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('src/components/WorkersList.vue', () => {
  let store

  beforeEach(() => {
    // Mock da store do Vuex com o getter utilizado no componente
    store = new Vuex.Store({
      getters: {
        filters: () => ({ nome: 'Leonardo' }),
      },
    })
  })

  it('WorkersList.vue - SHOULD be a valid component', () => {
    expect(WorkersList).toBeAValidComponent()
  })

  describe('Computeds', () => {
    it('computed totalPages - SHOULD return total pages', () => {
      const wrapper = shallowMount(WorkersList, {
        localVue,
        store,
        mocks: {
          $service: {
            get: () => ({}),
          },
        },
      })

      wrapper.setData({ pagination: { pageSize: 5, totalItems: 10 } })

      expect(wrapper.vm.totalPages).toEqual(2)
    })
  })

  describe('Fetching methods (load, pagination, etc)', () => {
    it('method loadWorkers - SHOULD load workers correctly and put value on data', async () => {
      // Mockando valor de retorno da request
      // Para este componente, como a request é feita sempre no mounted,
      // é importante mockar em todos os testes. Caso contrário,
      // o teste fará a request real e ocorrerá um erro.
      const getMock = jest.fn(() => ({
        items: [{ id: 1 }, { id: 2 }],
        total: 2,
      }))

      const store = new Vuex.Store({
        getters: {
          filters: () => ({ nome: 'Joãozinho' }),
        },
      })

      const wrapper = shallowMount(WorkersList, {
        localVue,
        store,
        mocks: {
          // Mockando plugin de consumo da API
          $service: {
            // Mockando especificamente metodo get (que é usado na função)
            get: getMock,
          },
        },
      })

      await wrapper.vm.loadWorkers()
      expect(wrapper.vm.workers).toEqual([{ id: 1 }, { id: 2 }])
      expect(wrapper.vm.pagination.totalItems).toEqual(2)
      expect(getMock).toHaveBeenCalled()

      expect(wrapper.vm.filters).toEqual({ nome: 'Joãozinho' })
    })
  })

  describe('Other methods', () => {
    it('goToForm - SHOULD navigate to route named funcionarioForm', () => {
      const pushMock = jest.fn()

      const wrapper = shallowMount(WorkersList, {
        localVue,
        store,
        mocks: {
          $service: {
            get: () => ({}),
          },
          $router: {
            push: pushMock,
          },
        },
      })

      wrapper.vm.goToForm(1)

      expect(pushMock).toHaveBeenCalled()
      expect(pushMock).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith({
        name: 'funcionarioForm',
        params: { id: 1 },
      })
    })
  })
})
