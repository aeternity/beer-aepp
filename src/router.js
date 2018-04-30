import Router from 'vue-router'
import BeerButton from './components/BeerButton.vue'
import AddressDisplay from './components/AddressDisplay.vue'
import Home from './components/Home.vue'
import Send from './components/Send.vue'
import BeerHash from './components/BeerHash.vue'
import More from './components/More.vue'
import Impressum from './components/Impressum.vue'
import About from './components/About.vue'
import Orders from './components/Orders.vue'
import Transactions from './components/Transactions.vue'

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
    },
    {
      path: '/more',
      name: 'more',
      component: More,
      beforeEnter (to, from, next) {
        if (!store.state.account || !store.state.account.priv) return next({ name: 'home' })
        next()
      }
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: Impressum
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]

  const router = new Router({
    mode: 'history',
    routes
  })

  router.beforeEach((to, from, next) => {
    // when account credentials are passed as query
    const {p: pub, k: priv, n: name} = to.query
    if (pub && priv && name) {
      const account = { pub, priv, name }
      // only if not logged in or account changed
      if (!store.state.account.pub || store.state.account.pub !== account.pub) {
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
