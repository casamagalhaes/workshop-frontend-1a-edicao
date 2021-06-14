import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'typeface-noto-sans'
import Shuri from '@casamagalhaes/shuri'
import '@casamagalhaes/shuri/dist/shuri.css'
import Service from './plugins/Service'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(Service)
Vue.use(Shuri, {
  theme: 'blue',
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
