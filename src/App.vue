<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'buy-beer'}">🍺</ae-button>
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'address'}">🔍</ae-button>
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'send'}">✉️</ae-button>
      <div slot="mobile-left">
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'buy-beer'}">🍺</ae-button>
      </div>
      <div slot="mobile-right">
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'address'}">🔍</ae-button>
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'send'}">✉️</ae-button>
      </div>
    </ae-header>
    <div class="content">
      <router-view></router-view>
    </div>
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
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {
    // Get URL params (account info)

    // this.account = this.$route.query

    // DEBUG async fetch
    // const blabla = this.fetchAsync('https://sdk-testnet.aepps.com/v2/top')
    //                     .then((value) => console.log(value))
    //                     .catch((error) => console.warn(error))

    console.info('Vue App mounted')

    this.$store.dispatch('updateBalance')
    setInterval(() => {
      this.$store.dispatch('updateBalance')
    }, 10000)
  }
}
</script>

<style scoped lang="scss">
  .content {
    text-align: center;
    max-width: 800px;
    margin: auto;
  }
</style>
