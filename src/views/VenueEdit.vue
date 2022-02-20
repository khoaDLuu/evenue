<template>
  <div class="container-lg md:container mx-auto mt-4">
    <div class="flex w-full">
      <div class="hidden md:block md:w-3/10 md:px-4">
        <!-- Component: PageHeading START -->
        <div class="relative">
          <p class="text-3xl border-b-2 pb-4 pt-2.5 mb-6">Edit Venue</p>
          <p class="my-6 text-gray-900">
            A <strong>venue</strong> is a building (or some other unified location) that has more than one space available to book.
          </p>
          <div class="absolute top-1.5 right-0">
            <building classes="text-green-400" />
          </div>
        </div>
        <!-- Component: PageHeading END -->
        <div v-for="guideStep in guideSteps" :key="guideStep.number" class="relative">
          <div class="text-xl text-gray-600 border border-current rounded-full mr-2 inline-block align-middle">
            <div class="h-0 py-50p">
              <div class="transform -translate-y-2/4">{{ guideStep.number }}</div>
            </div>
          </div>
          <p class="text-xl text-gray-800 inline-block align-middle">{{ guideStep.title }}</p>
          <p class="text-sm text-gray-600">{{ guideStep.comment }}</p>
        </div>
      </div>

      <div class="w-full md:w-7/10 md:border-l md:border-gray-300 px-4 md:pl-8 md:pr-4">
        <div class="my-8">
          <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
        </div>
        <!-- Component: PageHeading -->
        <div class="relative md:hidden">
          <p class="text-3xl border-b-2 pb-4 pt-2.5 mb-6">Edit Venue</p>
          <p class="my-6 text-gray-900">
            A <strong>venue</strong> is a building (or some other unified location) that has more than one space available to book.
          </p>
          <div class="absolute top-1.5 right-0">
            <building classes="text-green-400" />
          </div>
        </div>
        <div id="form-template">
          <form class="form">
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Content</p>
            <SfInput
              v-model="name"
              label="Venue name"
              name="name"
              class="form__element form__element--half"
              required
              :valid="nameBlur || validName(name)"
              error-message="Please type your name"
              @blur="nameBlur = false"
            />
            <SfInput
              v-model="headline"
              label="Venue headline"
              name="headline"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="headlineBlur || validHeadline(headline)"
              error-message="Please type your last name. Your name should have at least one character."
              @blur="headlineBlur = false"
            />
            <SfTextarea
              v-model="description"
              class="form__element max-w-full mt-4"
              label="Description"
              name="description"
              cols="120"
              rows="6"
              maxlength="400"
              minlength="10"
              wrap="soft"
              :readonly="true"
              placeholder="Type in the venue's description"
              required
              :valid="descriptionBlur || validDescription(description)"
              error-message="Please type minimum 10 characters and maximum 400."
              @blur="descriptionBlur = false"
            >
            </SfTextarea>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Photos</p>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
              <div class="flex items-center justify-center h-48 2xl:h-64 bg-grey-lighter">
                <form class="w-full h-full" enctype="multipart/form-data" novalidate>
                  <label
                    class="
                      w-full h-full flex flex-col items-center justify-center
                      px-4 py-6 bg-gray-100 text-gray-500 tracking-wide
                      text-gray-500 cursor-pointer
                      hover:text-gray-500 hover:text-green-600
                    "
                  >
                    <svg
                      class="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                      />
                    </svg>
                    <span class="mt-2 text-base leading-normal">
                      {{ uploadDone ? "Add venue photo" : "Uploading photo..." }}
                    </span>
                    <input @change="onFileChange" accept="image/*" type="file" class="hidden" />
                  </label>
                </form>
              </div>
              <div
                v-for="photo in photos"
                :key="photo.fullsize.key"
                class="relative flex items-center justify-center overflow-hidden md:h-48 2xl:h-64 bg:black"
              >
                <div class="object-cover">
                  <amplify-s3-image level="public" :img-key="photo.fullsize.key">
                  </amplify-s3-image>
                </div>
                <div
                  class="absolute top-2 right-2 sf-address__icon-container hover:bg-green-400"
                  @click.prevent="_removePhoto(photo.fullsize.key)">
                  <SfIcon icon="cross" class="sf-address__icon" />
                </div>
              </div>
            </div>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Address</p>
            <SfInput
              v-model="streetName"
              label="Street name"
              name="streetName"
              class="form__element form__element--half"
              required
              :valid="streetNameBlur || validStreetName(streetName)"
              error-message="Please type your street name"
              @blur="streetNameBlur = false"
            />
            <SfInput
              v-model="apartment"
              label="House/Apartment number"
              type="number"
              name="apartment"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="apartmentBlur || validApartment(apartment)"
              error-message="Please type your apartment/house number."
              @blur="apartmentBlur = false"
            />
            <SfInput
              v-model="city"
              label="City"
              name="city"
              class="form__element form__element--half"
              required
              :valid="cityBlur || validCity(city)"
              error-message="Please type your city."
              @blur="cityBlur = false"
            />
            <SfInput
              v-model="state"
              label="State/Province"
              name="state"
              class="form__element form__element--half form__element--half-even"
              :valid="stateBlur || validState(state)"
              error-message="Please type your state."
              @blur="stateBlur = false"
            />
            <SfInput
              v-model="zipCode"
              label="Zip code / postal code"
              name="zipCode"
              type="number"
              class="form__element form__element--half"
              required
              :valid="zipCodeBlur || validZipCode(zipCode)"
              error-message="Please type your zip code. Zipcode should have only numbers."
              @blur="zipCodeBlur = false"
            />
            <SfComponentSelect
              v-model="country"
              label="Country"
              class="
                form__element
                form__element--half
                form__element--half-even
                form__select
                sf-component-select--underlined
              "
              required
              :valid="countryBlur || validCountry(country)"
              error-message="Please choose your country."
              @blur="countryBlur = false"
            >
              <SfComponentSelectOption
                v-for="countryOption in countries"
                :key="countryOption"
                :value="countryOption"
              >
                {{ countryOption }}
              </SfComponentSelectOption>
            </SfComponentSelect>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Pricing</p>
            <SfInput
              v-model="prices.perHour"
              label="Venue price per hour ($)"
              name="prices.perHour"
              type="number"
              class="form__element form__element--half"
              required
              :valid="priceHBlur || validPrice(prices.perHour)"
              error-message="Please enter the venue's price per hour"
              @blur="priceHBlur = false"
            />
            <SfInput
              v-model="prices.perDay"
              label="Venue price per day ($)"
              name="prices.perDay"
              type="number"
              class="form__element form__element--half form__element--half-even"
              :valid="true"
              @blur="priceDBlur = false"
            />
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Venue type</p>
            <SfComponentSelect
              v-model="venueType"
              label="Venue type"
              class="
                form__element
                form__select
                sf-component-select--underlined
                pb-0
              "
              required
              :valid="venueTypeBlur || validVenueType(venueType)"
              error-message="Please choose the venue type"
              @blur="venueTypeBlur = false"
            >
              <SfComponentSelectOption
                v-for="venueTypeOption in venueTypeOptions"
                :key="venueTypeOption"
                :value="venueTypeOption"
              >
                {{ venueTypeOption }}
              </SfComponentSelectOption>
            </SfComponentSelect>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Suitable event types</p>
            <div class="w-full grid gap-4 grid-cols-3 xl:grid-cols-4 mb-4">
              <SfCheckbox
                name="eventCheckbox"
                v-for="eventTypeOption in eventTypeOptions"
                :key="eventTypeOption"
                :label="eventTypeOption"
                class="mr-4"
                hintMessage=""
                :required="false"
                infoMessage=""
                errorMessage=""
                valid
                :disabled="false"
                :selected="eventSet.has(eventTypeOption)"
                @change="eventSelected(eventTypeOption)"
              />
            </div>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Extras</p>
            <div class="w-full flex flex-col md:flex-row md:flex-wrap">
              <p class="pr-4">Type</p>
              <SfRadio
                v-for="extraType in extraTypes"
                :key="extraType"
                v-model="extraInput.type"
                :label="extraType"
                :value="extraType"
                name="extraType"
                class="form__radio"
              />
            </div>
            <SfInput
              v-model="extraInput.name"
              label="Extra name"
              name="extraInputName"
              type="text"
              class="form__element form__element--half"
              :valid="extraInput.nameBlur || validName(extraInput.name)"
              @blur="extraInput.nameBlur = false"
              error-message="Please enter a valid extra item name"
              @keydown.enter.prevent="addExtra(extraInput.id, $event)"
            />
            <SfInput
              v-model="extraInput.price"
              label="Extra price"
              name="extraInputPrice"
              type="number"
              class="form__element form__element--half form__element--half-even"
              :valid="extraInput.priceBlur || validPrice(extraInput.price)"
              error-message="Please enter a valid extra item price"
              @blur="extraInput.priceBlur = false"
              @keydown.enter.prevent="addExtra(extraInput.id, $event)"
            />
            <SfAddressPicker
              :selected="extraInput.id"
              class="
                w-full grid gap-4 grid-cols-1
                md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              @change="editExtra">
              <SfAddress
                v-for="extra in extras"
                :key="extra.id"
                :name="extra.id"
                class="w-full">
                <span class="font-medium text-sfui-primary-green">{{ extra.name }}</span>
                <div class="sf-property--without-suffix sf-property">
                  <span class="sf-property__name">{{ extra.type }}</span>
                </div>
                <span class="sf-price__regular">${{ extra.price }}</span>
                <template #icon>
                  <div
                    class="sf-address__icon-container hover:bg-green-400"
                    @click.prevent="removeExtra(extra.id)">
                    <SfIcon icon="cross" class="sf-address__icon" />
                  </div>
                </template>
              </SfAddress>
            </SfAddressPicker>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Capacity</p>
            <SfComponentSelect
              v-model="capacity.unit"
              label="Unit of area"
              class="
                form__element
                form__element--half
                form__select
                sf-component-select--underlined
              "
              required
              :valid="capacity.unitBlur || !!capacity.unit"
              error-message="Please choose the area unit used for your venue."
              @blur="capacity.unitBlur = false"
            >
              <SfComponentSelectOption
                v-for="unitOption in units"
                :key="unitOption"
                :value="unitOption"
              >
                {{ unitOption }}
              </SfComponentSelectOption>
            </SfComponentSelect>
            <SfInput
              v-model="capacity.floorSize"
              label="Floor size"
              name="floorSize"
              type="number"
              required
              class="form__element form__element--half form__element--half-even"
              :valid="capacity.sizeBlur || capacity.floorSize > 0"
              error-message="Please type in the floor size in the unit selected."
              @blur="capacity.sizeBlur = false"
            />
            <SfInput
              v-model="capacity.recommendedGuestCount"
              label="Recommended number of guests"
              name="recommendedGuestCount"
              type="number"
              class="form__element form__element--half"
              required
              :valid="capacity.guestCountBlur || capacity.recommendedGuestCount > 0"
              error-message="Please type in the recommended (often max) number of guests."
              @blur="capacity.guestCountBlur = false"
            />
            <div class="form__action mt-12">
              <SfButton class="mr-4 mb-4" type="submit" @click.prevent="publishToggle">{{ publishLabel }}</SfButton>
              <SfButton class="sf-button mr-4 mb-4 color-secondary" type="submit" @click.prevent="save">Save</SfButton>
              <SfButton class="sf-button mr-4 mb-4 color-light" @click="reset">Reset</SfButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfBreadcrumbs,
  SfInput,
  SfComponentSelect,
  SfButton,
  SfTextarea,
  SfCheckbox,
  SfAddressPicker,
  SfRadio,
  SfIcon,
} from "@storefront-ui/vue";
import Building from '../components/icons/Building.vue'
import { API, Storage } from 'aws-amplify'
import { getVenue } from '../graphql/queries'
import { createVenue, updateVenue } from '../graphql/mutations'
import { v4 as uuidv4 } from "uuid"
import config from "../aws-exports"
import { countries } from "@storefront-ui/vue/src/components/templates/internalData.js";

export default {
  name: "VenueEdit",
  components: {
    Building,
    SfBreadcrumbs,
    SfInput,
    SfComponentSelect,
    SfButton,
    SfTextarea,
    SfCheckbox,
    SfAddressPicker,
    SfRadio,
    SfIcon,
  },
  props: {
    venueId: {
      default: "",
      type: String,
    }
  },
  data() {
    return {
      guideSteps: [
        {
          number: 1,
          title: "Create your venue",
          comment: "Provide venue name.",
          done: true
        },
        {
          number: 2,
          title: "Provide required information",
          comment: "Required fields are marked with an asterisk (*). Please remember to click save button at the bottom of the page.",
          done: false
        },
        {
          number: 3,
          title: "Publish your venue",
          comment: "After publishing make sure to add at least one space. You also have the possibility to add or refine information by editing your venue.",
          done: false
        }
      ],
      breadcrumbs: [
        {
          text: 'Venue List',
          link: '/venues/yours'
        },
        {
          text: this.venueId ? `${this.venueId} - Edit` : "New",
          link: `/venues/yours/${this.venueId}`
        }
      ],
      valid: false,
      submitted: false,
      name: "",
      nameBlur: true,
      headline: "",
      descriptionBlur: true,
      description: "",
      photosBlur: true,
      photos: [],
      headlineBlur: true,
      streetName: "",
      streetNameBlur: true,
      apartment: "",
      apartmentBlur: true,
      city: "",
      cityBlur: true,
      state: "",
      stateBlur: true,
      zipCode: "",
      zipCodeBlur: true,
      country: "",
      countryBlur: true,
      countries: [
        "United States", "Canada",
        "Vietnam", "China", "Thailand", "India", "Singapore", "Korea", "Japan",
        ...countries,
      ],
      eventTypeOptions: [
        'Meeting',
        'Panel Discussion',
        'Presentation',
        'Party',
        'Brainstorming',
        'Workshop',
        'Corporate Training',
        'Coaching Session',
        'Hackathon',
        'Screening',
        'Interview',
        'Product Shoot',
        'Networking Event',
        'Concert',
        'Conference',
        'Reception',
        'Seminar',
        'Business Dinner',
        'Business Lunch',
        'Exhibition'
      ],
      venueTypeOptions: ['Gallery', 'Party room', 'Restaurant', 'Boat', 'Coworking space', 'Cinema', 'Bar', 'Cafe', 'Club', 'Rooftop', 'Terrace', 'Studio', 'Villa', 'Loft', 'Atelier', 'Banquet hall', 'Function Room', 'Boardroom', 'Business center', 'Film studio', 'Kitchen studio', 'Showroom', 'Consulting Room', 'Apartment', 'Unusual venue', 'Lawn', 'Classic Location', 'Meeting room', 'Recording Studio', 'Photostudio', 'Church', 'Party Bus', 'Textile Workshop', 'Carpentry', 'Spa and Wellness', 'Mobile Location', 'Farm', 'Beer Garden', 'Exhibition Hall', 'Waterside Location', 'Off-Location', 'Wedding Venue', 'Sports Location', 'Open Air Location', 'Organization', 'Corporate event spaces', 'Workshop spaces', 'Hobby Workshop', 'Conference Hotel', 'Day office', 'Werkstatt', 'Conference rooms', 'Training rooms', 'Seminar rooms'],
      prices: {
        perHour: null,
        perDay: null,
      },
      priceHBlur: true,
      priceDBlur: true,
      venueType: "",
      venueTypeBlur: true,
      eventSet: new Set(),
      capacity: {
        unit: undefined,
        floorSize: undefined,
        recommendedGuestCount: undefined,
        unitBlur: true,
        sizeBlur: true,
        guestCountBlur: true,
      },
      units: ["sqm", "sqft"],
      extras: [],
      extraInput: {
        id: "0",
        name: "",
        type: "",
        price: "",
        nameBlur: true,
        priceBlur: true,
      },
      defaultExtraInput: {
        id: "0",
        name: "",
        type: "",
        price: "",
        nameBlur: true,
        priceBlur: true,
      },
      extraTypes: ["Catering", "Equipment"],
      published: false,
      uploadDone: true,
    }
  },
  computed: {
    address() {
      return `${this.apartment},\n${this.streetName},\n${this.city},\n${this.state || ''},\n${this.zipCode},\n${this.country}`
    },
    pricing() {
      let venuePricing = {
        currency: "USD",
        perHour: [
          {
            startHour: "00:00:00",
            endHour: "23:59:59",
            price: this.prices.perHour,
          }
        ],
      }
      if (this.prices.perDay) {
        venuePricing.perDay = this.prices.perDay
      }
      return venuePricing
    },
    type() {
      return {
        name: this.venueType,
      }
    },
    publishLabel() {
      return this.published === false ? "publish" : "unpublish"
    },
    eventTypes() {
      return [...this.eventSet]
    },
  },
  created() {
    if (this.venueId) {
      API.graphql({
        query: getVenue,
        variables: {id: this.venueId},
      })
      .then(result => {
        console.info(`Venue retrieved`)
        console.info(result)
        const { data: { getVenue: venue } } = result

        const [apt, str, cty, sta, zip, ctr] = venue.address.split(',\n').map(e => e.trim())
        this.apartment = apt
        this.streetName = str
        this.city = cty
        // const [sta, zip, ctr] = gen.length == 2 ? ["", ...gen] : gen
        this.state = sta
        this.zipCode = zip
        this.country = ctr

        this.name = venue.name
        this.headline = venue.headline
        this.description = venue.description
        this.prices = {
          perHour: venue.pricing.perHour[0].price,
          perDay: venue.pricing.perDay
        }
        this.photos = venue.photos
        this.venueType = venue.type.name
        this.eventSet = new Set(venue.eventTypes)
        this.capacity = {...this.capacity, ...venue.capacity}
        this.extras = venue.extras.map(
          (extra, i) => ({...this.defaultExtraInput, id: String(i), ...extra})
        )
        this.extraInput = {...this.defaultExtraInput}
        this.published = venue.published
      })
      .catch(error => {
        console.error("An unexpected error occurred")
        console.error(error)
      })
    }

    // let vm = this
    // Hub.listen("storage", ({payload}) => {
    //   if (
    //     payload.event === "upload"
    //     && payload.data.method === "put"
    //     && payload.data.result === "success"
    //   ) {
    //     const photoKey = payload.message
    //     console.log(`Upload success for ${photoKey}`)
    //     vm.photos.push({
    //       name: vm.photos.length ? photoKey : `featured_${photoKey}`,
    //       fullsize: {
    //         region: "us-east-1",
    //         bucket: "evenuestaticfiles230706-dev",
    //         key: photoKey,
    //       }
    //     })
    //   }
    // });
  },
  methods: {
    validate() {
      this.nameBlur = false
      this.headlineBlur = false
      this.streetNameBlur = false
      this.apartmentBlur = false
      this.cityBlur = false
      this.zipCodeBlur = false
      this.countryBlur = false
      this.descriptionBlur = false
      this.priceHBlur = false
      this.priceDBlur = false
      this.venueTypeBlur = false
      // this.extraInput.nameBlur = false
      // this.extraInput.priceBlur = false
      this.capacity.unitBlur = false
      this.capacity.sizeBlur = false
      this.capacity.guestCountBlur = false
      if (
        this.validName(this.name) &&
        this.validHeadline(this.headline) &&
        this.validStreetName(this.streetName) &&
        this.validApartment(this.apartment) &&
        this.validCity(this.city) &&
        this.validZipCode(this.zipCode) &&
        this.validCountry(this.country) &&
        this.validState(this.country) &&
        this.validDescription(this.description) &&
        this.validVenueType(this.venueType) &&
        this.validPrice(this.prices.perHour) &&
        this.validCapacity(this.capacity)
      ) {
        this.valid = true;
      }
    },
    validName(name) {
      return name.length > 2;
    },
    validHeadline(headline) {
      return headline.length > 2;
    },
    validStreetName(streetName) {
      return streetName.length > 2;
    },
    validApartment(apartment) {
      const regex = /^[0-9]/;
      return regex.test(apartment);
    },
    validCity(city) {
      return !!city && city.length > 2;
    },
    validState(state) {
      return !!state && state.length >= 2;
    },
    validZipCode(zipCode) {
      const regex = /^[0-9]/;
      return regex.test(zipCode);
    },
    validCountry(country) {
      return !!country;
    },
    validDescription(description) {
      return !!description && description.length > 10 && description.length <= 400;
    },
    validPrice(price) {
      return price > 0
    },
    validVenueType(venueType) {
      return !!venueType
    },
    validExtraInput(extraInput) {
      return (
        this.validName(extraInput.name)
        && this.validPrice(extraInput.price)
        && extraInput.type !== ""
      )
    },
    validCapacity(cap) {
      return (
        !!cap.unit
        && cap.floorSize > 0
        && cap.recommendedGuestCount > 0
      )
    },
    async save() {
      this.validate();
      if (this.valid) {
        // this.submitted = true;
        const venueInputData = {
          name: this.name,
          headline: this.headline,
          description: this.description,
          photos: this.photos,
          address: this.address,
          city: this.city,
          pricing: this.pricing,
          type: this.type,
          eventTypes: this.eventTypes,
          published: this.published,
          extras: this.extras.map(ex => ({
            name: ex.name,
            type: ex.type,
            price: ex.price,
          })),
          capacity: {
            unit: this.capacity.unit,
            floorSize: this.capacity.floorSize,
            recommendedGuestCount: this.capacity.recommendedGuestCount,
          },
        };

        let query = createVenue
        let inputData = venueInputData
        if (this.venueId) {
          query = updateVenue
          inputData = {id: this.venueId, ...venueInputData}
        }
        API.graphql({
          query: query,
          variables: {input: inputData},
        })
        .then(result => {
          console.info(`Venue created/updated`)
          console.info(result)
          this.$router.push({ path: `/venues/yours` })
        })
        .catch(error => {
          console.error("An error occurred when creating/updating venue")
          console.error(error)
        }) // this is useless since GraphQL almost always returns 200
        // this.reset()
      }
    },
    publishToggle() {
      // should redirect to detail view page?
      this.published = !this.published
      this.save()
    },
    reset() {
      this.zipCode = ""
      this.country = ""
      this.streetName = ""
      this.city = ""
      this.headline = ""
      this.name = ""
      this.apartment = ""
      this.description = ""
      this.prices = {}
      this.venueType = ""
      this.eventSet = new Set()
      this.capacity = {}
      this.extras = []
      this.extraInput = {...this.defaultExtraInput}
    },
    eventSelected(eventTypeOption) {
      if (this.eventSet.has(eventTypeOption)) {
        /*
         * NOTE: don't do `this.eventSet.delete(eventTypeOption)`
         * because reactivity doesn't seem to work with that
         */
        this.eventSet = new Set(
          [...this.eventSet].filter(e => e != eventTypeOption)
        )
      }
      else {
        this.eventSet = new Set([...this.eventSet, eventTypeOption])
      }
    },
    removeExtra(extraId) {
      this.extras = this.extras.filter(e => e.id != extraId)
      if (this.extraInput.id == extraId) {
        this.extraInput = {...this.defaultExtraInput}
      }
    },
    addExtra(extraId, event) {
      event.target.blur()
      if (this.validExtraInput(this.extraInput)) {
        if (extraId != 0) {
          let editExtra = this.extras.find(e => e.id == extraId)
          editExtra.name = this.extraInput.name
          editExtra.type = this.extraInput.type
          editExtra.price = this.extraInput.price
        }
        else {
          this.extraInput.id = uuidv4()
          const newExtra = {...this.extraInput}
          this.extras = [...this.extras, newExtra]
        }
        this.extraInput = {...this.defaultExtraInput}
      }
    },
    editExtra(extraId) {
      const selectedExtra = this.extras.find(e => e.id == extraId)
      if (selectedExtra) {
        if (this.extraInput.id == selectedExtra.id) {
          this.extraInput = {...this.defaultExtraInput}
        }
        else {
          this.extraInput = {...selectedExtra}
        }
      }
    },
    async onFileChange(file) {
      if (!file.target || !file.target.files[0]) {
        return;
      }
      try {
        const {
          aws_user_files_s3_bucket_region: region,
          aws_user_files_s3_bucket: bucket
        } = config;
        const { objKey: photoKey, fileName, photoId } = await this._createPhoto({
          file: file.target.files[0],
        });
        const photoData = {
          name: `${fileName}${photoId}`,
          fullsize: {
            key: photoKey,
            region,
            bucket
          }
        }
        this.photos.unshift(photoData)
      }
      catch (error) {
        console.log("Error creating photo", error);
      }
    },
    async _createPhoto(fileData) {
      const { file } = fileData;
      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const fileName = file.name.substr(0, file.name.lastIndexOf("."));
      const photoId = uuidv4();
      const key = `images/${fileName}-${photoId}.${extension}`;

      try {
        let vm = this
        vm.uploadDone = false;
        const {key: objKey} = await Storage.put(key, file, {
          metadata: { fileName, photoId },
          progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            if (progress.loaded == progress.total) { vm.uploadDone = true }
          },
        })
        // await Storage.put(key, file, {
        //   level: "protected",
        //   contentType: mimeType,
        //   metadata: { photoId }
        // })
        console.log(objKey)
        return Promise.resolve({ objKey, fileName, photoId });
      }
      catch (error) {
        console.log("createPhoto error", error)
        return Promise.reject(error);
      }
    },
    async _removePhoto(imgKey) {
      try {
        console.info("Removing photo")
        Storage.remove(imgKey)
        this.photos = this.photos.filter(p => p.fullsize.key != imgKey)
      }
      catch (error) {
        console.warn("Failed to delete photo")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.py-50p {
  padding: 50% 10px;
}
#form-template {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 870px;
    margin: 0 auto;
  }
}
.form {
  padding: var(--spacer-sm) 0;
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__button {
    --button-width: 100%;
  }
  &__element {
    & textarea {
      @apply max-w-full border-0 border-b;
    }
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
amplify-s3-image {
  --width: 100%;
}
</style>
