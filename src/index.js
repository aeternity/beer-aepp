import './custom.scss'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
console.info('about to render Vue App');
new Vue({
  render: h => h(App)
}).$mount('#app')
