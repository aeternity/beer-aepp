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
      <div class="order-row">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
</style>
