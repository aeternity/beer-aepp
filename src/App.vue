<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic'>🍺</ae-button>
      <span slot="mobile-left">mobile-left</span>
      <span slot="mobile-right">mobile-right</span>
    </ae-header>
    <BeerButton :account="account"/>
  </div>
</template>

<script>
import BeerButton from './components/BeerButton.vue'
import { AeHeader, AeButton } from '@aeternity/aepp-components'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton,
    BeerButton
  },
  computed: {
    account () {
      // get query params
      return this.$route.query // k = private, p = public, n = name
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
  }
}
</script>
