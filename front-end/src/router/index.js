import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import ThisDay from '../views/ThisDay.vue'
// import People from '../views/People.vue'
import EditPeople from '../views/EditPeople.vue'
import PeopleDashboard from '../views/PeopleDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    props: route => ({ eventId: route.query.eventId})
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue')
  },
  {
    path: '/thisDay',
    name: 'ThisDay',
    component: ThisDay,
    props: route => ({ dayId: route.query.dayId})

  },
  {
    path: '/peopleDashboard',
    name: 'PeopleDashboard',
    component: PeopleDashboard,
    //props: route => ({ personName: route.query.person.name})

  },
  {
    path: '/editPeople',
    name: 'EditPeople',
    component: EditPeople,
    props: route => ({ personId: route.query.personId})

    //props: route => ({ personName: route.query.person.name})

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
