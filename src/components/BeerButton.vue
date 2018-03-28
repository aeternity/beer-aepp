<template>
  <div class="hello">
    <h1>Hello and welcome, {{account.n}}!</h1>

    <button @click="buyBeer()" class="beer-btn"
            :class="{ 'beer-btn--busy': ajaxCall.status == 'busy',
                      'beer-btn--idle': ajaxCall.status == 'idle',
                      'beer-btn--ready': ajaxCall.status == 'ready'
                    }"></button>
    <ae-address show-avatar size='short' :address="account.p"/>

    <div v-if="ajaxCall.status=='busy'">press to get beer</div>
    <div v-if="ajaxCall.status=='idle'">ordering beer</div>
    <div v-if="ajaxCall.status=='ready'">Beer is ready, go to the bar</div>

    <!-- Here's a Æ component: -->
    <!-- <ae-button type="boring" @click="onClick('wii', 'woo')">click me, and check the console</ae-button> -->
  </div>
</template>

<script>
import * as R from 'ramda'
import BN from 'bn.js'
import { AeButton, AeAddress } from '@aeternity/aepp-components'
import { setTimeout } from 'timers';


export default {
  name: 'BeerButton',
  components: {
    AeButton,
    AeAddress
  },
  data () {
    return {
      identity: {},
      ajaxCall : { status : 'busy' }
    }
  },
  props: {
    account: Object
  },
  methods: {
    onClick (...strings) {
      const str = R.join(' ', ['Hello', 'webpack', ...strings])

      console.log(str);
    },
    buyBeer () {
      this.ajaxCall.status = 'idle';
      setTimeout(() => this.ajaxCall.status = 'ready', 1500)
      //alert('wii');
    }
  },
  mounted () {
    console.info('The account: ', this.account);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '../custom.scss';
.beer-btn{
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  margin: 0 auto;
}
.beer-btn--busy{
  background: red;
}
.beer-btn--idle{
  background: orange;
}
.beer-btn--ready{
  background: green;
}

</style>
