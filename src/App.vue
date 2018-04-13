<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic' :to="{name: 'buy-beer'}">🍺</ae-button>
      <ae-button type='dramatic' :to="{name: 'address'}">🔍</ae-button>
      <ae-button type='dramatic' :to="{name: 'send'}">✉️</ae-button>
      <!-- <span slot="mobile-left">mobile-left</span>
      <span slot="mobile-right">mobile-right</span> -->
    </ae-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { AeHeader, AeButton } from '@aeternity/aepp-components'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton
  },
  computed: {
  },
  methods: {
    async updateBalance () {
      const pubKey = this.$store.state.account.pub
      if (pubKey) {
        try {
          const balance = await this.$store.getters.clientInternal.accounts.getBalance(pubKey)
          this.$store.commit('setBalance', balance)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  mounted () {
    // Get URL params (account info)

    // this.account = this.$route.query

    // DEBUG async fetch
    // const blabla = this.fetchAsync('https://sdk-testnet.aepps.com/v2/top')
    //                     .then((value) => console.log(value))
    //                     .catch((error) => console.warn(error))

    console.info('Vue App mounted')

    this.updateBalance()
    setInterval(() => {
      console.log('interval')
      this.updateBalance()
    }, 10000)
  }
}
</script>
