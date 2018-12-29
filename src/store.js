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
    user: {},
    toggles: {
      'icons': [
        { name: "A", active: false },
        { name: "B", active: false },
        { name: "C", active: false },
      ],
      'o-manpower-h': [
        { name: "Housing A", value: "a", active: false},
        { name: "Housing B", value: "b", active: false},
        { name: "Housing C", value: "c", active: false},
        { name: "Housing D", value: "d", active: false},
      ],
      'o-map-l': [
        { name: "Level 1", value: "1", active: false},
        { name: "Level 2", value: "2", active: false},
        { name: "Level 3", value: "3", active: false},
        { name: "Level 4", value: "4", active: false},
        { name: "Level 5", value: "5", active: false}
      ],
      'o-map-h': [
        { name: "HU A", value: "a", active: false},
        { name: "HU B", value: "b", active: false},
        { name: "HU C", value: "c", active: false},
        { name: "HU D", value: "d", active: false},
      ],
      'o-map-t': [
        { name: "Type A", value: "a", active: false},
        { name: "Type B", value: "b", active: false},
        { name: "Type C", value: "c", active: false},
      ],
      'o-map-a': [
        { name: "Activity A", value: "a", active: false},
        { name: "Activity B", value: "b", active: false}
      ],
      'o-incident-d': [
        { name: "Date/time 1", value: "a", active: false},
        { name: "Date/time 2", value: "b", active: false},
        { name: "Date/time 3", value: "c", active: false},
        { name: "Date/time 4", value: "d", active: false},
      ],
      'o-incident-t': [
        { name: "Type A", value: "a", active: false},
        { name: "Type B", value: "b", active: false},
        { name: "Type C", value: "c", active: false},
        { name: "Type D", value: "d", active: false},
      ],
      'o-incident-h': [
        { name: "Housing A", value: "a", active: false},
        { name: "Housing B", value: "b", active: false},
        { name: "Housing C", value: "c", active: false},
        { name: "Housing D", value: "d", active: false},
      ],
      'o-victim-c': [
        { name: "Class A", value: "a", active: false},
        { name: "Class B", value: "b", active: false},
        { name: "Class C", value: "c", active: false},
        { name: "Class D", value: "d", active: false},
      ],
      'o-victim-l': [
        { name: "Location A", value: "a", active: false},
        { name: "Location B", value: "b", active: false},
        { name: "Location C", value: "c", active: false},
        { name: "Location D", value: "d", active: false},
      ],
      'o-victim-t': [
        { name: "Type A", value: "a", active: false},
        { name: "Type B", value: "b", active: false},
        { name: "Type C", value: "c", active: false},
        { name: "Type D", value: "d", active: false},
      ],
      'o-muster-t': [
        { name: "Type A", value: "a", active: false},
        { name: "Type B", value: "b", active: false},
        { name: "Type C", value: "c", active: false},
        { name: "Type D", value: "d", active: false},
      ],
      'o-muster-h': [
        { name: "Housing A", value: "a", active: false},
        { name: "Housing B", value: "b", active: false},
        { name: "Housing C", value: "c", active: false},
        { name: "Housing D", value: "d", active: false},
      ],
      'o-support-sp': [
        { name: "Support A", value: "a", active: false},
        { name: "Support B", value: "b", active: false},
        { name: "Support C", value: "c", active: false},
        { name: "Support D", value: "d", active: false},
      ],
      'o-support-st': [
        { name: "Activated", value: "a", active: false},
        { name: "Denied", value: "b", active: false},
        { name: "Pending", value: "c", active: false},
      ],
      'o-support-h': [
        { name: "Housing A", value: "a", active: false},
        { name: "Housing B", value: "b", active: false},
        { name: "Housing C", value: "c", active: false},
        { name: "Housing D", value: "d", active: false},
      ],
      'housing': [
        { name: "Class A", value: "a", active: false},
        { name: "Class B", value: "b", active: false},
        { name: "Class C", value: "c", active: false},
        { name: "Class D", value: "d", active: false}
      ],
      'manpower-status': [
        { name: "Status A", value: "a", active: false},
        { name: "Status B", value: "b", active: false},
        { name: "Status C", value: "c", active: false},
        { name: "Status D", value: "d", active: false}
      ],
      'manpower-skill': [
        { name: "Skill A", value: "a", active: false},
        { name: "Status B", value: "b", active: false},
        { name: "Status C", value: "c", active: false},
        { name: "Skill D", value: "d", active: false}
      ],
      'manpower-unit': [
        { name: "Unit A", value: "a", active: false},
        { name: "Unit B", value: "b", active: false},
        { name: "Unit C", value: "c", active: false},
        { name: "Unit D", value: "d", active: false}
      ],
      'manpower-housing': [
        { name: "Housing A", value: "a", active: false},
        { name: "Housing B", value: "b", active: false},
        { name: "Housing C", value: "c", active: false},
        { name: "Housing D", value: "d", active: false}
      ],
    }
  },
  getters: {
    activeFilter: (state) => (name) => {
      return state.toggles[name].filter(btn => btn.active)
    }
  },
  mutations: {
    showNotify (state, data) {
      state.notify.type = data.type
      state.notify.mess = data.mess
      state.notify.show = true
    },
    activeToggle (state, data) {
      var btn = state.toggles[data.type][data.index]
      btn.active = !btn.active
      var result = state.toggles[data.type].filter(btn => btn.active)
      console.log(result)
    },
    activeSingleToggle (state, data) {
      var result = state.toggles[data.type]
      result.forEach(el => {
        el.active = false
      })
      var btn = result[data.index]
      btn.active = true
      console.log(result)
    },
    allToggle (state, type) {
      var result = state.toggles[type]
      result.forEach(el => {
        el.active = true
      })
      console.log(result)
    }
  },
  actions: {

  }
})
