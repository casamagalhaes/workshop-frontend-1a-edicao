<script>
import WorkersList from '@/components/WorkersList'

export default {
  name: 'Home',
  components: {
    WorkersList,
  },
  data() {
    return {
      allWorkers: [],
      oneWorker: {},
      workerWithHours: [],
    }
  },
  // async mounted() {
  //   const workerWithHours = await this.$service.get({
  //     path: 'funcionarios',
  //     start: 0,
  //     limit: 10,
  //     q: {
  //       saldo_horas: 10,
  //     },
  //   })
  //   this.workerWithHours = workerWithHours.items

  //   const allWorkers = await this.$service.get({
  //     path: 'funcionarios',
  //     start: 0,
  //     limit: 10,
  //     sort: { prop: 'nome', direction: 'desc' },
  //   })
  //   this.allWorkers = allWorkers.items

  //   const oneWorker = await this.$service.getById({
  //     path: 'funcionarios',
  //     id: 10,
  //   })
  //   this.oneWorker = oneWorker
  // },
}
</script>

<template>
  <div class="home">
    <WorkersList />
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  padding: 20px;
}
</style>
