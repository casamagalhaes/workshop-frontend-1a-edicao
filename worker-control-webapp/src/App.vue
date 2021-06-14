<script>
import Layout from './Layout'
import Header from './components/Header'
export default {
  components: {
    Header,
    Layout,
  },
}
</script>

<template>
  <div id="app">
    <Header />
    <Layout />
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  box-sizing: border-box;
  font-family: 'Noto Sans', 'sans-serif';
}

* {
  box-sizing: border-box;
  scrollbar-width: thin;
}
</style>
