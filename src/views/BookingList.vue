<template>
  <div class="container md:mx-auto w-4/5 my-6">
    <SfOrderHistory
      tabTitle="My bookings"
      :orders='displayBookings'
      :tableHeaders='["Booking ID","Booking date","Venue","Total charge","Status"]'
      orderHistoryDescription="Check the details and status of your bookings. Click View details for more information on each booking."
      noOrdersDescription="You currently have no booking history."
      noOrdersButtonText="Search and start booking"
      @no-orders="showVenueSearchPage">
      <template #action-header>
        <SfTableHeader class="orders__element--right">
          <span class="">Action</span>
        </SfTableHeader>
      </template>
      <template #action-rows>
        <SfTableData class="orders__view orders__element--right">
          <SfButton
            class="sf-button--text desktop-only"
            data-testid="view-details-button"
            @click="showBookingDetails($event)"
            >View details</SfButton
          >
        </SfTableData>
      </template>
    </SfOrderHistory>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify'
import { listBookings, getVenue } from '../graphql/queries'
import { SfOrderHistory, SfButton } from '@storefront-ui/vue'

export default {
  name: "BookingList",
  components: {
    SfOrderHistory,
    SfButton,
  },
  data() {
    return {
      bookings: [],
      currentUser: {},
      displayBookings: [],
    }
  },
  created() {
    this.refreshList()
  },
  methods: {
    async refreshList() {
      let vm = this
      vm.currentUser = await Auth.currentAuthenticatedUser();
      API.graphql({
        query: listBookings,
        // variables: {filter: {owner: {eq: vm.currentUser.username}}},
      })
      .then(async res => {
        console.info(`Bookings listed`)
        console.info(res)
        vm.bookings = res.data.listBookings.items.filter(b => b.owner = vm.currentUser.username)
        console.log(vm.bookings)

        // ####
        const allBookedVenueIds = new Set(vm.bookings.map(b => b.venueId))
        const allBookedVenues = await Promise.all(
          [...allBookedVenueIds].map(async vid => ({
            id: vid,
            name: (await API.graphql({ query: getVenue, variables: {id: vid}, })).data.getVenue.name
          }))
        )
        const allBookedVenueMapping = allBookedVenues.reduce(
          (m, v) => ({...m, [v.id]: v.name}),
          {}
        )
        for (let b of vm.bookings) {
          b.venueName = allBookedVenueMapping[b.venueId]
        }
        console.log(vm.displayBookings)
        // ####

        vm.displayBookings = vm.bookings.map(b =>
          [
            `#${b.id}`,
            `${new Date(b.createdAt).toLocaleString()}`,
            b.venueName,
            `${b.totalCharge} ${b.paymentCurrency}`,
            b.status
          ],
        )
      })
      .catch(error => {
        console.error("An error occurred when listing your bookings")
        console.error(error)
      })
    },
    showBookingDetails($event) {
      // super hacky here :(
      const bookingId = $event.target.parentElement.parentElement.firstChild.innerText.substring(1)
      console.log("bookingId", bookingId)
      this.$router.push({
        name: 'booking-details',
        params: { bookingId: bookingId }
      })
    },
    showVenueSearchPage() {
      this.$router.push({ path: "/venues/search" })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.sf-order-history {
  // .no-orders {
  //   &__title {
  //     margin: 0 0 var(--spacer-base) 0;
  //   }
  //   &__button {
  //     --button-width: 100%;
  //     margin: var(--spacer-2xl) 0 0 0;
  //     @include for-desktop {
  //       --button-width: 17.375rem;
  //     }
  //   }
  // }
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
