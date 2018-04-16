<template>
  <div class="home">
    <div v-if="account && account.pub">
      <h1>Hello {{account.name}}</h1>
      <div class="balance">
        You currently have {{balance}} tokens
      </div>
      <div class="lastBeer">
        <span v-if="!lastBeerHash">You have not bought any beer</span>
        <span v-if="lastBeerTx && lastBeerTx.block_height < 0">Please wait for your beer transaction to be mined</span>
        <span v-if="txIsMined && lastBeerApiState === 0">Your beer is ready for pickup</span>
        <span v-if="txIsMined && lastBeerApiState === 1 && balance > beerPrice">You picked up your last beer. <router-link :to="{name: 'buy-beer'}">Buy a new one</router-link></span>
        <span v-if="txIsMined && lastBeerApiState === 1 && balance <= beerPrice">You picked up your last beer. <router-link :to="{name: 'send'}">Maybe send your remaining tokens to a friend.</router-link></span>
      </div>
    </div>
    <div v-else>
      <span>You are not logged in. Please visit this by opening the provided short url</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    lastBeerHash () {
      return this.$store.state.lastBeerHash
    },
    balance () {
      return this.$store.state.balance
    },
    txIsMined () {
      return this.lastBeerTx && this.lastBeerTx.block_height >= 0
    },
    beerPrice () {
      return this.$store.state.beerPrice
    }
  },
  data () {
    return {
      lastBeerTx: {},
      lastBeerApiState: null
    }
  },
  props: {
    query: {
      type: Object
    }
  },
  methods: {
    async getBeerState (txHash) {
      return this.$store.getters.beerApi.getBeerState(txHash)
    }
  },
  async mounted () {
    if (this.lastBeerHash) {
      this.lastBeerTx = await this.$store.getters.client.tx.getTransaction(this.lastBeerHash)
      this.lastBeerApiState = await this.getBeerState(this.lastBeerHash)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
