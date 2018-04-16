<template>
  <div class="buy">
    <div class="balance">
      You currently have {{storeBalance}} Beer Tokens
    </div>
    <div class="buyButton" v-if="hasTokensForBeer">
      <button @click="buyBeer(beerBar)" class="beer-btn"
      :class="{ 'beer-btn--busy': ajaxCall.status == 'busy',
      'beer-btn--idle': ajaxCall.status == 'idle',
      'beer-btn--ready': ajaxCall.status == 'ready'
      }"/>

      <div v-if="ajaxCall.status=='busy'">press to get beer</div>
      <div v-if="ajaxCall.status=='idle'">ordering beer</div>
    </div>
    <div v-if="ajaxCall.status=='ready'">Beer is ready, go to the bar and show them <router-link :to="{name: 'beer', params: {beerHash: txHash}}">this</router-link></div>
    <div class="link" v-if="!hasTokensForBeer">
      Not enough tokens to buy beer. You can <router-link :to="{name: 'send'}">send</router-link> your remaining {{storeBalance}} tokens to a friend and share a beer.
    </div>
  </div>
</template>

<script>
import { AeButton, AeAddress } from '@aeternity/aepp-components'

export default {
  name: 'BeerButton',
  components: {
    AeButton,
    AeAddress
  },
  data () {
    return {
      ajaxCall: { status: 'busy' },
      txHash: null
    }
  },
  computed: {
    beerBar () {
      return this.$store.state.barPubKey
    },
    account () {
      return this.$store.state.account
    },
    wallet () {
      return {
        priv: this.account.priv,
        pub: this.account.pub
      }
    },
    balance () {
      return {
        amount: this.storeBalance,
        symbol: 'AE'
      }
    },
    storeBalance () {
      return this.$store.state.balance
    },
    client () {
      return this.$store.getters.client
    },
    clientInternal () {
      return this.$store.getters.clientInternal
    },
    hasTokensForBeer () {
      return this.storeBalance >= this.$store.state.beerPrice + 1
    }
  },
  methods: {
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    async buyBeer (receiver) {
      const amount = this.$store.state.beerPrice
      this.ajaxCall.status = 'idle'
      const spendResult = await this.client.base.spend(receiver, parseInt(amount), this.wallet, {fee: 1}) // params: (receiver, amount, account sending, { fee = 1, nonce })
      const txHash = spendResult['tx_hash']
      this.txHash = txHash
      this.$store.commit('addBeerHash', txHash)
      console.log(`Waiting for ${txHash} to be mined...`)
      this.client.tx.waitForTransaction(txHash).then(blockHeight => {
        this.ajaxCall.status = 'ready'
        console.log(`blockHeight:${blockHeight} `, `txHash:${txHash} `)
      }, reason => {
        this.ajaxCall.status = 'busy'
        console.warn('Something went wrong: ', reason)
      })
    }
  },
  mounted () {
    // Init HTTP client From SDK-JS
    console.log('wallet', this.account)

    this.client.base.getHeight().then(value => console.log('HEIGHT:', value))

    console.info('The account: ', this.account)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '../custom.scss';
.beer-btn {
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  margin: 0 auto;
}
.beer-btn--busy {
  background: red;
}
.beer-btn--idle {
  background: orange;
}
.beer-btn--ready {
  background: green;
}
</style>
P
