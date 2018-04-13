<template>
  <div class="hello">
    <h1>Hello and welcome, {{account.domain}}!</h1>

    <ae-address v-if="account.pub" show-avatar size='short' :address="account.pub"/>


    <button @click="buyBeer(beerBar,1000)" class="beer-btn"
            :class="{ 'beer-btn--busy': ajaxCall.status == 'busy',
                      'beer-btn--idle': ajaxCall.status == 'idle',
                      'beer-btn--ready': ajaxCall.status == 'ready'
                    }"/>

    <div v-if="ajaxCall.status=='busy'">press to get beer</div>
    <div v-if="ajaxCall.status=='idle'">ordering beer</div>
    <div v-if="ajaxCall.status=='ready'">Beer is ready, go to the bar</div>

    <h6>YOUR CURRENT BALANCE</h6>
    <ae-amount-input
              placeholder="0"
              v-model="balance"
              :units="[
                { symbol: 'AE', name: 'æternity' }
              ]"
            />

    <div v-if="ajaxCall.status=='ready'">
      <!-- Here's a Æ component: -->
      {{balance}}
      <!-- Transfer your leftover credit ({{balance.amount}}{{balance.symbol}}) to: -->
      <input type="text" placeholder="sexy foxy"/>
      <ae-button type="boring" @click="onClick('wii', 'woo')">Transfer</ae-button>
    </div>
  </div>
</template>

<script>
import { AeButton, AeAddress, AeAmountInput } from '@aeternity/aepp-components'
import fetch from 'isomorphic-fetch'

export default {
  name: 'BeerButton',
  components: {
    AeButton,
    AeAddress,
    AeAmountInput
  },
  data () {
    return {
      ajaxCall: { status: 'busy' },
      beerBar: 'ak$3evGruG5reEY4eWDKCuZxkDBp4KTRyj4YJp98BGTgSegqURNpaTs2FEzVxHbiZwA4Z48JatQzNBoZEGM732BwDRhz3Ng3U',
      interval: null
    }
  },
  computed: {
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
        amount: this.$store.state.balance,
        symbol: 'AE'
      }
    },
    client () {
      return this.$store.getters.client
    },
    clientInternal () {
      return this.$store.getters.clientInternal
    }
  },
  methods: {
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    async buyBeer (receiver, amount) {
      this.ajaxCall.status = 'idle'
      const spendResult = await this.client.base.spend(receiver, parseInt(amount), this.wallet, {fee: 1}) // params: (receiver, amount, account sending, { fee = 1, nonce })
      const txHash = spendResult['tx_hash']
      console.log(`Waiting for ${txHash} to be mined...`)
      this.client.tx.waitForTransaction(txHash).then(blockHeight => {
        this.ajaxCall.status = 'ready'
        console.log(`blockHeight:${blockHeight} `, `txHash:${txHash} `)
      }, reason => {
        this.ajaxCall.status = 'busy'
        console.warn('Something went wrong: ', reason)
      })
    },
    async fetch (url) {
      const response = await fetch(url)
      return response.json()
    }
  },
  mounted () {
    // Init HTTP client From SDK-JS
    console.log('wallet', this.account)

    this.client.base.getHeight().then(value => console.log('HEIGHT:', value))

    console.info('The account: ', this.account)
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
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
