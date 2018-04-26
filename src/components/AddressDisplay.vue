<template>
  <div class="addressDisplay shell">
    <h1 class="screen-title">Receive Tokens</h1>
    <p class="screen-subtitle">
      Somebody who likes you that much, and wants to send you tokens? Show your QR Code! 
    </p>
    <vue-qrcode :value="account.pub" :options="{ size: 300 }"></vue-qrcode>
  </div>
</template>

<script>
import { AeButton, AeAddress, AeAmountInput } from '@aeternity/aepp-components'
import VueQrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'AddressDisplay',
  components: {
    AeButton,
    AeAddress,
    AeAmountInput,
    VueQrcode
  },
  data () {
    return {
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
.addressDisplay {
  text-align: left;
}
.addressDisplay canvas {
  width: 85%;
  display: flex;
  margin: 0 auto;
}
</style>
