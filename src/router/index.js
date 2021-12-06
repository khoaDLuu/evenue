import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home"
import Venues from "../views/Venues"
import Auth from "../views/Auth"
import VenueMngmt from "../views/VenueMngmt"
import VenueList from "../views/VenueList"
import VenueEdit from "../views/VenueEdit"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/venues/search',
    name: 'Venues',
    component: Venues
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/venue-mngmt',
    name: 'Venue Management',
    component: VenueMngmt
  },
  {
    path: '/venues/yours',
    name: 'Your Venues',
    component: VenueList
  },
  {
    path: '/venues/new',
    name: 'Add Venue',
    component: VenueEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
