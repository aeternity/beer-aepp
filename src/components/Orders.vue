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
    <div class="popover">
      <BeerHash v-if="bHash" :bHash='bHash'></BeerHash>
    </div>
  </div>
</template>

<script>
import OrderRow from './OrderRow.vue'
import BeerHash from './BeerHash.vue'

export default {
  name: 'Order',
  components: {
    OrderRow,
    BeerHash
  },
  data () {
    return {
      bHash: null
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
</style>
