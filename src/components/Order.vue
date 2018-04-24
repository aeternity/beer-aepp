<template>
  <div class="home">
    <div v-if="account && account.pub">
      <h1>Hello {{account.name}}</h1>
      <div class="balance">
        You currently have {{balance}} tokens
        <span v-if="balance <= beerPrice">You don't have enough funds for a bew beer. <router-link :to="{name: 'send'}">Maybe send your remaining tokens to a friend.</router-link></span>
      </div>
      <div class="beerList" v-if="beerHashes.length > 0">
        <h3>Your Beers</h3>
        <beer-list-entry v-for="beerHash in beerHashes" :key="beerHash" :beerHash="beerHash"></beer-list-entry>
      </div>
    </div>
    <div v-else>
      <span>You are not logged in. Please visit this by opening the provided short url</span>
    </div>
  </div>
</template>

<script>
import BeerListEntry from './BeerListEntry.vue'

export default {
  name: 'Order',
  components: {
    BeerListEntry
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    beerPrice () {
      return this.$store.state.beerPrice
    },
    beerHashes () {
      return this.$store.state.beerHashes
    }
  },
  data () {
    return {
    }
  },
  props: {
    query: {
      type: Object
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
