import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notify: {
      show: false,
      type: "success",
      mess: ""
    },
    host: "http://localhost",
    token: "",
    user: {}
  },
  mutations: {
    showNotify (state, data) {
      state.notify.type = data.type
      state.notify.mess = data.mess
      state.notify.show = true
    }
  },
  actions: {

  }
})
