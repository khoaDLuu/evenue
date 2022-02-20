<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <SfGallery :images="venue.photoUrls" class="product__gallery" />
      <div class="product__info pt-4 md:pt-0">
        <div class="product__header pb-4">
          <SfHeading
            :title="venue.name"
            :level="1"
            class="sf-heading--no-underline sf-heading--left">
            <template #description>
              <span class="app-banner__description text-xs md:text-base">
                #{{ venueId }}
              </span>
            </template>
          </SfHeading>
          <SfIcon
            icon="drag"
            size="42px"
            color="#E0E0E1"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating flex flex-row justify-between">
          <SfPrice>
            <template #regular>
              <div class="mt-2 mr-6 text-center">
                <per-hour classes="mx-auto mb-1 text-gray-600" />
                ${{ venue.prices.perHour }}
                <span class="text-sm text-gray-500">/h</span>
              </div>
            </template>
            <template #special>
              <div class="mt-2 mr-6 text-center">
                <per-day classes="mx-auto mb-1 text-gray-600" />
                ${{ venue.prices.perDay }}
                <span class="text-sm text-gray-500">/d</span>
              </div>
            </template>
          </SfPrice>
          <div>
            <div class="product__rating">
              <SfRating
                :score="avgRating"
                :max="5"
              />
              <a v-if="!!venue.reviews" href="#" class="product__count">
                ({{ venue.reviews.length }})
              </a>
            </div>
            <SfButton
              class="sf-button--text"
              data-testid="read-all-reviews"
              @click="changeTab(3)"
            >
              Read all reviews
            </SfButton>
          </div>
        </div>
        <div>
          <p class="product__description desktop-only">
            {{ venue.headline }}
          </p>
          <p class="text-md px-4 md:px-0">
            <SfButton
                class="sf-button--text inline-block w-full whitespace-normal text-left"
                data-testid="view-on-map"
                @click="changeTab(2)"
              >
                <location-marker classes="text-gray-600 mr-1" />
                {{ address }}
            </SfButton>
          </p>
          <div class="px-4 md:px-0 pt-4 md:pt-12">
            <SfButton
              class="w-full md:w-min md:float-right"
              @click="openBookingPage">
              Book now
            </SfButton>
            <SfButton class="sf-button--text desktop-only product__save md:clear-right md:pt-8">
              Add to favorites
            </SfButton>
            <SfButton
              class="sf-button--text desktop-only product__save"
              @click.prevent="copyUrl">
              Share this venue
            </SfButton>
          </div>
        </div>
        <SfTabs
          id="tabs"
          :open-tab="openTab"
          class="product__tabs"
          @click:tab="changeTab"
        >
          <SfTab v-for="tab in tabs" :key="tab.title" :title="tab.title">
            <span v-if="tab.title === 'General Info'">{{ venue.description }}</span>
            <div v-if="tab.title === 'General Info'">
              <SfProperty
                v-for="(detailed, i) in details"
                :key="i"
                :name="detailed.name"
                :value="detailed.value"
                class="product__property"
              >
                <template v-if="detailed.name === 'Venue type'" #value>
                  <SfButton class="sf-button--text product__property__button">
                    {{ detailed.value }}</SfButton
                  >
                </template>
              </SfProperty>
            </div>
            <div v-else-if="tab.title === 'Map Location'" class="h-80 w-full">
              <l-map style="height: 100%; width: 100%;" :zoom="mapData.zoom" :center="mapData.center" ref="map">
                <l-tile-layer :url="mapData.url" :attribution="mapData.attribution"></l-tile-layer>
                <l-marker :lat-lng="mapData.center">
                  <l-tooltip
                    :content="`${venue.apartment} ${venue.streetName}, ${venue.city}`"
                    :options="{permanent: true}">
                  </l-tooltip>
                </l-marker>
              </l-map>
            </div>
            <div
              v-else-if="tab.title === 'Extras'"
              class="product__additional-info"
            >
              <SfAddressPicker class="
                  w-full grid gap-4 grid-cols-1
                  md:grid-cols-2 2xl:grid-cols-3">
                <SfAddress class="w-full"
                  v-for="extra in venue.extras"
                  :key="extra.id" :name="extra.id">
                  <span class="font-medium text-sfui-primary-green">{{ extra.name }}</span>
                  <div class="sf-property--without-suffix sf-property">
                    <span class="sf-property__name">{{ extra.type }}</span>
                  </div>
                  <span class="sf-price__regular">${{ extra.price }}</span>
                  <template #icon>
                    <div class="sf-address__icon-container">
                      <SfIcon icon="plus" class="sf-address__icon" />
                    </div>
                  </template>
                </SfAddress>
              </SfAddressPicker>
            </div>
            <div v-else-if="tab.title === 'Reviews'">
              <SfReview
                v-for="(review, i) in venue.reviews"
                :key="i"
                :author="review.author"
                :date="review.date"
                :message="review.message"
                :max-rating="review.rating.max"
                :rating="review.rating.rate"
                :char-limit="200"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </div>
            <div v-else-if="tab.title === 'Availability'">
              <!-- TODO: Calendar with Scheduling data -->
            </div>
            <div v-else-if="tab.title === 'Contact'">
              <!-- TODO: Avatar? -->
              <SfProperty
                v-for="(info, i) in providerInfo"
                :key="i"
                :name="info.name"
                :value="info.value"
                class="product__property"
              >
                <template v-if="info.name === 'Email'" #value>
                  <SfLink
                    class="product__property__button"
                    :link="`mailto:${ info.value }`" target="_blank">
                    {{ info.value }}
                  </SfLink>
                </template>
              </SfProperty>
            </div>
          </SfTab>
        </SfTabs>
        <div class="">
          <!-- TODO: Similar venues / venues in same area -->
        </div>
      </div>
    </div>
    <transition name="slide">
      <SfNotification
        class="notification smartphone-only"
        :visible="isOpenNotification"
        :message="notifMessage"
        @click:close="isOpenNotification = false"
      >
        <template #icon>
          <span></span>
        </template>
      </SfNotification>
    </transition>
  </div>
</template>

<script>
import {
  SfGallery,
  SfHeading,
  SfPrice,
  SfRating,
  SfIcon,
  SfTabs,
  SfProperty,
  SfButton,
  SfLink,
  SfReview,
  // SfAddToCart,
  // SfSelect,
  SfBreadcrumbs,
  SfNotification,
  SfAddressPicker,
} from "@storefront-ui/vue";
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import { API, Storage } from 'aws-amplify'
import { getVenue } from '../graphql/queries'
import PerHour from '../components/icons/PerHour.vue'
import PerDay from '../components/icons/PerDay.vue'
import LocationMarker from '../components/icons/LocationMarker.vue'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

let cslog = console.log

export default {
  name: "VenueDetails",
  components: {
    SfGallery,
    SfHeading,
    SfPrice,
    SfRating,
    SfIcon,
    SfTabs,
    SfProperty,
    SfButton,
    SfLink,
    SfReview,
    // SfAddToCart,
    // SfSelect,
    SfBreadcrumbs,
    SfNotification,
    SfAddressPicker,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    PerHour,
    PerDay,
    LocationMarker,
  },
  props: {
    venueId: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      venue: {
        apartment: "",
        streetName: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        name: "",
        headline: "",
        description: "",
        prices: {
          perHour: "",
          perDay: "",
        },
        photos: [],
        photoUrls: [
          // {
          //   mobile: { url: "https://picsum.photos/216/326" },
          //   desktop: { url: "https://picsum.photos/216/326" },
          //   big: { url: "https://picsum.photos/216/326" },
          //   alt: "Product A",
          // },
          // {
          //   mobile: { url: "https://picsum.photos/216/326" },
          //   desktop: { url: "https://picsum.photos/216/326" },
          //   big: { url: "https://picsum.photos/216/326" },
          //   alt: "Product B",
          // },
          // {
          //   mobile: { url: "https://picsum.photos/216/326" },
          //   desktop: { url: "https://picsum.photos/216/326" },
          //   big: { url: "https://picsum.photos/216/326" },
          //   alt: "Product A",
          // },
          // {
          //   mobile: { url: "https://picsum.photos/216/326" },
          //   desktop: { url: "https://picsum.photos/216/326" },
          //   big: { url: "https://picsum.photos/216/326" },
          //   alt: "Product B",
          // },
        ], // set to [] and use skeletons instead
        venueType: "",
        eventSet: new Set(),
        extras: [],
        capacity: {
          unit: "sqm",
          floorSize: 0,
          recommendedGuestCount: 0,
        },
        reviews: [],
        published: true,
      },
      tabs: [
        { title: "General Info" },
        { title: "Map Location" },
        { title: "Extras" },
        { title: "Reviews" },
        { title: "Contact" },
        { title: "Availability" },
      ],
      breadcrumbs: [
        {
          text: "Home",
          route: {
            link: "/",
          },
        },
        {
          text: "Venues",
          route: {
            link: "/venues/search",
          },
        },
        {
          text: "#",
          route: {
            link: "#",
          },
        },
      ],
      isOpenNotification: false,
      notifMessage: "",
      openTab: 1,
      mapData: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 12,
        center: [51.505, -0.159],
        // markerLatLng: [51.504, -0.159],
      },
      owner: undefined,
    }
  },
  computed: {
    details() {
      return [
        {
          name: "Venue type",
          value: this.venue.venueType,
        },
        {
          name: "Suitable for",
          value: [...this.venue.eventSet].join(", "),
        },
        {
          name: "Floor size",
          value: `${this.venue.capacity?.floorSize} ${this.venue.capacity?.unit}`,
        },
        {
          name: "Recommended number of guests",
          value: this.venue.capacity?.recommendedGuestCount,
        },
      ]
    },
    providerInfo() {
      return [
        {
          name: "First name",
          value: this.onwer?.firstName,
        },
        {
          name: "Last name",
          value: this.onwer?.lastName,
        },
        {
          name: "Email",
          value: this.onwer?.email || "dangkhoa240899@gmail.com",
        },
        {
          name: "Phone",
          value: this.onwer?.phone,
        },
      ]
    },
    avgRating() {
      const ratings = this.venue.reviews.map(r => r.rating.rate)
      return ratings.length ? ratings.reduce((a, b) => (a + b)) / ratings.length : 0.1
    },
    address() {
      return [
        `${this.venue.apartment} ${this.venue.streetName}`,
        this.venue.city,
        `${this.venue.state} ${this.venue.zipCode}`,
        this.venue.country
      ].join(", ")
    },
  },
  async created() {
    const result = await API.graphql({
      query: getVenue,
      variables: {id: this.venueId},
    })
    // .then(result => {
      console.info(`Venue retrieved`)
      console.info(result)
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
        this.venue.reviews = [ { author: "Jane D.Smith", date: "April 2019", message: "I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can comment on interlation as I had an electrition instal it. Would recommend.", rating: { max: 5, rate: 4, }, }, { author: "Jane D.Smith", date: "April 2019", message: "I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can comment on interlation as I had an electrition instal it. Would recommend.", rating: { max: 5, rate: 3, }, }, ]
        /* TODO: remove mock data */ venue.reviews.items.map(
          r => ({
            author: r.user.name,
            date: r.created,
            message: r.comment,
            rating: {
              max: 5,
              rate: r.rating,
            },
          })
        )
        this.venue.published = venue.published

        this.breadcrumbs[2] = {
          text: `#${venue.id}`,
          route: {
            link: `/venues/${venue.id}`,
          },
        },

        // rewrite this in async/await syntax to get the photos fully rendered on page load
        Promise.all(this.venue.photos.map(p => Storage.get(p.fullsize.key)))
          .then(urls => {
            this.venue.photoUrls = urls.map(
              url => ({
                mobile: { url: url },
                desktop: { url: url },
                big: { url: url },
                alt: url,
              })
            )
          })
          .catch(err => cslog(`An error occurred when retrieving photo urls: ${err}`))

        // Auth.currentAuthenticatedUser()
        //   .then(user => {
        //     this.owner = {
        //       firstName: user.attributes.given_name,
        //       lastName: user.attributes.family_name,
        //       email: user.attributes.email,
        //       phone: user.attributes.phone_number,
        //     }
        //   })
        //   .catch(err => {
        //     cslog(err)
        //   })
      }
    // })
    // .catch(error => {
    //   console.error("An unexpected error occurred")
    //   console.error(error)
    // })

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.address}`)
      .then(res => {
        return res.json()
      })
      .then(async data => {
        this.mapData.center = data[0] ? [data[0]?.lat, data[0]?.lon] : this.mapData.center
        cslog(data)
      })
      .catch(err => {
        cslog(`An error occurred when fetching venue coordinates: ${err}`)
      })
    // this.venue.mapData.center = await fetch(
    //   'http://api.positionstack.com/v1/?' + new URLSearchParams({
    //     access_key: '383b67a5b0eff25929769efcffd668e4',
    //     query: this.venue.address,
    //   })
    // )
  },
  mounted() {
  },
  methods: {
    openBookingPage() {
      this.isOpenNotification = true
      this.notifMessage = "Opening..."
      this.$router.push({ path: '/bookings/new', query: { venueId: this.venueId }})
      setTimeout(() => {
        this.isOpenNotification = false
        this.notifMessage = ""
      }, 3000)
    },
    copyUrl() {
      (window.clipboardData || navigator.clipboard).writeText(window.location.href)
        .then(result => {
          cslog(result)
          this.isOpenNotification = true
          this.notifMessage = "Link copied"
          setTimeout(() => {
            this.isOpenNotification = false
            this.notifMessage = ""
          }, 2000)
        })
        .catch(error => {
          cslog(error)
        })
    },
    changeTab(tabNumber) {
      document
        .getElementById("tabs")
        .scrollIntoView({ behavior: "smooth", block: "end" });
      this.openTab = tabNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-xs) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    color: var(--c-link);
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.notification {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  --notification-border-radius: 0;
  --notification-max-width: 100%;
  --notification-background: var(--c-link);
  --notification-font-size: var(--font-size--sm);
  --notification-font-family: var(--font-family--primary);
  --notification-font-weight: var(--font-weight--normal);
  --notification-padding: var(--spacer-base) var(--spacer-lg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter {
  transform: translateY(40px);
}

.slide-leave-to {
  transform: translateY(-80px);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
