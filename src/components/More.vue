<template>
  <div class="more">
    <div class="more-top shell">
      <h1 class="screen-title">
        More Info
      </h1>
      <p class="screen-subtitle">
        Your Public Key
      </p>
      <p class="pubKey">
        {{account.pub}}
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        A public key is a cryptographic code that allows users to receive cryptocurrencies into his or her account. A private key is used to  decrypt the information that is sent to the account.
      </p>
      <p class="screen-subtitle">
        Opening hours of the æternity stand
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        re:publica 2018<br>
        STATION Berlin<br>
        Luckenwalder Str. 4&thinsp;–&thinsp;6<br>
        10963 Berlin<br>
        Germany<br>
        <br>
        2nd&thinsp;–&thinsp;4th of May<br>
        12:00&thinsp;–&thinsp;18:00
      </p>
      <p class="screen-subtitle">
        How to get to the æternity stand
      </p>
      <p class="screen-subtitle" style="font-weight:400;">
        We are ...
      </p>
    </div>
    <div class="more-bottom">
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
</style>
