import Router from 'vue-router'
import BeerButton from './components/BeerButton.vue'
import AddressDisplay from './components/AddressDisplay.vue'
import Home from './components/Home.vue'
import Send from './components/Send.vue'
import BeerHash from './components/BeerHash.vue'

export default (store) => {
  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: route => ({ query: route.query })
    },
    {
      path: '/buy',
      name: 'buy-beer',
      component: BeerButton,
      beforeEnter (to, from, next) {
        if (!store.state.account || !store.state.account.priv) return next({ name: 'home' })
        next()
      }
    },
    {
      path: '/address',
      name: 'address',
      component: AddressDisplay,
      beforeEnter (to, from, next) {
        if (!store.state.account || !store.state.account.priv) return next({ name: 'home' })
        next()
      }
    },
    {
      path: '/send',
      name: 'send',
      component: Send,
      beforeEnter (to, from, next) {
        if (!store.state.account || !store.state.account.priv) return next({ name: 'home' })
        next()
      }
    },
    {
      path: '/beer/:beerHash',
      name: 'beer',
      component: BeerHash,
      beforeEnter (to, from, next) {
        if (!store.state.account || !store.state.account.priv) return next({ name: 'home' })
        next()
      }
    }
  ]

  const router = new Router({
    mode: 'history',
    routes
  })

  router.beforeEach((to, from, next) => {
    // when account credentials are passed as query
    if (to.query && to.query.k && to.query.p && to.query.n) {
      const account = {
        pub: to.query.p || null,
        priv: to.query.k || null,
        name: to.query.n || null
      }
      // only if not logged in or account changed
      if (!store.state.account.pub || store.state.account.pub !== account.pub) {
        console.log('account changed')
        // set account in store
        store.commit('setAccount', account)
        // remove existing beers
        store.commit('setBeerHashes', [])
      }
      // remove query params and keep on routing
      next({name: to.name, query: null})
    } else {
      next()
    }
  })
  return router
}
