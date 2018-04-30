<template>
  <div class="about">
    <div class="about-top shell">
      <h1 class="screen-title">
        About æternity
      </h1>
      <p class="screen-subtitle">
        æternity is not just a blockchain, it’s a vision for the future. It is a way of thinking. It’s a cause realized through technology.
      </p>
      <p class="screen-subtitle">
        We want to start a decentralized digital revolution. But first we want to give you beer.
      </p>
    </div>
    <div class="more-bottom">
      <div class="list">
        <div class="list-item">
          <div class="shell">
            <div class="list-item-el">
              <h5>Official Website</h5>
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
              <h5>Aepps Showcase</h5>
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
              <h5>Social Links</h5>
            </div>
            <div class="list-item-el" style="width:100%;text-align:right;">
              <a href="https://twitter.com/aeternity">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.facebook.com/aeternityproject/">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://telegram.me/aeternity">
                <i class="fab fa-telegram-plane"></i>
              </a>
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
  name: 'About',
  components: {
    AeIcon
  },
  data () {
    return {

    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
<style lang='scss'>
  .fab {
    color:#f7296e;
    font-size:17px;
    margin: 10px;
  }
  .about .ae-icon {
    transform: rotate(-40deg);
  }
  .list-item:last-child {
    border-bottom:0;
  }
</style>
