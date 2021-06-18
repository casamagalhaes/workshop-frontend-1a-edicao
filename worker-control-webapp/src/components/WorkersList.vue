<script>
import ConfirmationModal from './ConfirmationModal.vue'

export default {
  name: 'WorkersList',
  components: { ConfirmationModal },
  data() {
    return {
      columns: [
        { label: 'Código', name: 'id', width: 100 },
        { label: 'Nome', name: 'nome' },
        { label: 'Cargo', name: 'cargo' },
        { label: 'Cargo', name: 'cargo' },
        { label: 'Cargo', name: 'cargo' },
        { label: 'Administrador', name: 'admin', width: 150 },
        { label: '', name: 'actions', width: 90 },
      ],
      workers: [],
      pagination: {
        pageSize: 10,
        page: 1,
        totalItems: 0,
      },
      workerToRemove: {},
      showConfirmationModal: false,
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
        const { items, total } = await this.$service.get({
          path: 'funcionarios',
          start: (this.pagination.page - 1) * this.pagination.pageSize,
          limit: this.pagination.pageSize,
          sort: { prop: 'id', direction: 'asc' },
        })
        this.workers = items
        this.pagination.totalItems = total
      } catch (error) {
        console.error(error)
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
        await this.$service.remove({
          path: 'funcionarios',
          id: this.workerToRemove.id,
        })

        this.loadWorkers()
      } catch (error) {
        console.error(error)
      } finally {
        this.showConfirmationModal = false
      }
    },
    goToForm(id) {
      this.$router.push({ name: 'funcionarioForm', params: { id } })
    },
  },
}
</script>

<template>
  <section class="table-area">
    <ShrTable
      title="Lista de funcionários"
      grayscale
      :columns="columns"
      :data="workers"
      api-pagination
      action-button-text="Criar funcionário"
      action-button-icon="add"
      :current-page="pagination.page"
      :total-rows="pagination.totalItems"
      :rows-per-page="pagination.pageSize"
      @update:currentPage="changePage"
      @update:rowsPerPage="changePageSize"
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
      @cancel="resetConfirmationModal"
      @confirm="removeWorker"
    />
  </section>
</template>

<style lang="scss" scoped>
.table-area {
  height: 100%;

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
