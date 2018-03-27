<template>
  <div class="hello">
    <h1>Hello and {{ msg }}</h1>
    Here's a Æ component:
    <!-- <ae-button type="boring" @click="onClick('wii', 'woo')">click me, and check the console</ae-button> -->
  </div>
</template>

<script>
import * as R from 'ramda'
import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'BeerButton',
  components: {
    AeButton
  },
  props: {
    msg: String
  },
  methods: {
    onClick (...strings) {
      const str = R.join(' ', ['Hello', 'webpack', ...strings])
      console.log(str);
    }
  },
  mounted () {
    console.info('Component Helloworld mounte');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '../custom.scss';
.btn--ready{
  background: green;
}
.btn--idle{
  background: orange;
}
.btn--busy{
  background: red;
}
</style>
