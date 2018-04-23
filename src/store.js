import Vuex from 'vuex'
import Vue from 'vue'
import { AeternityClient } from '@aeternity/aepp-sdk'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    account: {
      pub: null,
      priv: null,
      name: null
    },
    balance: 0,
    beerHashes: [],
    beerPrice: 1000,
    barPubKey: 'ak$3TRJBCvcvaegewQkexWVQkt7bEFf1tCvhvj6jfErZQNWyJ4NoyxUwkGrVVWDefxPpPEiY534fTutPaURn72HrGKCYaNWPM',
    beerAvailable: false
  },
  getters: {
    lastBeerHash (state) {
      if (state.beerHashes.length <= 0) {
        return null
      }
      return state.beerHashes[0]
    },
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
    },
    beerApi (state, getters) {
      // TODO: implement the API
      return {
        async getBeerState (txHash) {
          // simulate beer was picked up after 20 blocks
          const currentBlock = await getters.client.base.getHeight()
          const tx = await getters.client.tx.getTransaction(txHash)
          if (currentBlock > tx.block_height + 20) {
            return 1
          } else {
            return 0
          }
        },
        async isBeerLeft () {
          console.log('calling isBeerLeft API')
          return true
        }
      }
    }
  },
  mutations: {
    setAccount (state, {pub, priv, name}) {
      state.account.pub = pub
      state.account.priv = priv
      state.account.name = name
      // eslint-disable-next-line no-undef
      localStorage.setItem('account', JSON.stringify(state.account))
    },
    setBalance (state, newBalance) {
      state.balance = newBalance
    },
    addBeerHash (state, beerHash) {
      state.beerHashes.unshift(beerHash)
      // eslint-disable-next-line no-undef
      localStorage.setItem('beerHashes', JSON.stringify(state.beerHashes))
    },
    setBeerHashes (state, beerHashes) {
      state.beerHashes = beerHashes
    },
    setBeerAvailable (state, beerAvailable) {
      state.beerAvailable = beerAvailable
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
    },
    async checkBeerAvailable ({getters, commit}) {
      try {
        const beerAvailable = await getters.beerApi.isBeerLeft()
        commit('setBeerAvailable', beerAvailable)
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default store
