import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  methods: {
    dateFormated(date) {
      var now = new Date(date),
      dd = this.checkZero(now.getDate()),
      mm = this.checkZero(now.getMonth() + 1),
      yyyy = this.checkZero(now.getFullYear()),
      hh = this.checkZero(now.getHours()),
      mi = this.checkZero(now.getMinutes()),
      ss = this.checkZero(now.getSeconds())
      return dd + "/" + mm + "/" + yyyy + " " + hh + ":" + mi + ":" + ss
    },
    checkZero(number){
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    }
  },
  render: h => h(App)
}).$mount('#app')
