<script>
import WorkersList from '@/components/WorkersList'

export default {
  name: 'Home',
  components: {
    WorkersList,
  },
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
}
</style>
