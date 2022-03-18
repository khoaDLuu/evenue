<template>
  <div>
  <div v-show="loading" class="h-40 w-full"></div>
  <SfLoader :loading="loading">

  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Contact details">
            <form class="form">
            <p class="text-xl text-gray-800 font-semibold my-8 w-full">Personal Details</p>
            <div v-if="!currentUser">
              <SfButton
                class="log-in__button color-secondary"
                data-testid="login-button"
                @click.prevent="openAuthModal">
                Log In
              </SfButton>
              <p class="text-sm text-gray-500 mt-4 w-full">Log in so your personal details can be shown in the fields below.</p>
            </div>
            <p v-else class="text-sm text-gray-500 mt-4 w-full">Your personal details are as below.</p>
            <SfInput
              v-model="personalDetails.firstName"
              label="First Name"
              name="firstName"
              class="form__element form__element--half"
              required
            />
            <SfInput
              v-model="personalDetails.lastName"
              label="Last Name"
              name="lastName"
              class="form__element form__element--half form__element--half-even"
              required
            />
            <SfInput
              v-model="personalDetails.email"
              label="Email"
              name="email"
              class="form__element form__element--half"
              required
            />
            <SfInput
              v-model="personalDetails.phone"
              label="Phone Number"
              name="phone"
              class="form__element form__element--half form__element--half-even"
            />
            </form>
            <!-- <SfPersonalDetails
              logInInfo="or fill the details below to sign up:"
              :value="personalDetails"
              :characteristics="perks"
              @input="personalDetails = $event"
              @log-in="() => {}">
              <template #log-in="slotProps">
                <div v-show="false">
                  <SfButton
                    class="log-in__button sf-button--full-width color-secondary"
                    data-testid="login-button"
                    @click="$emit('log-in')"
                    >{{ slotProps.buttonText }}</SfButton
                  >
                  <p class="log-in__info">{{ slotProps.logInInfo }}</p>
                </div>
              </template>
            </SfPersonalDetails> -->
          </SfStep>
          <SfStep name="Event details">
            <form class="form">
              <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Pick time slot</p>
              <vue-cal
                style="height: 350px"
                class="my-4"
                :disable-views="['years', 'year', 'month', 'day']"
                :events="bookedEvents"
                :min-date="minDate"
                hide-view-selector
                :time-from="7 * 60"
                :time-to="23 * 60"
                :snap-to-time="15"
                :editable-events="{ title: false, drag: false, resize: false, delete: true, create: true }"
                @event-drag-create="onEventCreate"
                @event-delete="onEventDelete">
              </vue-cal>
              <SfInput
                :value="booking.checkIn ? booking.checkIn.toLocaleString() : null"
                label="Check-in time"
                name="checkIn"
                class="form__element form__element--half"
                required
                :valid="booking.checkInBlur || !!booking.checkIn"
                error-message="Select the time slot above"
                @blur="booking.checkInBlur = false"
              />
              <SfInput
                :value="booking.checkOut ? booking.checkOut.toLocaleString() : null"
                label="Check-out time"
                name="checkOut"
                class="form__element form__element--half"
                required
                :valid="booking.checkOutBlur || !!booking.checkOut"
                error-message="Select the time slot above"
                @blur="booking.checkOutBlur = false"
              />
              <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Number of guests</p>
              <SfInput
                v-model="booking.guestCount"
                label="Number of guests"
                type="number"
                name="guestCount"
                class="form__element"
                required
                :valid="booking.guestCountBlur || booking.guestCount > 0 /* && booking.guestCount < recommended */"
                error-message="Type in a valid number of guests"
                @blur="booking.guestCountBlur = false"
              />
              <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Extras</p>
              <SfComponentSelect
                v-model="booking.extraInput.value"
                label="Extra"
                class="
                  form__element
                  form__element--half
                  form__select
                  sf-component-select--underlined
                "
                :valid="booking.extraInput.valueBlur || !!booking.extraInput.value"
                error-message="Please select an extra."
                @blur="booking.extraInput.valueBlur = false"
              >
                <SfComponentSelectOption
                  v-for="extraOption in booking.extraOptions"
                  :key="extraOption.name"
                  :value="`${extraOption.name} -- ${extraOption.type} -- ${extraOption.price}`"
                >
                  {{ extraOption.name }} -- {{ extraOption.type }} -- {{ extraOption.price }}$
                </SfComponentSelectOption>
              </SfComponentSelect>
              <SfInput
                v-model="booking.extraInput.number"
                label="Extra number"
                name="extraInputNumber"
                type="number"
                class="
                  form__element
                  form__element--half
                  form__element--half-even
                "
                :valid="booking.extraInput.numberBlur || booking.extraInput.number > 0"
                error-message="Please select the number for the extra."
                @blur="booking.extraInput.numberBlur = false"
                @keydown.enter.prevent="addExtra(booking.extraInput.id, $event)"
              />
              <SfAddressPicker
                :selected="`${booking.extraInput.id}`"
                class="
                  w-full grid gap-4 grid-cols-1
                  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8"
                @change="editExtra">
                <SfAddress
                  v-for="extraItem in booking.extras"
                  :key="extraItem.id"
                  :name="extraItem.id"
                  class="w-full">
                  <span class="font-medium text-sfui-primary-green">{{ extraItem.extra.name }}</span>
                  <div class="sf-property--without-suffix sf-property">
                    <span class="sf-property__name">{{ extraItem.extra.type }}</span>
                  </div>
                  <span class="sf-price__regular">${{ extraItem.extra.price }}</span>
                  <hr class="w-1/2 mt-1">
                  <div class="sf-property--without-suffix sf-property">
                    <span class="sf-property__name font-bold">x{{ extraItem.number }}</span>
                  </div>
                  <template #icon>
                    <div
                      class="sf-address__icon-container hover:bg-green-400"
                      @click.prevent="removeExtra(extraItem.id)">
                      <SfIcon icon="cross" class="sf-address__icon" />
                    </div>
                  </template>
                </SfAddress>
              </SfAddressPicker>
              <!-- <button ref="eventFormBtn" type="submit" @click.prevent="" class="hidden" /> -->
            </form>
          </SfStep>
          <SfStep name="Payment">
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Card information</p>
            <SfSkeleton v-show="!card.rendered" type="input" />
            <stripe-element-card
              ref="stripecard"
              pk="pk_test_51K0pH2BfgvDJN0OCD0nBlxK9LG5zkOL5gqRuv0UiDr0Y2sDDfBlg8iCVXJC1KWCtslwUlXgu1hPSitrTMgMjOAv300mpjlzZA9"
              @token="tokenCreated"
              @element-ready="card.rendered = true"
            />
            <SfButton
              class="color-secondary my-4 p-2"
              data-testid="next-button"
              @click="submit"
              >Verify card
            </SfButton>
            <p v-if="card.valid === true" class="text-sm text-green-500 mt-4 w-full">
              Valid card info. You can proceed to confirm and pay for the booking.
            </p>
            <p v-else-if="card.valid === false" class="text-sm text-red-500 mt-4 w-full">
              Invalid card info. Please check the input again.
            </p>
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside">
        <transition name="sf-fade">
          <SfOrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            class="checkout__aside-order"
            :order="getOrder"
            order-title="Booking Review"
            :order-title-level="3"
            :properties-names="[
              'Extras',
              'Extra total',
              'Venue/space',
              'Total',
            ]"
            :characteristics="characteristics"
          />
          <SfOrderReview
            v-else
            key="order-review"
            class="checkout__aside-order"
            :order="getOrder"
            review-title="Booking Review"
            :review-title-level="3"
            button-text="Edit"
            :characteristics="characteristics"
            @click:edit="currentStep = $event"
          />
        </transition>
      </div>
    </div>
    <div class="actions">
      <SfButton
        class="sf-button--full-width actions__button"
        data-testid="next-button"
        @click="moveNext"
        >{{ steps[currentStep] }}</SfButton
      >
      <SfButton
        class="
          sf-button--full-width sf-button--underlined
          actions__button
          smartphone-only
        "
        @click="currentStep--"
        >Go back</SfButton
      >
      <p class="text-sm text-red-700 text-left">{{ valErrorMsg }}</p>
    </div>
  </div>

  </SfLoader>
  </div>
</template>

<script>
import {
  SfSteps,
  SfButton,
  // SfPersonalDetails,
  SfOrderSummary,
  SfOrderReview,
  SfComponentSelect,
  SfAddressPicker,
  SfInput,
  SfIcon,
  SfSkeleton,
  SfLoader,
} from "@storefront-ui/vue"
import VueCal from 'vue-cal'
import 'vue-cal/dist/drag-and-drop.js'
import 'vue-cal/dist/vuecal.css'
import { StripeElementCard } from '@vue-stripe/vue-stripe'
import { v4 as uuidv4 } from "uuid"
import { Auth, API, Hub } from "aws-amplify"
import { getVenue, listBookings } from "../graphql/queries"
import { processBooking } from '../graphql/mutations'
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"

let cslog = console.log

export default {
  name: "Checkout",
  components: {
    SfSteps,
    // SfPersonalDetails,
    SfOrderSummary,
    SfOrderReview,
    SfButton,
    SfInput,
    SfComponentSelect,
    SfAddressPicker,
    SfIcon,
    SfSkeleton,
    SfLoader,
    VueCal,
    StripeElementCard,
  },
  data() {
    return {
      loading: false,
      card: {
        valid: undefined,
        rendered: false,
        token: "",
      },
      currentStep: 0,
      steps: [
        "Go to Event details",
        "Go to Payment",
        "Confirm and pay",
      ],
      personalDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      currentUser: true,
      bookedEvents: [
        // {
        //   start: new Date(2022, 2 - 1, 22, 13, 0),
        //   end: new Date(2022, 2 - 1, 22, 14, 30),
        //   class: 'booked',
        //   background: true,
        // },
        // {
        //   start: new Date(2022, 2 - 1, 25, 9, 0),
        //   end: new Date(2022, 2 - 1, 25, 10, 0),
        //   class: 'booked',
        //   background: true,
        // },
      ],
      venue: {
        pricing: {
          perHour: {
            price: 60,
          }
        }
      },
      booking: {
        checkIn: "",
        checkInBlur: true,
        checkOut: "",
        checkOutBlur: true,
        guestCount: null,
        guestCountBlur: true,
        paymentToken: "",
        extras: [],
        extraInput: {
          id: 0,
          value: "",
          valueBlur: true,
          number: null,
          numberBlur: true,
        },
        defaultExtraInput: {
          id: 0,
          value: "",
          valueBlur: true,
          number: null,
          numberBlur: true,
        },
      },
      perks: [
        { description: "Faster booking process", icon: "clock", size: "24px" },
        {
          description: "Earn credits with every booking",
          icon: "credits",
          size: "24px",
        },
        {
          description: "Full rewards program benefits",
          icon: "rewards",
          size: "24px",
        },
        { description: "Manage your wishlist", icon: "heart", size: "24px" },
      ],
      order: {
        password: "",
        createAccount: false,
        firstName: "John",
        lastName: "Dog",
        email: "john.dog@gmail.com",
        orderItems: [
          {
            title: "Cream Beach Bag",
            image: "/assets/storybook/Home/productA.jpg",
            price: { regular: "$50.00" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" },
            ],
            qty: 1,
            sku: "MSD23-345-324",
          },
          {
            title: "Vila stripe maxi dress",
            image: "/assets/storybook/Home/productB.jpg",
            price: { regular: "$50.00", special: "$20.05" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" },
            ],
            qty: 2,
            sku: "MSD23-345-325",
          },
        ],
      },
      buttonNames: [
        { name: "Go to Event details" },
        { name: "Go to Payment" },
        { name: "Confirm Booking" },
      ],
      characteristics: [
        {
          title: "Safety",
          description: "We encourage both hosts and guests to stay aware and take certain safety precautions",
          icon: "safety",
        },
        {
          title: "Cancellation policy",
          description: "Full refund of fees for cancellation up to 30 days prior to event, 50% refund of fees for cancellation up to 7 days prior to event",
          icon: "info_shield",
        },
      ],
      valErrorMsg: "",
    }
  },
  computed: {
    totalCharge() {
      const extraTotal = this.booking.extras.reduce((et, e) => et + e.extra.price * e.number, 0)
      cslog("extraTotal", extraTotal)
      return extraTotal + this.spacePrice
    },
    spacePrice() {
      const bookingDuration = Math.abs(this.booking.checkOut - this.booking.checkIn) / 36e5
      return this.venue.pricing.perHour.price * bookingDuration
    },
    getOrder() {
      const bookingData = {
        ...this.order,
        orderItems: this.booking.extras.map(e => ({
          title: "Your Booking",
          image: "/venue.jpg",
          price: { regular: `$${e.extra.price * e.number}` },
          configuration: [
            { name: "Size", value: "120 sqm" },
            { name: "Color", value: "30 people" },
          ],
          qty: 1,
          sku: "MSD23-345-324",
        }))
      }
      return {
        ...bookingData,
        ...this.personalDetails,
        shipping: {
          shippingMethod: {
            price: `$${this.spacePrice}`,
          }
        },
      };
    },
    minDate () {
      return new Date().addDays(1)
    },
  },
  async created() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      cslog(currentUser)
      this.currentUser = currentUser
      this.personalDetails = {
        firstName: currentUser.attributes.given_name,
        lastName: currentUser.attributes.family_name,
        email: currentUser.attributes.email,
        phone: currentUser.attributes.phone_number,
      }
    }
    catch (err) {
      this.currentUser = false
      const cred = await Auth.currentCredentials()
      cslog(err, "- Using unauth cred...", 'Cred exp:', cred.expiration, "\n-------")
    }

    this.venueId = this.$route.query.venueId
    let result = {}
    if (this.currentUser?.attributes) {
      result = await API.graphql({
        query: getVenue,
        variables: {id: this.venueId},
      })
    }
    else {
      result = await API.graphql({
        query: getVenue,
        variables: {id: this.venueId},
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    }
    const { data: { getVenue: venue } } = result

    if (!venue) {
      this.$router.push({ name: 'not-found' })
    }
    else {
      const [apt, str, cty, sta, zip, ctr] = venue.address.split(',\n').map(e => e.trim())
      this.venue.streetName = str
      this.venue.apartment = apt
      this.venue.city = cty
      this.venue.state = sta
      this.venue.zipCode = zip
      this.venue.country = ctr

      this.venue.headline = venue.headline
      this.venue.name = venue.name
      this.venue.description = venue.description
      this.venue.prices = {
        perHour: venue.pricing.perHour[0].price,
        perDay: venue.pricing.perDay
      }
      this.venue.photos = venue.photos
      this.venue.venueType = venue.type.name
      this.venue.eventSet = new Set(venue.eventTypes)
      this.venue.extras = venue.extras
      this.venue.capacity = venue.capacity
      this.venue.reviews = venue.reviews.items.map(
          r => ({
            author: r.userName || r.user,
            date: new Date(r.createdAt).toLocaleString(),
            message: r.comment,
            rating: {
              max: 5,
              rate: r.rating,
            },
          })
        )
      this.venue.published = venue.published
    }
    this.booking.extraOptions = this.venue.extras

    try {
      const resB = await API.graphql({
        query: listBookings,
        variables: {filter: {venueId: {eq: this.venueId}}},
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      console.info(`Booked events listed`)
      console.info(resB)
      this.bookedEvents = resB.data.listBookings.items.map(
        b => ({
          start: new Date(b.checkIn),
          end: new Date(b.checkOut),
          class: 'booked',
          background: true,
        })
      )
      cslog("bookedEvents", this.bookedEvents)
    }
    catch (err) {
      cslog(err)
    }

    Hub.listen('auth', (data) => {
      const { payload } = data
      this.onAuthEvent(payload)
      console.log('A new auth event has happened:', payload.message)
    })
  },
  methods: {
    moveNext() {
      if (this.currentStep === 0) {
        if (this.validatePersonalInfo()) {
          this.valErrorMsg = ""
          this.currentStep++
        }
        else {
          this.valErrorMsg = "You are not logged in, or some inputs are empty or invalid"
        }
      }
      else if (this.currentStep === 1) {
        if (this.validateEventDetails()) {
          this.valErrorMsg = ""
          this.currentStep++
        }
        else {
          this.valErrorMsg = "Some inputs are empty or invalid"
        }
      }
      else {
        if (this.validatePaymentInfo()) {
          this.valErrorMsg = ""
          this.book()
        }
        else {
          this.valErrorMsg = "Your payment info is empty or invalid"
        }
      }
    },
    validatePersonalInfo() {
      return this.currentUser?.attributes && Object.values(this.personalDetails).every(x => Boolean(x?.trim()))
    },
    validateEventDetails() {
      // this.$refs.eventFormBtn.click()
      return !!this.booking.checkIn && !!this.booking.checkOut && this.booking.guestCount > 0
    },
    validatePaymentInfo() {
      return this.card.valid
    },
    book() {
      this.loading = true
      const inputData = {
        checkIn: this.booking.checkIn.toISOString(),
        checkOut: this.booking.checkOut.toISOString(),
        extras: this.booking.extras.map(e => ({extra: e.extra, number: e.number})),
        guestCount: this.booking.guestCount,
        paymentCurrency: "USD",
        paymentToken: this.card.token,
        totalCharge: this.totalCharge,
        venueId: this.venueId,
      }
      cslog(inputData)
      API.graphql({
        query: processBooking,
        variables: {input: inputData},
      })
      .then(result => {
        this.loading = false
        console.info(`Booking created`)
        console.info(result)
        this.$router.push({ path: `/bookings/yours` })
      })
      .catch(error => {
        console.error("An error occurred when creating booking")
        console.error(error)
      })
    },
    openAuthModal() {
      Hub.dispatch(
        'CustomAuth',
        {
          event: 'authRequested',
          data: {},
          message: '',
        }
      )
    },
    onAuthEvent(authPayload) {
      this.currentUser = authPayload.data
      this.personalDetails = {
        firstName: this.currentUser.attributes.given_name,
        lastName: this.currentUser.attributes.family_name,
        email: this.currentUser.attributes.email,
        phone: this.currentUser.attributes.phone_number,
      }
    },
    updateStep(next) {
      // prevent to move next by SfStep header
      if (next < this.currentStep) {
        this.currentStep = next
      }
    },
    checkNoConflict(event) {
      return this.bookedEvents.every(bev =>
        [new Date(bev.start), new Date(bev.end)].every(bevt =>
          bevt.getTime() >= event.start.getTime() && bevt.getTime() >= event.end.getTime()
          || bevt.getTime() <= event.start.getTime() && bevt.getTime() <= event.end.getTime()
        )
      )
    },
    onEventCreate(event) {
      console.log(event)
      if (this.booking.checkIn && this.booking.checkOut) {
        alert("Delete old event by clicking and holding before creating new one")
        return false
      }
      if (this.checkNoConflict(event)) {
        this.booking.checkIn = event.start
        this.booking.checkOut = event.end
        return event
      }
      else {
        alert("Cannot create booking event due to conflict")
        return false
      }
    },
    onEventDelete(event) {
      console.log(event)
      this.booking.checkIn = null
      this.booking.checkOut = null
    },
    submit() {
      // this will trigger the process
      this.$refs.stripecard.submit();
    },
    tokenCreated(token) {
      console.log(token)
      this.card.token = token.id
      this.card.valid = true
    },
    validExtraInput(extraInput) {
      return !!extraInput.value && extraInput.number > 0
    },
    removeExtra(extraId) {
      this.booking.extras = this.booking.extras.filter(e => e.id != extraId)
      if (this.booking.extraInput.id == extraId) {
        this.booking.extraInput = {...this.booking.defaultExtraInput}
      }
    },
    addExtra(extraId, event) {
      event.target.blur()
      if (this.validExtraInput(this.booking.extraInput)) {
        if (extraId != 0) {
          let editExtra = this.booking.extras.find(e => e.id == extraId)
          const [name, type, price] = this.booking.extraInput.value.split(" -- ")
          editExtra.extra.name = name
          editExtra.extra.type = type
          editExtra.extra.price = price
          editExtra.number = this.booking.extraInput.number
          cslog(editExtra)
        }
        else {
          this.booking.extraInput.id = uuidv4()
          let newExtra = {}
          newExtra.id = this.booking.extraInput.id
          const [name, type, price] = this.booking.extraInput.value.split(" -- ")
          newExtra.extra = { name, type, price }
          newExtra.number = this.booking.extraInput.number
          this.booking.extras = [...this.booking.extras, newExtra]
        }
        this.booking.extraInput = {...this.booking.defaultExtraInput}
      }
    },
    editExtra(extraId) {
      const selectedExtra = this.booking.extras.find(e => e.id == extraId)
      if (selectedExtra) {
        if (this.booking.extraInput.id == selectedExtra.id) {
          this.booking.extraInput = {...this.booking.defaultExtraInput}
        }
        else {
          this.booking.extraInput = {
            ...this.booking.defaultExtraInput,
            id: selectedExtra.id,
            value: `${selectedExtra.extra.name} -- ${selectedExtra.extra.type} -- ${selectedExtra.extra.price}`,
            number: selectedExtra.number,

          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.form {
  padding: var(--spacer-sm) 0;
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__button {
    --button-width: 100%;
  }
  @include for-desktop {
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
    &__button {
      --button-width: auto;
    }
  }
}
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.checkout {
  --steps-content-padding: 0 var(--spacer-sm);
  @include for-desktop {
    --steps-content-padding: 0;
    display: flex;
  }
  &__main {
    ::v-deep .sf-steps__step.is-done {
      --steps-step-color: var(--c-primary);
    }
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 26.8125rem;
      margin: 0 0 0 var(--spacer-base);
    }
    &-order {
      box-sizing: border-box;
      width: 100%;
      background: var(--c-light);
      padding: var(--spacer-base) var(--spacer-sm) var(--spacer-xl);
      @include for-desktop {
        padding: var(--spacer-xl);
      }
    }
  }
}
.actions {
  background: var(--c-white);
  padding: var(--spacer-sm);
  box-shadow: 0px -2px 10px rgba(154, 154, 154, 0.15);
  text-align: center;
  position: sticky;
  bottom: 0;
  &__button {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    position: relative;
    box-shadow: none;
    padding: 0;
    width: 25rem;
    &__button {
      margin: 0;
    }
  }
}
.vuecal__event {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
  color: #999 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event .vuecal__event-time {
  display: none;
  align-items: center;
}
.modal-content,
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.formmd {
  width: 100%;
  &__element {
    margin: var(--spacer-base) 0;
  }
  &__checkbox {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
  &__submit {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.action-button {
  margin: var(--spacer-xl) 0;
}
.aside {
  margin: 0 0 var(--spacer-xl) 0;
  &__heading {
    --heading-title-color: var(--c-primary);
    --heading-title-font-size: var(--h3-font-size);
    --heading-title-font-weight: var(--font-weight--semibold);
    margin: 0 0 var(--spacer-sm) 0;
  }
}
</style>
