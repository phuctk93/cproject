import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      children: [
        {
          path: '/overview',
          name: 'overview',
          component: () => import(/* webpackChunkName: "overview" */ './views/Overview.vue')
        },
        {
          path: '/manpower',
          name: 'manpower',
          component: () => import(/* webpackChunkName: "manpower" */ './views/Manpower.vue')
        },
        {
          path: '/housing/:id',
          name: 'housing',
          component: () => import(/* webpackChunkName: "housing" */ './views/Housing.vue'),
          props: true
        },
        {
          path: '/incident/:id',
          name: 'incident',
          component: () => import(/* webpackChunkName: "incident" */ './views/IncidentIcon.vue'),
          props: true
        },
        {
          path: '/victim',
          name: 'victim',
          component: () => import(/* webpackChunkName: "victim" */ './views/Victim.vue')
        },
        {
          path: '/alert',
          name: 'alert',
          component: () => import(/* webpackChunkName: "alert" */ './views/Alert.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    }
  ]
})
