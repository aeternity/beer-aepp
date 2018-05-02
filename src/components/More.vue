<template>
  <div class="more">
    <div class="more-bottom shell">
      <h1 class="screen-title">
        More Info
      </h1>
      <div class="list">
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <router-link to='/orders'>
                <h5>My Orders</h5>
              </router-link>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <router-link to='/orders'>
                  <ae-icon name="chevron" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <router-link to='/about'>
                <h5>About æternity</h5>
              </router-link>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <router-link to='/about'>
                  <ae-icon name="chevron" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <router-link to='/impressum'>
                <h5>Impressum</h5>
              </router-link>
            </div>
            <div class="list-item-el">
              <div class="arrow">
                <router-link to='/impressum'>
                  <ae-icon name="chevron" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more-top shell">
      <p class="screen-subtitle">
        Your Public Key
      </p>
      <p class="pubKey">
        {{account.pub}}
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        A keypair consists of a private and a public key. Your public key is the address people use to send funds to you. Your private key must be kept secret at all times.
      </p>
      <p class="screen-subtitle">
        Opening hours of the æternity stand
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        re:publica 2018<br>
        STATION Berlin<br>
        Luckenwalder Str. 4&hairsp;–&hairsp;6<br>
        10963 Berlin<br>
        Germany<br>
        <br>
        2nd&hairsp;–&hairsp;4th of May<br>
        12:00&hairsp;–&hairsp;18:00
      </p>
      <p class="screen-subtitle">
        How to get to the æternity stand
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        We are in the main hall next to the wardrobe, near the main entrance.
      </p>
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
  // text-transform: capitalize !important;
}
.screen-subtitle {
  font-weight:700;
  // text-transform: capitalize !important;
}
a {
  text-decoration:none;
}

.pubKey {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
}
</style>
