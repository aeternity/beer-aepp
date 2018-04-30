<template>
  <div class="header" v-bind:class="{fixedPos: isOrdersActive}">
    <div class="header-container shell">
      <div class="back-arrow" 
      v-if="$route.path =='/about' || $route.path =='/orders' || $route.path =='/impressum'">
        <router-link to='/more'>
          <ae-icon name="arrow" rotate='180'/>
        </router-link>
      </div>
      <div class="item address-icon" style="display:flex; align-items:center;">
        <!-- <ae-identity-avatar :address='account.pub'></ae-identity-avatar> -->
        <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
        <span>
          {{account.name}}
        </span>
      </div>
      <div class="item account-ballance">
        <h4>
          {{balance}}
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import { AeIdentityAvatar, AeIcon } from '@aeternity/aepp-components'
export default {
  name: 'Header',
  components: {
    AeIdentityAvatar,
    AeIcon
  },
  data () {
    return {
      address: this.$store.state.account.pub
      // isOrdersActive: false
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    isOrdersActive() {
      // let morePath = $route.path
      if( this.$route.path =='/orders') {
         return true
      } else {
        return false
      }
    }
  },
  mounted: {
    
  }
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 3px #f0f0f0;
  position:relative;
  background: #fff;
}
.header-container {
  display: flex;
  align-items: center;
}
.header-container .item {
  display: flex;
  flex: 1;
}
.account-ballance h4{
  width: 100%;
  text-align: right;
}
.address-icon {
  text-transform:capitalize;
  font-weight:400;
  color: #1e1e1e;
  span {
    text-indent:10px;
    text-overflow: ellipsis;
    overflow:hidden;
  }
}
.avatar {
  width:30px !important;
  height:30px !important;
}
.fixedPos {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  background: #fff;
  z-index:3;
}
</style>
