<template>
  <div class="container md:mx-auto w-4/5 my-6">
    <SfOrderHistory
      tabTitle="My venues' events"
      :orders="displayEvents"
      :tableHeaders='["Event ID","Check-in date","Venue","Total charge","Status"]'
      orderHistoryDescription="Check the details and status of your venues' events."
      :noOrdersDescription="noEventsText"
      noOrdersButtonText="View your venue list"
      @no-orders="showVenueListPage">
      <template #action-header>
        <SfTableHeader class="orders__element--right">
          <span class="">Action</span>
        </SfTableHeader>
      </template>
      <template #action-rows>
        <SfTableData class="orders__view orders__element--right">
          <!-- Yep, hardcoded value -->
          <SfLink :link="`mailto:${ events[0].owner }`" target="_blank">
            Booker: {{ events[0].owner }}
          </SfLink>
          <SfButton
            class="sf-button--text desktop-only"
            data-testid="view-details-button"
            @click="showVenueDetails($event)"
            >Venue details</SfButton
          >
        </SfTableData>
      </template>
    </SfOrderHistory>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify'
import { listBookings, listVenues } from '../graphql/queries'
import { SfOrderHistory, SfButton, SfLink } from '@storefront-ui/vue'
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"

export default {
  name: "EventList",
  components: {
    SfOrderHistory,
    SfButton,
    SfLink,
  },
  data() {
    return {
      events: [],
      currentUser: {},
      displayEvents: [],
      yourVenues: [],
      noEventsText: "LOADING...",
    }
  },
  created() {
    this.refreshList()
  },
  methods: {
    eventHappened(event) {
      return new Date(event?.checkOut || new Date().getTime() + 1000).getTime() < new Date().getTime()
    },
    async refreshList() {
      let vm = this
      try {
        vm.currentUser = await Auth.currentAuthenticatedUser()
        API.graphql({
          query: listBookings,
          // variables: {filter: {owner: {eq: vm.currentUser.username}}},
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })
        .then(async resBookings => {
          console.info(`Bookings listed`)
          console.info(resBookings)

          // ####
          const resVenues = await API.graphql({
            query: listVenues,
            // variables: {input: {filter: {_version: 1}}},
            variables: {filter: {owner: {eq: vm.currentUser.username}}},
          })
          console.info(`Venues listed`)
          console.info(resVenues)
          vm.yourVenues = resVenues.data.listVenues.items

          vm.events = resBookings.data.listBookings.items.filter(
            e => new Set(vm.yourVenues.map(v => v.id)).has(e.venueId)
          )
          for (let e of vm.events) {
            e.venueName = vm.yourVenues.filter(v => v.id == e.venueId)[0].name
          }
          console.log("events", vm.events)
          // ####

          vm.displayEvents = vm.events.sort((e1, e2) =>
            e1.checkIn < e2.checkIn ? 1 : -1
          ).map(e =>
            [
              `#${e.id.substring(0, 14)}`,
              `${new Date(e.checkIn).toLocaleString().split(',').join('ㅤㅤㅤㅤ')}`,
              e.venueName,
              `ㅤ${e.totalCharge} ${e.paymentCurrency}`,
              e.status == "CONFIRMED" && vm.eventHappened(e) ? "HAPPENED" : e.status,
            ],
          )
          console.log("displayEvents", vm.displayEvents)
          vm.noEventsText = "Your venues currently have no events."
        })
        .catch(error => {
          console.error("An error occurred when listing your venues' events")
          console.error(error)
        })
      }
      catch (err) {
        console.log(err)
        vm.noEventsText = ""
      }
    },
    showVenueDetails($event) {
      // super hacky here :(
      const eventIdShortened = $event.target.parentElement.parentElement.children[0].innerText.substring(1)
      const venueId = this.events.filter(e => e.id.startsWith(eventIdShortened)).map(e => e.venueId)[0]
      console.log("venueId", venueId)
      this.$router.push({
        name: 'venue-details',
        params: { venueId: venueId }
      })
    },
    showVenueListPage() {
      this.$router.push({ path: "/venues/yours" })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.sf-order-history {
  .orders {
    @include for-desktop {
      &__element {
        &--right {
          text-align: right;
        }
      }
    }
  }
}
</style>
