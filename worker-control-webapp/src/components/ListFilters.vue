<script>
export default {
  name: 'ListFilters',
  data() {
    return {
      filterValues: {},
    }
  },
  methods: {
    onTypeOnSearch(value, prop) {
      this.filterValues[prop] = value

      setTimeout(() => this.emitValue(value, prop), 500)
    },
    emitValue(value, prop) {
      if (value !== this.filterValues[prop]) return

      if (!this.filterValues.id) delete this.filterValues.id
      this.$emit('filter', this.filterValues)
    },
  },
}
</script>

<template>
  <section class="filters">
    <ShrInput label="Código" size="xg" @input="onTypeOnSearch($event, 'id')" />
    <ShrInput label="Nome" size="xg" @input="onTypeOnSearch($event, 'nome')" />
  </section>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 1rem;
  max-width: 500px;
}
</style>
