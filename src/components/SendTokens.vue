<template>
  <div class="sendTokens">
    <span v-if="loading">Loading</span>
    <qrcode-reader v-if="readQrCode" @decode="onDecode" @init="onInit"></qrcode-reader>
    <!-- <span v-if="!loading && !hasCamera">TODO: Show Fallback</span> -->
    <input type="text" v-model="sendToAddress"></input>
  </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'


export default {
  name: 'SendTokens',
  components: {
    QrcodeReader
  },
  data () {
    return {
      loading: true,
      readQrCode: true,
      hasCamera: false,
      sendToAddress: ''
    }
  },
  props: {

  },
  methods: {
    onDecode (content) {
      console.log(content)
      this.sendToAddress = content
      this.readQrCode = false
    },
    async onInit (promise) {
      try {
        await promise
        this.hasCamera = true
      } catch (e) {
        console.log(e)
        this.hasCamera = false
      } finally {
        // hide loader
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
