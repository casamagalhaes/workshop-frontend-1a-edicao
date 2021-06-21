<script>
import ConfirmationModal from './ConfirmationModal.vue'
import ListFilters from './ListFilters.vue'

export default {
  name: 'WorkersList',
  components: { ConfirmationModal, ListFilters },
  data() {
    return {
      columns: [
        { label: 'Código', name: 'id', width: 100, sortable: true },
        { label: 'Nome', name: 'nome', sortable: true, minWidth: 100 },
        { label: 'Setor', name: 'setor' },
        { label: 'Cargo', name: 'cargo' },
        { label: 'Saldo de horas', name: 'saldo_horas', sortable: true },
        { label: 'Administrador', name: 'admin', width: 150 },
        { label: '', name: 'actions', width: 90 },
      ],
      workers: [],
      pagination: {
        pageSize: 10,
        page: 1,
        totalItems: 0,
        sort: { prop: 'id', direction: 'asc' },
      },
      workerToRemove: {},
      showConfirmationModal: false,
      loading: false,
      filterValues: {},
    }
  },
  computed: {
    totalPages() {
      const { totalItems, pageSize } = this.pagination

      return Math.ceil(totalItems / pageSize)
    },
  },
  mounted() {
    this.loadWorkers()
  },
  methods: {
    async loadWorkers() {
      try {
        this.loading = true
        const { items, total } = await this.$service.get({
          path: 'funcionarios',
          start: (this.pagination.page - 1) * this.pagination.pageSize,
          limit: this.pagination.pageSize,
          sort: this.pagination.sort,
          q: this.filterValues,
        })
        this.workers = items
        this.pagination.totalItems = total
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    changePage(page) {
      this.pagination.page = page
      this.loadWorkers()
    },
    changePageSize(size) {
      this.pagination.pageSize = size
      if (this.pagination.page > this.totalPages)
        this.pagination.page = this.totalPages
      this.loadWorkers()
    },
    async updateWorkerAdmin(value, worker) {
      try {
        await this.$service.partialUpdate({
          path: 'funcionarios',
          id: worker.id,
          data: { admin: value },
        })

        this.loadWorkers()
      } catch (error) {
        console.error(error)
      }
    },
    showRemoveConfirmationModal(row) {
      this.workerToRemove = row
      this.showConfirmationModal = true
    },
    resetConfirmationModal() {
      this.workerToRemove = {}
      this.showConfirmationModal = false
    },
    async removeWorker() {
      try {
        this.loading = true
        await this.$service.remove({
          path: 'funcionarios',
          id: this.workerToRemove.id,
        })

        this.loadWorkers()
      } catch (error) {
        console.error(error)
      } finally {
        this.showConfirmationModal = false
        this.loading = false
      }
    },
    goToForm(id) {
      this.$router.push({ name: 'funcionarioForm', params: { id } })
    },
    doFilter(payload) {
      this.filterValues = payload
      this.pagination.page = 1
      this.loadWorkers()
    },
    changeOrdering({ sort, sortBy }) {
      this.pagination.sort = { prop: sortBy, direction: sort }
      this.loadWorkers()
    },
  },
}
</script>

<template>
  <section class="table-area">
    <ListFilters class="table-area__filters" @filter="doFilter" />
    <ShrTable
      title="Lista de funcionários"
      grayscale
      :columns="columns"
      :data="workers"
      api-pagination
      action-button-text="Criar funcionário"
      action-button-icon="add"
      :loading="loading"
      :current-page="pagination.page"
      :total-rows="pagination.totalItems"
      :rows-per-page="pagination.pageSize"
      @update:currentPage="changePage"
      @update:rowsPerPage="changePageSize"
      @update:sortProps="changeOrdering"
      @action-button-click="goToForm"
    >
      <template v-slot:table-cell-admin="{ row }">
        <div @click.stop>
          <ShrSwitch
            :value="row.admin"
            @change="updateWorkerAdmin($event, row)"
          />
        </div>
      </template>

      <template v-slot:table-cell-actions="{ row }">
        <div class="table-area__actions">
          <span
            title="Excluir funcionário"
            @click.stop="showRemoveConfirmationModal(row)"
          >
            <ShrIcon name="delete" class="table-area__icons" />
          </span>
          <span title="Editar funcionário" @click.stop="goToForm(row.id)">
            <ShrIcon name="pencil" class="table-area__icons" />
          </span>
        </div>
      </template>
    </ShrTable>

    <ConfirmationModal
      :show-modal="showConfirmationModal"
      :loading="loading"
      @cancel="resetConfirmationModal"
      @confirm="removeWorker"
    />
  </section>
</template>

<style lang="scss" scoped>
.table-area {
  height: calc(100% - 60px);

  &__filters {
    padding-bottom: 15px;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: background-color;
    border-radius: 100%;
    width: 28px;
    height: 28px;
    color: var(--shr-color-grayscale-text);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--shr-color-grayscale-details);
      transition: background-color 0.2s ease;
    }
  }
}
</style>
