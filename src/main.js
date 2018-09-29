// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Home from './Home.vue'
import VueRouter from 'vue-router'
import configRouter from './router/routers'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: configRouter
})

/* eslint-disable no-new */
new Vue({
  router,
  // el: '#app',
  render: h => h(App)
}).$mount('#app')
