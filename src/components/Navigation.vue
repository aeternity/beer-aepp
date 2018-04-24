<template>
  <div class="navigation">
    <div class="nav">
      <router-link to="buy" >order</router-link>
    </div>
    <div class="nav">
      <router-link to="send" >give</router-link>
    </div>
    <div class="nav">
      <router-link to="address" >recieve</router-link>
    </div>
    <div class="nav">
      <router-link to="more" >more</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Navigation',
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss">
.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0,.3);
}
.navigation .nav {
  display: flex;
  align-items: center;
  flex: 1;
  text-align: center;
  a {
    text-align: center;
    display: block;
    width:100%;
    color:#f7296e;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
    padding: 20px 0;
  }
  .router-link-exact-active {
    box-shadow: inset 0 -3px 0 0 #f7296e;
  }
}
</style>
