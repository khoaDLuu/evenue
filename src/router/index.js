import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue"
import Venues from "../views/Venues.vue"
import Auth from "../views/Auth.vue"
import VenueMngmt from "../views/VenueMngmt.vue"
import VenueList from "../views/VenueList.vue"
import VenueEdit from "../views/VenueEdit.vue"
import VenueDetails from "../views/VenueDetails.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/venues/search',
    name: 'venues',
    component: Venues
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/venue-mngmt',
    name: 'venue-mngmt',
    component: VenueMngmt
  },
  {
    path: '/venues/yours',
    name: 'venues-yours',
    component: VenueList
  },
  {
    path: '/venues/edit',
    name: 'venues-edit',
    component: VenueEdit,
    props: true,
  },
  {
    path: '/venues/details',
    name: 'venue-details',
    component: VenueDetails,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
