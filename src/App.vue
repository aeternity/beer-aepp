<template>
  <div id="app">
    <ae-header name="Free Bæer">
      <ae-button type='dramatic'>🍺</ae-button>
      <span slot="mobile-left">mobile-left</span>
      <span slot="mobile-right">mobile-right</span>
    </ae-header>
    <BeerButton :account="account"/>
  </div>
</template>

<script>
import BeerButton from "./components/BeerButton.vue";
import AeternityClient from "@aeternity/aepp-sdk";
import { AeHeader, AeButton } from "@aeternity/aepp-components";

export default {
  name: "app",
  components: {
    AeHeader,
    AeButton,
    BeerButton
  },
  computed: {
    account() {
      //get query params
      return this.$route.query; // k = private, p = public, n = name
    }
  },
  mounted() {
    // DEBUG SDK-JS
    const provider = new AeternityClient.providers.HttpProvider(
      "sdk-testnet.aepps.com",
      443,
      { secured: true, internal: false }
    );
    const client = new AeternityClient(provider);
    console.log(
      client.base.getHeight().then(value => console.log("HEIGHT:", value))
    );

    const provider_internal = new AeternityClient.providers.HttpProvider(
      "sdk-testnet.aepps.com",
      443,
      { secured: true, internal: true }
    );
    const client_internal = new AeternityClient(provider_internal);
    console.log(
      client_internal.accounts
        .getBalance(this.$route.query.p)
        .then(value => console.log(value))
    );

    // Get URL params (account info)

    // this.account = this.$route.query;

    // DEBUG async fetch
    // const blabla = this.fetchAsync('https://sdk-testnet.aepps.com/v2/top')
    //                     .then((value) => console.log(value))
    //                     .catch((error) => console.warn(error))

    console.info("Vue App mounted");
  },
  methods: {
    async fetchAsync(url) {
      const response = await fetch(url);
      return response.json();
    }
  }
};
</script>
