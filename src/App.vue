<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic'>🍺</ae-button>
      <span slot="mobile-left">mobile-left</span>
      <span slot="mobile-right">mobile-right</span>
    </ae-header>
    <BeerButton msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import BeerButton from './components/BeerButton.vue'
import AeternityClient from '@aeternity/aepp-sdk'
import { AeHeader, AeButton } from '@aeternity/aepp-components'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton,
    BeerButton
  },
  mounted: () => {
    const provider = new AeternityClient.providers.HttpProvider('sdk-testnet.aepps.com', 443, {secured: true})
    const client = new AeternityClient(provider)

    // TODO: const { pub, priv } = Crypto.generateKeyPair()
    // const privateKey = '<lets assume you extracted your private key which is store here as a hex>'

    console.log(client.base.getHeight().then((value) => console.log(value)));

    console.info('Vue App mounted');
  }
}
</script>
