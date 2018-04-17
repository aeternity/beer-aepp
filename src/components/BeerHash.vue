<template>
  <div class="beerHash">
    <div class="noBeerLeft" v-if="!beerAvailable">
      Sorry there currently is no Beer left at the bar
    </div>
    <div>
      Show this to the bartender to collect your beer!
    </div>
    <div>
      <vue-qrcode :value="fullInfo" :options="{ size: 300 }"></vue-qrcode>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'
// const { AeternityClient, Crypto } = require('@aeternity/aepp-sdk')
import { Crypto } from '@aeternity/aepp-sdk'

export default {
  name: 'BeerHash',
  components: {
    VueQrcode
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    fullInfo () {
      const info = {
        tx: this.beerHash,
        sig: this.beerHashSignature
      }
      return JSON.stringify(info)
    },
    beerHash () {
      return this.$route.params.beerHash
    },
    beerHashSignature () {
      return this.signHash(this.beerHash, this.account.priv)
    },
    beerAvailable () {
      return this.$store.state.beerAvailable
    }
  },
  data () {
    return {
    }
  },
  methods: {
    signHash (beerHash, privateKey) {
      const tx = beerHash
      const sig = Crypto.sign(tx, Buffer.from(privateKey, 'hex'))
      const sigBase64 = Buffer.from(sig).toString('base64')
      return sigBase64
    },
    verifyHash (beerHash, sigBase64, pubKey) {
      // this isnt needed here, just as a poc on how to use verify
      const sigBuffer = Buffer.from(sigBase64, 'base64')
      const hashBuffer = Buffer.from(beerHash)
      const pub = Crypto.decodeBase58Check(pubKey.split('$')[1])
      const verified = Crypto.verify(hashBuffer, sigBuffer, pub)
      return verified
    }
  },
  async mounted () {
    // let sigBase64 = this.signHash(this.beerHash, this.account.priv)
    // console.log('sigBase64', sigBase64)
    // const verified = this.verifyHash(this.beerHash, sigBase64, this.account.pub)
    // console.log('verified', verified)
  }
}
</script>

<style scoped lang="scss">

</style>
