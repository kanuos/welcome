import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Tasks from '../views/Tasks.vue'

Vue.use(VueRouter)

  const userInfo = JSON.parse(localStorage.getItem("welcome-data"));

  const routes = [
  {
    path: '/',
    name: 'Welcome',
    component:  Register
  },
  {
    path: '/home',
    name: 'Home',
    component:  userInfo ? Home : Register
  },
  {
    path : '/tasks',
    name : "Tasks",
    component: userInfo ? Tasks : Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
