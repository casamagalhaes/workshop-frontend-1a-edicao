import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Shuri from '@casamagalhaes/shuri'

Vue.use(Shuri)
Vue.config.productionTip = false

global.shallowMount = shallowMount
