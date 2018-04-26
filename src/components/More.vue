<template>
  <div class="more">
    <div class="more-top shell">
      <h1 class="screen-title">
        more info
      </h1>
      <p class="screen-subtitle">
        publick key
      </p>
      <p class="pubKey">
        {{account.pub}}
      </p>  
    </div>
    <div class="more-bottom">
      <div class="list">
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>My Orders</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <ae-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>My Transactions</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <ae-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>About æternity</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <ae-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>Impressum</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <ae-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIcon } from '@aeternity/aepp-components'
export default {
  name: 'More',
  components: {
    AeIcon
  },
  data () {
    return {

    }
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  }
}  
</script>
<style lang="scss" scoped>
.pubKey {
  text-align:left;
  word-break:break-all;
  letter-spacing:1.44;
}
.screen-title {
  text-transform: capitalize !important;
}
.screen-subtitle {
  font-weight:700;
  text-transform: capitalize !important;
}
</style>
