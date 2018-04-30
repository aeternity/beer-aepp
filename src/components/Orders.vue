<template>
  <div class="orders">
    <div class="orders-top shell">
      <h1 class="screen-title">
        My Orders
      </h1>
      <p class="screen-subtitle">
        Here is a list of all the beer you have ordered so far.  Click an order to display the QR Code, which you can show us at the aeternity stand.
      </p>
    </div>
    <div class="orders-bottom">
      <div class="orders-head">
        <div class="orders-head-item">
          <strong>Amount</strong>
        </div>
        <div class="orders-head-item">
          <strong>Picked up?</strong>
        </div>
        <div class="orders-head-item">

        </div>
      </div>
      <div class="orders-rows">
        <order-row v-for="beerHash in beerHashes" :key="beerHash" :beerHash="beerHash" @click.native="showQrCode(beerHash)"></order-row>
      </div>
    </div>
    <div class="popover" v-bind:class="{active: isActive}">
      <BeerHash v-if="bHash" :bHash='bHash'></BeerHash>
      <ae-button type="boring" @click='isActive = false'>Close</ae-button>
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
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
.orders-head {
  display:flex;
  .orders-head-item {
    flex:1;
    padding-bottom:10px;
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
.popover {
  display:none;
}
.popover.active {
  display:block;
  color:#fff;
  position:fixed;
  top:10%;
  left:0;
  width:100%;
  height:100%;
  padding-top:20%;
  background: #f7296e;
}
.orders {
  margin-top:10vh;
}
.orders-head-item > strong {
  font-size:14px;
}
</style>
