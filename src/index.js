import './custom.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'
import Ae from '@aeternity/aepp-sdk/es/ae/universal'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueSocketio, store.state.websocketUrl, store)

async function initAe (store) {
  store.commit(
    "setAe",
    await Ae({
      url: "https://sdk-testnet.aepps.com",
      internalUrl: "https://sdk-testnet.aepps.com",
      networkId: "aet_ua" // or any other networkId your client should connect to
      // accounts: [
      //   MemoryAccount({ keypair: { secretKey: 'A_PRIV_KEY', publicKey: 'A_PUB_ADDRESS' } })
      // ],
    })
  )
}

function initVue (store) {
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
        console.log('asking bar state')
        this.$socket.emit('get_bar_state', (barState) => {
          console.log('get_bar_state', barState)
          if (barState && barState.state) {
            store.commit('setBarState', barState.state)
          }
        })
      }
    },
    router: getRouter(store),
    store,
    render: h => h(App),
    mounted () {
    }
  }).$mount('#app')
}

initAe(store)
  .then(v => {
    initVue(store)
  })
  .catch(e => console.error())
