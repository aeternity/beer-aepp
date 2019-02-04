<template>
  <div id="app">
    <!-- <ae-header name="Free Bæer">
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'buy-beer'}">🍺</ae-button>
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'address'}">🔍</ae-button>
      <ae-button v-if="account && account.pub" type='dramatic' :to="{name: 'send'}">✉️</ae-button>
      <div slot="mobile-left">
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'buy-beer'}">🍺</ae-button>
      </div>
      <div slot="mobile-right">
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'address'}">🔍</ae-button>
        <ae-button v-if="account && account.pub" type='dramatic' size="small" :to="{name: 'send'}">✉️</ae-button>
      </div>
    </ae-header> -->
    <Header v-show="$route.path!=='/'"></Header>
    <div class="content">
      <router-view></router-view>
    </div>
    <Navigation v-show="$route.path!=='/'"></Navigation>
  </div>
</template>

<script>
import { AeHeader, AeButton } from '@aeternity/aepp-components'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: {
    AeHeader,
    AeButton,
    Header,
    Navigation
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('updateBalance')
    setInterval(() => {
      this.$store.dispatch('updateBalance')
    }, 10000)
  }
}
</script>

<style scoped lang="scss">
  .content {
    text-align: center;
    max-width: 800px;
    margin: auto;
    padding-bottom: 70px;
  }
</style>
