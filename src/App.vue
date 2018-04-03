<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic'>🍺</ae-button>
      <span slot="mobile-left">mobile-left</span>
      <span slot="mobile-right">mobile-right</span>
    </ae-header>
    <BeerButton :account="account"/>
    <ae-button type='dramatic' @click="showReceiveTokens = !showReceiveTokens">Receive Tokens</ae-button>
    <qrcode v-if="showReceiveTokens" :value="pubKey" :options="{ size: 200 }"></qrcode>
    <ae-button type='dramatic' @click="showSendTokens = !showSendTokens">Send Tokens</ae-button>
    <SendTokens v-if="showSendTokens" />

  </div>
</template>

<script>
import BeerButton from './components/BeerButton.vue'
import AeternityClient from '@aeternity/aepp-sdk'
import { AeHeader, AeButton } from '@aeternity/aepp-components'
import SendTokens from './components/SendTokens.vue'
import VueQrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton,
    BeerButton,
    SendTokens,
    qrcode: VueQrcode
  },
  data () {
    return {
      showSendTokens: false,
      showReceiveTokens: false
    }
  },
  computed: {
    account () {
      //get query params
      return this.$route.query // k = private, p = public, n = name
    },
    pubKey () {
      return this.account && this.account.p ? this.account.p : ''
    }
  },
  mounted () {
    // DEBUG SDK-JS
    // const provider = new AeternityClient.providers.HttpProvider('sdk-testnet.aepps.com', 443, {secured: true})
    // const client = new AeternityClient(provider)
    // console.log(client.base.getHeight().then((value) => console.log(value)));

    // Get URL params (account info)

    // this.account = this.$route.query;


    // DEBUG async fetch
    // const blabla = this.fetchAsync('https://sdk-testnet.aepps.com/v2/top')
    //                     .then((value) => console.log(value))
    //                     .catch((error) => console.warn(error))



    console.info('Vue App mounted');
  },
  methods: {
    async fetchAsync (url) {
      const response = await fetch(url);
      return response.json();
    }
  }

}
</script>
