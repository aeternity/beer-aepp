<template>
  <!-- <div class="home">
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
  </div> -->
  <div class="order shell">
    <h1>order beer</h1>
    <p>
      With your tokens (upper right corner), you can order beer at the æternity stand. 
    </p>
    <div class="beer-input">
      <ae-amount-input placeholder="0.00" :value="beerOrderCount" :units='beers'/>
    </div>
    <div class="equal-sign">
      =
    </div>
    <!-- <div class="token-input">
      <ae-amount-input :value="beerOrderAmount" :unit='Tokens' size="size" color="black"/>
    </div> -->
    <div class="action">
      <div class="beer-all">
        <ae-button>
          order all the beer i  can get
        </ae-button>
      </div>
      <div class="open-modal">
        <ae-button>
          order beer
        </ae-button>
      </div>  
    </div>
  </div>
</template>

<script>
import { AeButton, AeAmountInput } from '@aeternity/aepp-components'
import BeerListEntry from './BeerListEntry.vue'

export default {
  name: 'Order',
  components: {
    BeerListEntry,
    AeAmountInput,
    beers: [
      { symbol: 'Beers', name: 'beers' }
    ],
    beerOrderCount: {amount: 1, symbol: 'beer'},
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
      beerOrderCount: 1,
      beerOrderAmount: 1000
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
