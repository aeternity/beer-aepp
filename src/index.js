import './custom.scss'
import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import BeerButton from './components/BeerButton.vue'

const routes = [
  { path: '/', component: BeerButton }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false
Vue.use(VueRouter)
console.info('about to render Vue App')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
