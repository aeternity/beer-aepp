import './custom.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueSocketio, store.state.websocketUrl, store)

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
  sockets: {
    connect () {
      console.log('socket connected')
      // set the initial bar state after connecting
      this.$socket.emit('get_bar_state', (barState) => {
        console.log('get_bar_state', barState)
        store.commit('setBarState', barState)
      })
    }
  },
  router: getRouter(store),
  store,
  render: h => h(App),
  mounted () {
  }
}).$mount('#app')
