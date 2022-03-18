import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue"
import Venues from "../views/Venues.vue"
import Auth from "../views/Auth.vue"
import VenueList from "../views/VenueList.vue"
import VenueEdit from "../views/VenueEdit.vue"
import VenueDetails from "../views/VenueDetails.vue"
import Booking from "../views/Booking.vue"
import BookingList from "../views/BookingList.vue"
import Account from "../views/Account.vue"
import NotFound from "../views/NotFound.vue"
import BookingDetails from "../views/BookingDetails.vue"
import Favorites from "../views/Favorites.vue"
import Events from "../views/Events.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/venues/search',
    name: 'venues',
    component: Venues
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
    path: '/venues/:venueId(\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b)',
    name: 'venue-details',
    component: VenueDetails,
    props: true,
  },
  {
    path: '/bookings/yours/:bookingId(\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b)',
    name: 'booking-details',
    component: BookingDetails,
    props: true,
  },
  {
    path: '/bookings/yours',
    name: 'your-bookings',
    component: BookingList,
    props: true,
  },
  {
    path: '/bookings/new',
    name: 'new-booking',
    component: Booking,
    props: true,
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    props: true,
  },
  {
    path: '/favorites',
    name: 'favorite-venues',
    component: Favorites,
    props: true,
  },
  {
    path: '/users/:userId(\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b)',
    name: 'user-profile',
    component: Account,
    props: true,
  },
  {
    path: '/profile',
    name: 'your-profile',
    component: Account,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'not-found',
    meta: {
      requiresAuth: false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
