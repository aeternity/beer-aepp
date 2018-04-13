import Router from 'vue-router'
import BeerButton from './components/BeerButton.vue'
import AddressDisplay from './components/AddressDisplay.vue'
import Home from './components/Home.vue'

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
    }
  ]

  const router = new Router({routes})

  router.beforeEach((to, from, next) => {
    // when account credentials are passed as query
    if (to.query && to.query.k) {
      const account = {
        pub: to.query.p || null,
        priv: to.query.k || null,
        domain: to.query.n || null
      }
      // set account in store
      store.commit('setAccount', account)
      // remove query params and keep on routing
      next({name: to.name, query: null})
    } else {
      next()
    }
  })
  return router
}
