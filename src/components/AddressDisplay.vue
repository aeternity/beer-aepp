<template>
  <div class="addressDisplay shell">
    <!-- <div>
      Somebody wants to send you tokens? They need your public key or your public name.
      You can find both on the flyer handed out to you or on this page. The easiest way is
      to let the other person scan the following QR Code.
    </div> -->
    <h1>Receive Tokens</h1>
    <p>
      Somebody who likes you that much, and wants to send you tokens? Show your QR Code! 
    </p>
    <vue-qrcode :value="account.pub" :options="{ size: 300 }"></vue-qrcode>
    <!-- <div>
      They can also enter your public name <strong>{{account.name}}</strong> and make a lookup.
      In any case the following public key should be displayed.
    </div> -->
    <!-- <ae-address v-if="account.pub" show-avatar size='short' :address="account.pub"/> -->
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
