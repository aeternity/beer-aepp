import Router from 'vue-router'
import BeerButton from './components/BeerButton.vue'
import AddressDisplay from './components/AddressDisplay.vue'
import Home from './components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: route => ({ account: route.query })
  },
  {
    path: '/buy',
    name: 'buy-beer',
    component: BeerButton,
    props: route => ({ account: route.query })
  },
  {
    path: '/address',
    name: 'address',
    component: AddressDisplay,
    props: route => ({ account: route.query })
  }
]

let hasQueryParams = route => {
  return !!Object.keys(route.query).length
}

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({name: to.name, query: from.query})
  } else {
    next()
  }
})

export default router
