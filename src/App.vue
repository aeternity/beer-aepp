<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic' :to="{name: 'buy-beer'}">🍺</ae-button>
      <ae-button type='dramatic' :to="{name: 'address'}">✉️</ae-button>
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
  mounted () {
    // Get URL params (account info)

    // this.account = this.$route.query

    // DEBUG async fetch
    // const blabla = this.fetchAsync('https://sdk-testnet.aepps.com/v2/top')
    //                     .then((value) => console.log(value))
    //                     .catch((error) => console.warn(error))

    console.info('Vue App mounted')
  }
}
</script>
