<template>
  <div class="container px-4 md:mx-auto w-full md:w-3/5 my-6">
  <div class="bg-gray-100 p-12">
    <p class="text-3xl text-gray-900 font-semibold mb-8 w-full" style="margin-top: 0px !important;">Booking details</p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">ID:</span>
      <span class="text-sm text-gray-600">
        {{ booking.id || "____________________________" }}
      </span>
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Date:</span>
      {{ booking.createdAt ? (new Date(booking.createdAt)).toLocaleString() : "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Status:</span>
      <span v-if="!booking.status" class="text-green-800 mt-4 w-full font-semibold">
        {{ "___________________" }}
      </span>
      <span v-else-if="booking.status == 'CONFIRMED' && !cancelingAllowed" class="text-black mt-4 w-full font-semibold">
        HAPPENED
      </span>
      <span v-else-if="booking.status == 'CONFIRMED'" class="text-green-700 mt-4 w-full font-semibold">
        {{ booking.status }}
      </span>
      <span v-else-if="booking.status == 'PENDING'" class="text-yellow-600 mt-4 w-full font-semibold">
        {{ booking.status }}
      </span>
      <span v-else-if="booking.status == 'CANCELED'" class="text-purple-700 mt-4 w-full font-semibold">
        {{ booking.status }}
      </span>
      <span v-else-if="booking.status == 'FAILED'" class="text-red-700 mt-4 w-full font-semibold">
        {{ booking.status }}
      </span>
      <span v-else>{{ booking.status }}</span>
    </p>
    <p class="text-xl text-gray-800 font-semibold my-8 pt-2 w-full">Personal info</p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">First name:</span>
      {{ currentUser.attributes.given_name || "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Last name:</span>
      {{ currentUser.attributes.family_name || "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Email:</span>
      {{ currentUser.attributes.email || "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Phone:</span>
      {{ currentUser.attributes.phone_number || "___________________" }}
    </p>
    <p class="text-xl text-gray-800 font-semibold my-8 pt-2 w-full">Event details</p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-40">Check-in time:</span>
      {{ booking.checkIn ? (new Date(booking.checkIn)).toLocaleString() : "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-40">Check-out time:</span>
      {{ booking.checkOut ? (new Date(booking.checkOut)).toLocaleString() : "___________________" }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-40">Number of guests:</span>
      {{ booking.guestCount || "___________________" }}
    </p>
    <p class="text-xl text-gray-800 font-semibold my-8 pt-2 w-full">Venue details</p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Name:</span> {{ booking.venue.name }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Address:</span> {{ booking.venue.address }}
    </p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Owner's email:</span>&nbsp;
      <SfLink :link="`mailto:${ booking.venue.owner }`" target="_blank">{{ booking.venue.owner }}</SfLink>
    </p>
    <p class="text-xl text-gray-800 font-semibold my-8 pt-2 w-full">Payment details</p>
    <p class="text-md text-gray-800 mt-4 w-full">
      <span class="inline-block w-28">Total charge:</span> {{ booking.totalCharge }} {{ booking.paymentCurrency }}
    </p>
    <div class="mt-12">
      <p class="text-sm text-gray-500 w-full">
        You can only cancel a booking before the event happens.
      </p>
      <p class="text-sm text-gray-500 pb-4 w-full">
        You can only leave a review once after the event happens.
      </p>
      <div class="form__action">
        <div class="mr-4 mb-4">
          <SfButton
            class="sf-button mr-4 mb-4 color-secondary"
            type="submit"
            @click.prevent="openCancelPopup"
            :disabled="!cancelingAllowed || (booking.status != 'CONFIRMED' && booking.status != 'PENDING')">
            Cancel Booking
          </SfButton>
        </div>
        <div class="mr-4 mb-4">
          <SfButton
            type="submit"
            @click.prevent="openReviewPopup"
            :disabled="!eventHappened || reviewGiven">
            Add Review
          </SfButton>
        </div>
      </div>
    </div>
  </div>
  <SfModal title="Add Review"
    :visible="modalReviewShowed" cross overlay :persistent="false"
    @close="modalReviewShowed = false">
    <div class="flex flex-row items-center justify-items-center">
      <div class="inline-block my-4">
        <SfIcon
          icon="info"
          size="lg"
          color="green"
          viewBox="0 0 24 24"
          :coverage="1"
        />
      </div>
      <p class="text-lg font-bold inline-block px-1">Leave a rating and a comment about the venue.</p>
    </div>
    <p>
      Rating<br>
      <SfRadio
        v-for="r in ['1','2','3','4','5']"
        :key="r"
        v-model="review.rating"
        :label="r"
        :value="r"
        name="Rating"
        class="inline-block"
      />
      <br>
      <span class="sf-input__error-message">
        <transition name="sf-fade">
          <span :class="{ 'display-none': review.rating === undefined || review.rating > 0 }">Please choose your rating</span>
        </transition>
      </span>
    </p>
    <p>
      <SfInput
        v-model="review.comment"
        label="Comment"
        name="Comment"
        class="form__element"
        required
        :valid="review.commentBlur || !!review.comment"
        error-message="Please type in your review comment"
        @blur="review.commentBlur = false"
      />
    </p>
    <div class="flex flex-row justify-center pt-4 mb-4">
      <SfButton
        class="px-4 py-2 mx-2 color-primary"
        @click.prevent="addReview">
        Submit
      </SfButton>
      <SfButton
        class="px-4 py-2 mx-2 color-secondary"
        @click.prevent="modalReviewShowed = false">
        Cancel
      </SfButton>
    </div>
  </SfModal>
  <SfModal title="Cancel Booking"
    :visible="modalCancelShowed" cross overlay :persistent="false"
    @close="modalCancelShowed = false">
    <div class="flex flex-row items-center justify-items-center">
      <div class="inline-block my-4">
        <SfIcon
          icon="error"
          size="lg"
          color="#ef4444"
          viewBox="0 0 24 24"
          :coverage="1"
        />
      </div>
      <p class="text-lg font-bold inline-block px-1">You are about to cancel this booking.</p>
    </div>
    <p>
      The action is irreversible.
      Also, check our refund policy for more info.
      Are you sure you want to proceed?
    </p>
    <div class="flex flex-row justify-center pt-4 mb-4">
      <SfButton
        class="px-4 py-2 mx-2 color-danger"
        @click.prevent="cancelBooking">
        Confirm
      </SfButton>
      <SfButton
        class="px-4 py-2 mx-2 color-secondary"
        @click.prevent="modalCancelShowed = false">
        Cancel
      </SfButton>
    </div>
  </SfModal>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify'
import { getBooking, getVenue } from '../graphql/queries'
import { createReview, updateBooking } from '../graphql/mutations'
import { SfButton, SfLink, SfModal, SfIcon, SfInput, SfRadio } from '@storefront-ui/vue'

export default {
  name: "getBooking",
  components: {
    SfButton,
    SfLink,
    SfModal,
    SfIcon,
    SfInput,
    SfRadio,
  },
  props: {
    bookingId: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      review: {
        rating: undefined,
        comment: "",
        commentBlur: true,
      },
      booking: {
        venue: {
          name: "___________________",
          address: "___________________",
          owner: "___________________",
        }
      },
      currentUser: {
        attributes: {
          given_name: "___________________",
          family_name: "___________________",
          email: "___________________",
          phone_number: "___________________",
        }
      },
      modalCancelShowed: false,
      modalReviewShowed: false,
    }
  },
  created() {
    this.retrieveBooking()
  },
  computed: {
    cancelingAllowed() {
      return new Date(this.booking?.checkIn || null).getTime() > new Date().getTime()
    },
    eventHappened() {
      return new Date(this.booking?.checkOut || new Date().getTime() + 1000).getTime() < new Date().getTime()
    },
    reviewGiven() {
      return this.booking.venue.reviews?.items?.some(r => r.owner == this.currentUser.attributes?.email)
    },
  },
  methods: {
    async retrieveBooking() {
      let vm = this
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        console.log(currentUser)
        this.currentUser = currentUser
      }
      catch (err) {
        console.log(err)
      }
      API.graphql({
        query: getBooking,
        variables: {id: this.bookingId},
      })
      .then(async res => {
        console.info(`Booking retrieved`)
        console.info(res)
        const bres = res.data.getBooking
        console.log(bres)
        const vres = await API.graphql({
          query: getVenue,
          variables: {id: bres.venueId},
        })
        console.log(vres)
        vm.booking = {
          ...bres,
          venue: vres.data.getVenue
        }
      })
      .catch(error => {
        console.error("An error occurred when retrieving your booking")
        console.error(error)
      })
    },
    openReviewPopup() {
      this.modalReviewShowed = true
    },
    openCancelPopup() {
      this.modalCancelShowed = true
    },
    cancelBooking() {
      API.graphql({
        query: updateBooking,
        variables: {input: {
          id: this.bookingId,
          status: "CANCELED",
        }},
      })
      .then(result => {
        console.info(`Booking updated --> cancelled`)
        console.info(result)
        this.booking = {
          ...this.booking,
          ...result.data.updateBooking
        }
        this.modalCancelShowed = false
      })
      .catch(error => {
        console.error("An error occurred when updating booking")
        // this.$ref.cancelBookingError set msg
        console.error(error)
      })
    },
    addReview() {
      if (this.review.rating === undefined) {
        this.review.rating = 0
        return
      }
      if (this.review.rating && !!this.review.comment) {
        // check and allow update/delete review in the same modal?
        const inputData = {
          venueReviewsId: this.booking.venueId,
          // user: this.currentUser.sub,
          rating: parseInt(this.review.rating),
          comment: this.review.comment,
          user: this.currentUser.username,
          userName: `${this.currentUser.attributes.given_name} ${this.currentUser.attributes.family_name}`,
          bookingId: this.bookingId,
        }
        console.log(inputData)
        API.graphql({
          query: createReview,
          variables: {input: inputData},
        })
        .then(result => {
          console.info(`Review created`)
          console.info(result)
          this.booking.venue.reviews.items.push({
            owner: inputData.user,
            rating: parseInt(inputData.rating),
            comment: inputData.comment,
            user: inputData.user,
            userName: inputData.userName,
            bookingId: inputData.bookingId,
          })
          this.modalReviewShowed = false
        })
        .catch(error => {
          console.error("An error occurred when creating review")
          // this.$ref.addReviewError set msg
          console.error(error)
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  &__element {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 100%;
    &--half {
      flex: 1 1 50%;
      &-even {
        padding: 0 0 0 var(--spacer-xl);
      }
    }
    &--range {
      margin: var(--spacer-xl) var(--spacer-base) var(--spacer-2xl);
    }
  }
  &__action {
    flex: 0 0 100%;
    display: flex;
  }
}
</style>
