import './custom.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import App from './App.vue'
import getRouter from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(AsyncComputed)

console.info('about to render Vue App')
new Vue({
  router: getRouter(store),
  store,
  render: h => h(App),
  beforeCreate () {
    try {
      // eslint-disable-next-line no-undef
      let account = JSON.parse(localStorage.getItem('account'))
      if (account) {
        console.log('stored account', account)
        store.commit('setAccount', account)
      }
    } catch (e) {
      console.log(e)
    }
  }
}).$mount('#app')
