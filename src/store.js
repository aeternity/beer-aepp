import Vuex from 'vuex'
import Vue from 'vue'
import { AeternityClient } from '@aeternity/aepp-sdk'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    account: {
      pub: null,
      priv: null,
      domain: null,
      name: null
    },
    balance: 0
  },
  getters: {
    client () {
      const provider = new AeternityClient.providers.HttpProvider(
        'republica.aepps.com',
        443,
        { secured: true, internal: false }
      )
      return new AeternityClient(provider)
    },
    clientInternal () {
      const provider = new AeternityClient.providers.HttpProvider(
        'republica.aepps.com',
        443,
        { secured: true, internal: true }
      )
      return new AeternityClient(provider)
    }
  },
  mutations: {
    setAccount (state, {pub, priv, name, domain}) {
      state.account.pub = pub
      state.account.priv = priv
      state.account.name = name
      state.account.domain = domain
      // eslint-disable-next-line no-undef
      localStorage.setItem('account', JSON.stringify(state.account))
    },
    setBalance (state, newBalance) {
      state.balance = newBalance
    }
  },
  actions: {
    async updateBalance ({ commit, state, getters }) {
      const pubKey = state.account.pub
      if (pubKey) {
        try {
          const balance = await getters.clientInternal.accounts.getBalance(pubKey)
          commit('setBalance', balance)
          return balance
        } catch (err) {
          console.log(err)
        }
      }
      return 0
    }
  }
})

export default store
