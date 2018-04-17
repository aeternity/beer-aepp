<template>
  <div class="beerHash">
    <div class="noBeerLeft" v-if="!beerAvailable">
      Sorry there currently is no Beer left at the bar
    </div>
    <div>
      Show this to the bartender to collect your beer!
    </div>
    <div>
      <vue-qrcode :value="beerHash" :options="{ size: 300 }"></vue-qrcode>
    </div>
    <div>
      <vue-qrcode :value="fullInfo" :options="{ size: 300 }"></vue-qrcode>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'

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
        pub: this.account.pub,
        tx: this.beerHash
      }
      return JSON.stringify(info)
    },
    beerHash () {
      return this.$route.params.beerHash
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
  },
  async mounted () {
  }
}
</script>

<style scoped lang="scss">

</style>
