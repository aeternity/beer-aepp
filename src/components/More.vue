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
      <p class="screen-subtitle" style="font-weight:400;">
        A public key is a cryptographic code that allows a user to receive cryptocurrencies into his or her account. The private key is used to  decrypt the information that is sent to the account.
      </p>
      <p class="screen-subtitle">
        Opening hours aeternity stand
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        re:publica 2018 <br>
        Schönhauser Allee 6/7 <br>
        10179 Berlin <br>
        Germany <br>
        <br>
        2nd until 4th of May <br>
        12:00 – 18:00
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
                <router-link to='/orders'>
                  <ae-icon name="arrow" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>My Transactions</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <router-link to='/transactions'>
                  <ae-icon name="arrow" />
                </router-link>
              </div>
            </div>
          </div>
        </div> -->
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>About æternity</h5>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <router-link to='/about'>
                  <ae-icon name="arrow" />
                </router-link>
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
                <router-link to='/impressum'>
                  <ae-icon name="arrow" />
                </router-link>
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
