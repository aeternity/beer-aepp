<template>
  <div class="home shell">
    <div v-if="account && account.pub">
      <div class="logo">
        <Logo></Logo>
      </div>
      <div class="cross">
        <p class="center">
          +
        </p>
      </div>
      <div class="title">
        <h1>
          re:publica
        </h1>
      </div>
      <div class="intro-text">
        <p style="padding:2vw;">
          æternity is not just a blockchain, it’s a vision for the future. It is a way of thinking. It’s a cause realized through technology.
        </p>
        <p style="padding:2vw;">
          We want to start a decentralized
          digital revolution. But first we want
          to give you beer.
        </p>
      </div>
      <div class="action">
        <router-link to="buy">
          <ae-button type='dramatic'>
            Give me tokens for beer!
          </ae-button>
        </router-link>
      </div>
      <div id="water">
        <div class="wave">
          <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop stop-color="#57BBC1" stop-opacity=".25" offset="0%"/>
                <stop stop-color="#015871" offset="100%"/>
              </linearGradient>
            </defs>
            <path fill="#f7296e" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/>
          </svg>
        </div>
        <div class="wave">
          <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                <stop stop-color="#57BBC1" stop-opacity=".25" offset="0%"/>
                <stop stop-color="#015871" offset="100%"/>
              </linearGradient>
            </defs>
            <path fill="#f7296e" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-else>
      <span>You are not logged in. Please visit this by opening the provided short url</span>
    </div>
  </div>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components'
import Logo from './Logo.vue'

export default {
  name: 'Home',
  components: {
    AeButton,
    Logo
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
  }
}
</script>

<style scoped lang="scss">
.home > div {
  padding-top:7vh;
}
h1 {
  text-align:center;
}
.logo {
  margin-top: 5vh;
}
.action {
  position: relative;
}
.intro-text {
  font-size: 18px;
  line-height: 28px;
}
#water {
  height: 30vh;
  width:100%;
  position:fixed;
  bottom:-4vh;
  left:0;
  background: #015871;
  background: white;
  overflow-x: hidden;
  z-index: -1;
}

.wave {
  position: absolute;
  bottom:0;
  left: 0;
  height: 100%;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  animation-iteration-count:infinite;
  transform: translate3d(0, 0, 0);
}
.wave:nth-of-type(2) {
  bottom:0;
  left: 1600px;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  opacity: 1;
}
.cross p {
  font-size: 37px;
  transform: translate3d;
  transform: rotateZ(45deg);
  line-height: 0;
  margin:15px 0;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%, 100% {
    transform: translate3d(0,-25px,0);
  }
  50% {
    transform: translate3d(0,5px,0);
  }
}
</style>
