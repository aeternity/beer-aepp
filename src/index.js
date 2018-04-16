import './custom.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import getRouter from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(AsyncComputed)
Vue.use(VeeValidate)

// set localStorage account BEFORE creating router
try {
  // eslint-disable-next-line no-undef
  let account = JSON.parse(localStorage.getItem('account'))
  if (account) {
    store.commit('setAccount', account)
  }

  // eslint-disable-next-line no-undef
  let beerHashes = JSON.parse(localStorage.getItem('beerHashes'))
  if (beerHashes) {
    store.commit('setBeerHashes', beerHashes)
  }
} catch (e) {
  console.log(e)
}

console.info('about to render Vue App')
new Vue({
  router: getRouter(store),
  store,
  render: h => h(App),
  mounted () {
  }
}).$mount('#app')
