<template>
  <div class="addressDisplay">
    <vue-qrcode :value="account.p" :options="{ size: 300 }"></vue-qrcode>
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
  props: {
    account: {
      type: Object
    }
  },
  methods: {
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">

</style>
