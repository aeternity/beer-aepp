<template>
  <div class="buy shell" v-bind:class="{orderDone: isOrderDone}">
    <div class="buyButton" v-if="hasTokensForBeer && beerAvailable && t">
      <h1 class="screen-title">Order Beer</h1>
      <p class="screen-subtitle">
        Use your tokens (upper right hand corner) to order a beer at our stand.
      </p>
      <!-- <ae-label for="numBeers" :help-text="errors.first('numBeers')">How many beers?</ae-label> -->
      <ae-input id="numBeers" name="numBeers" type="number" v-model.number="selectedBeerNumber" v-validate="`min_value:1|max_value:${maxBeers}`" units="beers">
        <!-- <ae-button class='inc' slot='left'>

        </ae-button> -->
        <div class="inc" @click="beerQuantity('inc')" slot='left'>
          <ae-icon name="chevron" rotate="270" />
        </div>
        <div class="dec" @click="beerQuantity('dec')" slot='left'>
          <ae-icon name="chevron" rotate="90" />
        </div>
        <span class="unit" slot='right'>beer(s)</span>
      </ae-input>
     <div class="equal-icon">
       <p class="center">
         =
       </p>
     </div>
      <div>
        <!-- This will send {{numberOfTokens}} tokens -->
        <ae-input
        id="tokensCount"
        ref="tokensCount"
        v-model.number="numberOfTokens">
          <span class="unit" slot='right'>tokens</span>
        </ae-input>
      </div>
      <div @click='getAllBeer()' class="takeAllPar">
        <strong>
          Order all the beer i can get!
        </strong>
      </div>
      <ae-modal-light
              v-if="modalVisible == true"
              @close="modalVisible = false">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="31" viewBox="0 0 27 31">
                  <path fill="#F7296E" fill-rule="evenodd" d="M26.803 6.571c-.243-1.293-.858-2.47-1.732-3.318-.915-.888-2.079-1.376-3.274-1.376-.23 0-.464.02-.698.058C20.135.756 18.809.09 17.395.09 16.32.09 15.29.48 14.427 1.2 13.543.42 12.473 0 11.35 0 9.856 0 8.445.763 7.478 2.067a4.398 4.398 0 0 0-1.276-.191c-1.196 0-2.358.49-3.274 1.376-.875.848-1.49 2.026-1.732 3.318-.08.423-.12.859-.12 1.294 0 1.802.688 3.488 1.863 4.62C1.23 13.069 0 14.678 0 16.574V18.3c0 2.39 1.952 4.329 4.358 4.329h.28v4.76C4.637 29.384 6.422 31 8.624 31H19.43c2.203 0 3.987-1.616 3.987-3.611V13.545c.105-.04.21-.083.312-.133 1.94-.92 3.193-3.099 3.193-5.548a6.747 6.747 0 0 0-.118-1.293zM4.895 21.211c-1.401-.284-2.448-1.387-2.448-2.709v-1.11c0-1.32 1.047-2.423 2.448-2.708v6.527zm18.04-8.87c-.419.2-.856.3-1.303.3-1.043 0-2.042-.565-2.74-1.548a.722.722 0 0 0-1.266.174c-.59 1.65-1.903 2.718-3.346 2.718-.183 0-.38-.022-.596-.066a.72.72 0 0 0-.867.706v5.506c0 1.045-1.026 1.895-2.288 1.895-1.26 0-2.287-.85-2.287-1.895v-7.055a.719.719 0 0 0-.995-.666c-1.049.43-2.174.243-3.081-.469-1.076-.846-1.719-2.29-1.719-3.864 0-.348.033-.696.095-1.033.382-2.047 1.881-3.532 3.566-3.532.422 0 .843.095 1.254.283a.72.72 0 0 0 .92-.288c.692-1.174 1.795-1.875 2.95-1.875.93 0 1.817.44 2.501 1.24a.72.72 0 0 0 1.083.014c.675-.751 1.539-1.165 2.43-1.165 1.075 0 2.093.59 2.793 1.618a.724.724 0 0 0 .79.29 2.95 2.95 0 0 1 .8-.116c1.685 0 3.185 1.486 3.566 3.532.063.338.094.686.094 1.034.005 1.873-.944 3.587-2.355 4.261z"/>
              </svg>
            </div>
            <h1 class="modal-title">
              Beer æpp
            </h1>
            <p class="modal-subtitle">
              REQUESTS A TRANSACTION
            </p>
            <div class="row" style="display:flex;align-items:center;">
                <div>
                  <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
                </div>
                <div>
                  <ae-icon name="arrow" />
                </div>
                <div>
                  <ae-identity-avatar :address="barPubKey"></ae-identity-avatar>
                </div>
              </div>
              <div class="row" style="display:flex;align-items:center;">
                <div>
                  <p class="modal-address-name">
                    {{account.name}}
                  </p>
                </div>
                <div></div>
                <div>
                  <p class="modal-address-name">
                    æternity bar
                  </p>
                </div>
              </div>
              <ae-divider />
              <div class="summary">
                <h4 class="modal-token-amount">
                  {{numberOfTokens}}
                  <span class="modal-token-amount-sub">tokens</span>
                </h4>
                <h5 class="modal-beer-count">
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
                    1 TOKEN
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
      <ae-button type='dramatic' @click="showModal()" :inactive="!isValidInput">🍺 Order Beer</ae-button>
      <!-- <button @click="buyBeer(barPubKey)" class="beer-btn"
      :class="{ 'beer-btn--busy': ajaxCall.status == 'busy',
      'beer-btn--idle': ajaxCall.status == 'idle',
      'beer-btn--ready': ajaxCall.status == 'ready'
      }"/> -->

      <!-- <div v-if="ajaxCall.status=='busy'">press to get beer</div> -->
      <!-- <div v-if="ajaxCall.status=='idle'">ordering beer</div> -->

    </div>
    <div v-if="ajaxCall.status=='idle'" class="link fillBeer">
      <h1 class="screen-title" style="margin-top:10vh;">
        🍺
      </h1>
      <h1>
        We are filling up your beer!
      </h1>
      <p class="loadingText">
        Head over to the æternity stand, have a drink and chat with us! We are in the main hall next to the wardrobe, near the main entrance.
      </p>
      <p class="loadingText">
        At this moment, your transaction on the blockchain is being confirmed by being included in a newly mined block.
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
    <div class="beer-panel--ready" v-if="ajaxCall.status=='ready'">
      <h1>
        Your beer is ready!
      </h1>
      <p class="screen-subtitle" style="text-align: center;padding:0 10px;">
        Show this QR at the æternity stand &amp; pick up your beer(s).
      </p>
      <BeerHash :bHash='txHash'></BeerHash>
      <router-link to='buy'>
        <ae-button type='boring' @click='resetScreen()'>I picked up my beer</ae-button>
      </router-link>
    </div>
    <div class="link" v-if="!hasTokensForBeer && ajaxCall.status !=='ready'">
      <h1 class="screen-title">
        🤔
      </h1>
      <p class="screen-subtitle">
        You don’t have enough tokens to buy a beer. To let someone transfer some tokens to you, simply click on ‘Receive’ below.
      </p>
      <!-- Not enough tokens to buy beer. You can <router-link :to="{name: 'send'}">send</router-link> your remaining {{balance}} tokens to a friend and share a beer. -->
    </div>
    <div class="link" v-if="barClosed">
      <h1 class="screen-title">
        🍺
      </h1>
      <p class="screen-subtitle">
        Sorry, there is no one to serve your beer right now. Our stand is only open for beer service from 12:00&hairsp;–&hairsp;19:00 on May 2nd, 3rd, and 4th.<br>
        We are in the main hall next to the wardrobe, near the main entrance.
      </p>
    </div>
    <div class="link" v-if="beerEmpty">
      <h1 class="screen-title">
        🍺
      </h1>
      <p class="screen-subtitle">
        Sorry. Currently the Bar is out of beer.
      </p>
    </div>
  </div>
</template>

<script>
import {
  AeButton,
  AeAddress,
  AeInput,
  AeLabel,
  AeModalLight,
  AeDivider,
  AeAppIcon,
  AeIdentityAvatar,
  AeIcon,
  AeAmountInput
} from '@aeternity/aepp-components'
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
    AeAppIcon,
    AeIdentityAvatar,
    AeIcon,
    AeAmountInput
  },
  data () {
    return {
      ajaxCall: { status: 'busy' },
      txHash: null,
      selectedBeerNumber: 1,
      t: true,
      modalVisible: false,
      isOrderDone: false
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
      return this.barState === 'open'
    },
    beerEmpty () {
      return this.barState === 'out_of_beers'
    },
    barClosed () {
      return this.barState === 'closed'
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
    },
    barState () {
      return this.$store.state.barState
    },
    isValidInput () {
      return this.selectedBeerNumber > 0 && this.selectedBeerNumber <= this.maxBeers
    }
  },
  methods: {
    onClick (...strings) {
      console.log(strings[0] + strings[1])
    },
    async buyBeer (receiver) {
      // check first if there is beer
      if (!this.beerAvailable) {
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
        this.isOrderDone = true
        console.log(`blockHeight:${blockHeight} `, `txHash:${txHash} `)
      }, reason => {
        this.ajaxCall.status = 'busy'
        console.warn('Something went wrong: ', reason)
      })
    },
    getAllBeer () {
      this.selectedBeerNumber = this.maxBeers
    },
    showModal () {
      if (this.isValidInput) {
        this.modalVisible = true
      }
    },
    beerQuantity (action) {
      if (action === 'inc') {
        this.selectedBeerNumber++
      } else {
        this.selectedBeerNumber--
      }
    },
    resetScreen () {
      this.ajaxCall.status = 'busy'
      this.txHash = null
      this.selectedBeerNumber = 1
      this.t = true
      this.modalVisible = false
      this.isOrderDone = false
    }
  },
  mounted () {
    // hack to disable direct token input
    if (this.$refs.tokensCount) {
      const tokenInput = this.$refs.tokensCount.$el.querySelector('input')
      if (tokenInput) {
        tokenInput.readOnly = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import '../custom.scss';
h1 {
  text-align:center;
}
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
.ae-input {
  position:relative;
}
input#numBeers,
input#tokensCount {
  text-align: center;
  font-size: 22px;
  margin: 0 !important;
}
.unit {
  position:absolute;
  right:1%;
  top:auto;
  text-transform:uppercase;
  color:#1e1e1e;
  font-size:12px;
}
.inc,
.dec {
  position:absolute;
  left:4%;
}
.inc {
  top:4%;
}
.dec {
  bottom:4%;
}
.buyButton .ae-input {
  margin-bottom: 0 !important;
}
.buyButton .ae-button {
  margin-top: 30px;
}

#water {
  height: 85vh;
  width:100%;
  position:fixed;
  bottom:0;
  left:0;
  background: #fff;
  overflow-x: hidden;
  z-index: -1;
  box-shadow: inset 0px -61vh 0 0 #f7296e;
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
  color:#fff;
  animation: loadingText 3.5s ease-in;
  font-size:18px;
  line-height:28px;
}
.fillBeer h1 {
  color:#fff;
  animation: loadingText 5s ease-in;
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
.ae-overlay {
  z-index:2;
}
.row {
  display:flex;
  align-items:center;
}
.row div {
  flex:1;
}
._type_booring {
  color: #1e1e1e !important;
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
.orderDone {
  background: #f7296e;
  color: #fff;
  box-shadow: 0 0 0 100vh #f7296e;
}
.beer-panel--ready p {
  font-size:18px;
  line-height:1.56;
  color:#fff;
}
.link {
  margin-bottom:20vh;
}
.link .screen-title {
  font-size:50px;
  margin-top:20vh;
}
.link .screen-title,
.link .screen-subtitle {
  text-align:center;
}
.equal-icon {
  margin: -1vh;
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
  35% {
    height: 35vh;
    box-shadow: inset 0px -39vh 0 0 #f7296e;
  }
  50% {
    height: 55vh;
    box-shadow: inset 0px -43vh 0 0 #f7296e;
  }
  70% {
    height: 80vh;
    box-shadow: inset 0px -55vh 0 0 #f7296e;
  }
  100% {
    height: 85vh;
    box-shadow: inset 0px -65vh 0 0 #f7296e;
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
