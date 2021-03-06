// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import RxFsm from '@/plugins/rx-fsm'

Vue.use(VueRx, Rx)
Vue.use(RxFsm)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
