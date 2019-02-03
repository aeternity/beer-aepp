import Vuex from "vuex";
import Vue from "vue";
// import { AeternityClient } from '@aeternity/aepp-sdk'
import Ae from "@aeternity/aepp-sdk/es/ae/universal";

Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    account: {
      pub: null,
      priv: null,
      name: null
    },
    balance: 0,
    beerHashes: [],
    beerPrice: 1000, // TODO: this should be in ae now
    //TODO: new key fomrat
    barPubKey: "ak_PcEB3fSN9mPDWbVyrvHWUjyBAwVncXWHmXpb7zKFPGW2QJ5wr",
    websocketUrl: "https://republica-pos.aepps.com", //TODO: this should something like pos.store.aepps.com
    socketConnected: false,
    barState: null,
    ae: null
  },
  getters: {
    lastBeerHash(state) {
      if (state.beerHashes.length <= 0) {
        return null;
      }
      return state.beerHashes[0];
    },
    ae(state) {
      return state.ae;
    }
    // client () { // TODO: this should be updated to the latest sdk
    //   const provider = new AeternityClient.providers.HttpProvider(
    //     'republica.aepps.com',
    //     443,
    //     { secured: true, internal: false }
    //   )
    //   return new AeternityClient(provider)
    // },
    // clientInternal() { // TODO: this should be updated to the latest sdk and is not necesary
    //   const provider = new AeternityClient.providers.HttpProvider(
    //     'republica.aepps.com',
    //     443,
    //     { secured: true, internal: true }
    //   )
    //   return new AeternityClient(provider)
    // }
  },
  mutations: {
    setAccount(state, { pub, priv, name }) {
      state.account.pub = pub;
      state.account.priv = priv;
      state.account.name = name;
      // eslint-disable-next-line no-undef
      localStorage.setItem("account", JSON.stringify(state.account));
      state.ae.setKeypair({
        secretKey: state.account.priv,
        publicKey: state.account.pub
      });
    },
    setAe(state, ae) {
      state.ae = ae;
    },
    setBalance(state, newBalance) {
      state.balance = newBalance;
    },
    addBeerHash(state, beerHash) {
      state.beerHashes.unshift(beerHash);
      // eslint-disable-next-line no-undef
      localStorage.setItem("beerHashes", JSON.stringify(state.beerHashes));
    },
    setBeerHashes(state, beerHashes) {
      state.beerHashes = beerHashes;
      // eslint-disable-next-line no-undef
      localStorage.setItem("beerHashes", JSON.stringify(state.beerHashes));
    },
    setBarState(state, barState) {
      state.barState = barState;
    },
    SOCKET_CONNECT(state, status) {
      state.socketConnected = true;
    },
    SOCKET_DISCONNECT(state, status) {
      state.socketConnected = false;
    },
    SOCKET_BAR_STATE(state, barState) {
      console.log("SOCKET_BAR_STATE", barState);
      if (Array.isArray(barState) && barState.length >= 0) {
        barState = barState[0];
      }
      if (barState.state) {
        state.barState = barState.state;
      }
    }
  },
  actions: {
    async updateBalance({ commit, state, getters }) {
      const pubKey = state.account.pub;
      if (pubKey) {
        (await getters.ae)
          .balance(pubKey)
          .then(balance => {
            // logs current balance of "A_PUB_ADDRESS"
            console.log("balance", balance);
            commit("setBalance", balance);
            return balance;
          })
          .catch(e => {
            // logs error
            console.log(e);
          });
      }
      return 0;
    },
    async initAe({ commit, state, getters }) {
      commit(
        "setAe",
        Ae({
          url: "https://sdk-testnet.aepps.com",
          internalUrl: "https://sdk-testnet.aepps.com",
          networkId: "aet_ua" // or any other networkId your client should connect to
          // accounts: [
          //   MemoryAccount({ keypair: { secretKey: 'A_PRIV_KEY', publicKey: 'A_PUB_ADDRESS' } })
          // ],
        })
      );
    }
  }
});

export default store;
