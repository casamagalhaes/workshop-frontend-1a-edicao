<script>
import Form from '@/components/Form'
export default {
  name: 'FuncionarioForm',
  components: { Form },
  data() {
    return {
      worker: {},
      loading: false,
    }
  },
  computed: {
    isEdition() {
      return !!this.$route.params.id
    },
  },
  mounted() {
    if (this.isEdition) this.loadWorker()
  },
  methods: {
    async loadWorker() {
      this.worker = await this.$service.getById({
        path: 'funcionarios',
        id: this.$route.params.id,
      })
    },
    async saveWorker(data) {
      try {
        let method = 'update'
        if (!this.isEdition) {
          method = 'create'
          delete data.id
        }

        await this.$service[method]({
          path: 'funcionarios',
          data,
          id: data.id,
        })

        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="funcionario-form">
    <Form :data="worker" @save="saveWorker" :loading="loading" />
  </div>
</template>

<style lang="scss" scoped>
.funcionario-form {
  height: 100%;
  width: 100%;
}
</style>
