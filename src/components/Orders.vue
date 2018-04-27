<template>
  <div class="orders">
    <div class="orders-top shell">
      <h1 class="screen-title">
        My Orders
      </h1>
      <p class="screen-subtitle">
        Here is a list of all the beer you order until now.  Click an order to display the QR Code, which you can show us at the aeternity stand
      </p>
    </div>
    <div class="orders-bottom">
      <div class="orders-head">
        <div class="orders-head-item">
          Amount
        </div>
        <div class="orders-head-item">
          Picked up?
        </div>
        <div class="orders-head-item">

        </div>
      </div>
      <div class="orders-rows">
        <order-row v-for="beerHash in beerHashes" :key="beerHash" :beerHash="beerHash" @click.native="showQrCode(beerHash)"></order-row>  
      </div>
    </div>
    <!-- TODO: display hash in a popover?! -->
    <div class="popover" v-bind:class="{active: isActive}">
      <BeerHash v-if="bHash" :bHash='bHash'></BeerHash>
      <ae-button type="booring" @click='isActive = false'>Close</ae-button>
    </div>
  </div>
</template>

<script>
import OrderRow from './OrderRow.vue'
import BeerHash from './BeerHash.vue'
import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'Order',
  components: {
    OrderRow,
    BeerHash,
    AeButton
  },
  data () {
    return {
      bHash: null,
      isActive: false
    }
  },
  computed: {
    beerHashes () {
      return this.$store.state.beerHashes
    }
  },
  methods: {
    showQrCode (beerHash) {
      this.bHash = beerHash
      this.isActive = true
    }
  }
}
</script>

<style lang="scss">
.orders-head {
  display:flex;
  .orders-head-item {
    flex:1;
  }
}
.order-row {
  display:flex;
  flex-wrap:wrap;
  padding:10px 0 10px;
  border-top:1px solid #c3c3c3;
}
.order-row:last-child {
  border-bottom:1px solid #c3c3c3;
}
// .orders-rows div {
//   flex:1 !important;
// }
.order-row div {
flex:1;
align-self:center;
}
.popover.active {
  color:#fff;
  position:fixed;
  top:10%;
  left:0;
  width:100%;
  height:100%;
  padding-top:20%;
  background: #f7296e;
}
</style>
