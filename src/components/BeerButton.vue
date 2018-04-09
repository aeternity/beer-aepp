<template>
  <div class="hello">
    <h1>Hello and welcome, {{account.n}}!</h1>

    <ae-address v-if="account.p" show-avatar size='short' :address="account.p"/>


    <button @click="buyBeer()" class="beer-btn"
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
    <!-- Here's a Æ component: -->
    Transfer your leftover credit ({{balance.amount}}{{balance.symbol}}) to:
    <input type="text" placeholder="sexy foxy"/>
    <ae-button type="boring" @click="onClick('wii', 'woo')">Transfer</ae-button>
  </div>
</template>

<script>
import { AeButton, AeAddress, AeAmountInput } from '@aeternity/aepp-components'
import { setTimeout } from 'timers'

export default {
  name: 'BeerButton',
  components: {
    AeButton,
    AeAddress,
    AeAmountInput
  },
  data () {
    return {
      balance: { amount: 1252, symbol: 'AE' }, // this should be the actual wallet balance
      ajaxCall: { status: 'busy' }
    }
  },
  props: {
    account: Object
  },
  methods: {
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    buyBeer () {
      this.ajaxCall.status = 'idle'
      setTimeout(() => {
        this.ajaxCall.status = 'ready'
        this.balance.amount = 251
      }, 1500)
      // alert('wii')
    }
  },
  mounted () {
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
