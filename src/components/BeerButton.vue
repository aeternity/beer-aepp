<template>
  <div class="buy shell">
    <div class="noBeerLeft" v-if="!beerAvailable">
      Sorry there currently is no Beer left at the bar
    </div>
    <div class="buyButton" v-if="hasTokensForBeer && beerAvailable && t">
      <h1>Order Beer</h1>
      <p>
        With your tokens (upper right corner), you can order beer at the æternity stand. 
      </p>
      <ae-label for="numBeers" :help-text="errors.first('numBeers')">How many beers?</ae-label>
      <ae-input id="numBeers" name="numBeers" type="number" v-model.number="selectedBeerNumber" v-validate="`min_value:1|max_value:${maxBeers}`"></ae-input>
     <div class="equal-icon">
       <p class="center">
         =
       </p>
     </div>
      <div>
        <!-- This will send {{numberOfTokens}} tokens -->
        <ae-input 
        id="tokensCount"
        v-model.number="numberOfTokens">
        </ae-input>
      </div>
      <!-- <ae-button type='booring' @click='take()'>Order all the beer i can get!</ae-button> -->
      <button @click='take()'>
        <strong>
          Order all the beer i can get!
        </strong>
      </button>
      <ae-modal-light
              v-if="modalVisible == true"
              @close="modalVisible = false"
              title="Delete Voting?"
            >
            <ae-app-icon :app="app"></ae-app-icon>
              requests a transaction
              <ae-divider />
              <div class="summary">
                <h4>
                  {{numberOfTokens}} tokens
                </h4>
                <h5>
                  {{selectedBeerNumber}} beer(s)
                </h5>
              </div>
              <ae-divider />
              <div class="fees">
                <div>
                  <strong>
                    Additional fees                    
                  </strong>
                </div>
                <div>
                  <strong>
                    {{1 * selectedBeerNumber}}
                  </strong>
                </div>
              </div>
              <ae-button
                size="smaller"
                type="exciting"
                uppercase
                @click="modalVisible = false"
                slot="buttons"
              >cancel</ae-button>
              <ae-button
                size="smaller"
                type="dramatic"
                uppercase
                
                @click="buyBeer(barPubKey)"
                slot="buttons"
              >sign</ae-button>
            </ae-modal-light>
      <ae-button type='dramatic' @click="modalVisible = true">🍺 Order Beer</ae-button>
      <!-- <button @click="buyBeer(barPubKey)" class="beer-btn"
      :class="{ 'beer-btn--busy': ajaxCall.status == 'busy',
      'beer-btn--idle': ajaxCall.status == 'idle',
      'beer-btn--ready': ajaxCall.status == 'ready'
      }"/> -->

      <!-- <div v-if="ajaxCall.status=='busy'">press to get beer</div> -->
      <!-- <div v-if="ajaxCall.status=='idle'">ordering beer</div> -->
      
    </div>
    <div v-if="ajaxCall.status=='idle'">
      <h1>
        We are filling up your beer!
      </h1>
      <p class="loadingText">
        Head over to the æternity stand and have a drink and chat with us!
      </p>
      <p class="loadingText">
        You’re using Blockchain for this order. Every transaction on Blockchain, needs to wait until the next Block is mined.
      </p>
      <div id="water">
        <div class="wave">
          <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop stop-color="#57BBC1" stop-opacity=".25" offset="0%"/>
                <stop stop-color="#015871" offset="100%"/>
              </linearGradient>
            </defs>
            <path fill="#f7296e" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/>
          </svg>
        </div>
        <div class="wave">
          <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop stop-color="#57BBC1" stop-opacity=".25" offset="0%"/>
                <stop stop-color="#015871" offset="100%"/>
              </linearGradient>
            </defs>
            <path fill="#f7296e" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- <div v-if="ajaxCall.status=='ready'">Beer is ready, go to the bar and show them <router-link :to="{name: 'beer', params: {beerHash: txHash}}">this</router-link></div> -->
    <div v-if="ajaxCall.status=='ready'">
      <h1>
        Beer is ready, go to the bar and show them
      </h1>
      <BeerHash :bHash='txHash'></BeerHash>
    </div>
    <div class="link" v-if="!hasTokensForBeer">
      Not enough tokens to buy beer. You can <router-link :to="{name: 'send'}">send</router-link> your remaining {{balance}} tokens to a friend and share a beer.
    </div>
  </div>
</template>

<script>
import { AeButton, AeAddress, AeInput, AeLabel, AeModalLight, AeDivider, AeAppIcon } from '@aeternity/aepp-components'
import BeerHash from './BeerHash.vue'

export default {
  name: 'BeerButton',
  components: {
    AeButton,
    AeAddress,
    AeInput,
    AeLabel,
    BeerHash,
    AeModalLight,
    AeDivider,
    AeAppIcon
  },
  data () {
    return {
      ajaxCall: { status: 'busy' },
      txHash: null,
      selectedBeerNumber: 1,
      t: true,
      modalVisible: false
    }
  },
  computed: {
    barPubKey () {
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
      return this.$store.state.balance
    },
    client () {
      return this.$store.getters.client
    },
    clientInternal () {
      return this.$store.getters.clientInternal
    },
    hasTokensForBeer () {
      return this.balance >= this.beerPrice + 1
    },
    beerAvailable () {
      return this.$store.state.beerAvailable
    },
    beerApi () {
      return this.$store.getters.beerApi
    },
    maxBeers () {
      return Math.floor((this.balance - 1) / this.beerPrice)
    },
    beerPrice () {
      return this.$store.state.beerPrice
    },
    numberOfTokens () {
      const numTokens = this.selectedBeerNumber * this.beerPrice
      const rest = numTokens % this.beerPrice
      return numTokens - rest
    }
  },
  methods: {
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    async buyBeer (receiver) {
      // check first if there is beer
      const isBeerLeft = await this.beerApi.isBeerLeft()
      if (!isBeerLeft) {
        // TODO: display errors
        console.log('no Beer left')
        return false
      }

      const amount = this.numberOfTokens
      this.t = false
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
    },
    take () {
      // let bal = this.$store.state.balance
      // let res = parseInt( / 1000)
      // console.log(res)
      console.log(parseInt(this.$store.state.balance / 1000))
      this.selectedBeerNumber = parseInt(this.$store.state.balance / 1000) 
      // return parseInt(this.$store.state.balance / 1000)
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
input#numBeers,
input#tokensCount {
  text-align: center;
  font-size: 22px;
  margin: 0 !important;
}
.buyButton .ae-input {
  margin-bottom: 0 !important;
}
.buyButton .ae-button {
  margin-top: 30px;
}

#water { 
  height: 75vh;
  width:100%;
  position:fixed;
  bottom:0;
  left:0;
  background: #015871;
  background: white;
  overflow-x: hidden;
  z-index: -1;
  box-shadow: inset 0px -50vh 0 0 #f7296e;
  animation: grow 7s ease;
}

.wave {
  position: absolute;
  bottom:0;
  left: 0;
  height: 100%;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  animation-iteration-count:infinite;
  transform: translate3d(0, 0, 0);
}
.wave:nth-of-type(2) {
  bottom:0;
  left: 1600px;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  opacity: 1;
}
.loadingText {
  color:white;
  animation: loadingText 10s ease;
  font-size:18px;
  line-height:28px;
}
.fees {
  display: flex;
}
.fees div {
  flex:1;
}
.fees div:nth-child(1) {
  text-align:left;
}
.fees div:nth-child(2) {
  text-align:right;
}
.ae-modal-light {
  width:90vw;
}
.app-icon {
  margin: 0 auto;
}
@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
    height:100%;
  }
}

@keyframes swell {
  0%, 100% {
    transform: translate3d(0,-25px,0);
  }
  50% {
    transform: translate3d(0,5px,0);
  }
}
@keyframes grow {
  0% {
    height:0;
    box-shadow: inset 0px -0vh 0 0 #f7296e;
  }
  25% {
    height:25vh;
    box-shadow: inset 0px -10vh 0 0 #f7296e;
  }
  50% {
    height: 50vh;
    box-shadow: inset 0px -23vh 0 0 #f7296e;
  }
  70% {
    height: 66vh;
    box-shadow: inset 0px -45vh 0 0 #f7296e;
  }
  100% {
    height: 75vh;
    box-shadow: inset 0px -50vh 0 0 #f7296e;
  }
}
@keyframes loadingText {
  0% {
    color: black;
  }
  100% {
    color: white;
  }
}
</style>
