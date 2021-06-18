<script>
import Form from '@/components/Form'
export default {
  name: 'FuncionarioForm',
  components: { Form },
  data() {
    return {
      worker: {},
    }
  },
  mounted() {
    if (this.$route.params.id) this.loadWorker()
  },
  methods: {
    async loadWorker() {
      this.worker = await this.$service.getById({
        path: 'funcionarios',
        id: this.$route.params.id,
      })
    },
  },
}
</script>

<template>
  <div class="about">
    <Form :data="worker" />
  </div>
</template>

<style lang="scss" scoped>
.about {
  height: 100%;
}
</style>
