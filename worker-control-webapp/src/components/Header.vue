<script>
export default {
  name: 'Header',
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<template>
  <ShrToolbar class="shr-color-brand-primary header">
    <h1 @click="goToHomePage">Controle de usuários</h1>
  </ShrToolbar>
</template>

<style lang="scss" scoped>
.header {
  color: white;
}
</style>
