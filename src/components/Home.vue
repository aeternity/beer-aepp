<template>
  <div class="home">
    <div v-if="account && account.pub">
      <!-- <h1>Hello {{account.name}}</h1>
      <div class="balance">
        You currently have {{balance}} tokens
        <span v-if="balance <= beerPrice">You don't have enough funds for a bew beer. <router-link :to="{name: 'send'}">Maybe send your remaining tokens to a friend.</router-link></span>
      </div>
      <div class="beerList" v-if="beerHashes.length > 0">
        <h3>Your Beers</h3>
        <beer-list-entry v-for="beerHash in beerHashes" :key="beerHash" :beerHash="beerHash"></beer-list-entry>
      </div> -->
      <div class="logo"></div>
      <div class="svg">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
          <defs>
            <path id="a" d="M12 13.414l6.364 6.364 1.414-1.414L13.414 12l6.364-6.364-1.414-1.414L12 10.586 5.636 4.222 4.222 5.636 10.586 12l-6.364 6.364 1.414 1.414z"/>
          </defs>
          <use fill="#1E1E1E" fill-rule="evenodd" transform="translate(-4 -4)" xlink:href="#a"/>
        </svg>
      </div>
      <div class="title">
        <h1>
          re:publica
        </h1>
      </div>
      <div class="content">
        <p>
          æternity is not just a blockchain, it’s a vision for the future. It is a way of thinking. It’s a cause realized through technology.
        </p>
        <p>
          We want to start a decentralized
          digital revolution. But first we want
          to give you beer.
        </p>
      </div>
      <div class="action">
        <ae-button type='dramatic'>
          Give me tokens for beer!
        </ae-button>
      </div>
      <div id="water">
      </div>
    </div>
    <!-- <div v-else>
      <span>You are not logged in. Please visit this by opening the provided short url</span>
    </div> -->
  </div>
</template>

<script>
import BeerListEntry from './BeerListEntry.vue'
import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'Home',
  components: {
    BeerListEntry,
    AeButton
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    beerPrice () {
      return this.$store.state.beerPrice
    },
    beerHashes () {
      return this.$store.state.beerHashes
    }
  },
  data () {
    return {
    }
  },
  props: {
    query: {
      type: Object
    }
  },
  methods: {
  },
  async mounted () {
    var ocean = document.getElementById("water"),
    waveWidth = 10,
    waveCount = Math.floor(window.innerWidth/waveWidth),
    docFrag = document.createDocumentFragment();

for(var i = 0; i < waveCount; i++){
  var wave = document.createElement("div");
  wave.className += " wave";
  docFrag.appendChild(wave);
  wave.style.left = i * waveWidth + "px";
  wave.style.webkitAnimationDelay = (i/100) + "s";
}

ocean.appendChild(docFrag);
  }
}
</script>

<style scoped lang="scss">
.home {
  position: relative;
  height: 100vh;
}
.action {
  position: relative;
}
#water{
  position:absolute;
  width:100vw;
  height: 10%;
  background-image: -webkit-gradient(
  linear,
  left bottom,
  left top,
  color-stop(0, rgb(0,50,150)),
  color-stop(0.50, rgb(0,150,255))
  );
}
.wave{
  background:#a8e3ff;
  background:red;
  display:inline-block;
  height:60% !important;
  width:10vw;
  position:absolute;
  bottom: 0;
  left: 0;
  -webkit-animation-name:             dostuff; 
  -webkit-animation-duration:         3s; 
  -webkit-animation-iteration-count:  infinite;
  -webkit-transition-timing-function: ease-in-out;
  animation-name:             dostuff; 
  animation-duration:         3s; 
  animation-iteration-count:  infinite;
  transition-timing-function: ease-in-out;
  background: red;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 10px;
}
@-webkit-keyframes dostuff{
  0%{
    height:60%;
  }
  50%{ 
    height:40%;
  }
  100%{ 
    height:60%;
  }
}
@keyframes dostuff {
  0%{
    height:60%;
  }
  50%{ 
    height:40%;
  }
  100%{ 
    height:60%;
  }
}
</style>
