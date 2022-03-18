<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <SfHeading :level="1" title="Locations" class="navbar__title" />
      </div>
      <div class="navbar__main">
        <SfButton
          class="sf-button--text navbar__filters-button"
          aria-label="Filters"
          @click="isFilterSidebarOpen = true"
        >
          <SfIcon
            size="24px"
            color="#43464E"
            icon="filter2"
            class="navbar__filters-icon"
          />
          Filters
        </SfButton>
        <div class="navbar__sort desktop-only">
          <span class="navbar__label">Sort by:</span>
          <SfComponentSelect v-model="sortBy" class="navbar__select">
            <SfComponentSelectOption
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
              >{{ option.label }}</SfComponentSelectOption
            >
          </SfComponentSelect>
        </div>
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Venues found: </span>
          <span class="desktop-only">{{ products.length }}</span>
          <span class="navbar__label smartphone-only">{{ products.length }} Items</span>
        </div>
        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">View</span>
          <SfIcon
            class="navbar__view-icon"
            :color="'#43464E'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          />
          <SfIcon
            class="navbar__view-icon"
            :color="'#43464E'"
            icon="list"
            size="12px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isGridView"
            @click="isGridView = false"
          />
        </div>
      </div>
    </div>
    <div class="main section">
      <div class="sidebar desktop-only">
        <SfAccordion :open="sidebarAccordion[0].header" :show-chevron="true">
          <SfAccordionItem
            v-for="(accordion, i) in sidebarAccordion"
            :key="i"
            :header="accordion.header"
          >
            <template>
              <SfList class="list">
                <SfListItem
                  v-for="(item, j) in accordion.items"
                  :key="j"
                  class="list__item"
                >
                  <!-- <SfMenuItem :label="item.label" :count="item.count" /> -->
                  <SfMenuItem :label="item.label" />
                </SfListItem>
              </SfList>
            </template>
          </SfAccordionItem>
        </SfAccordion>
      </div>
      <div class="products">
        <transition-group
          v-if="isGridView"
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <SfProductCard
            v-for="(product, i) in products"
            :key="product.id || String(Math.random())"
            :style="{ '--index': i }"
            :title="product.title"
            :image="product.image"
            image-height="auto"
            image-width="100%"
            :regular-price="product.price && product.price.regular"
            :special-price="product.price && product.price.special"
            :max-rating="product.rating && product.rating.max"
            :score-rating="product.rating && product.rating.score"
            :reviews-count="product.reviewsCount"
            :is-in-wishlist="product.isInWishlist"
            :link="`/venues/${product.id}`"
            :showAddToCartButton="false"
            class="products__product-card"
            @click:wishlist="toggleWishlist(i)"
            @click:add-to-cart="openViewPage(i)">
            <template v-slot:add-to-cart-icon>
              <SfIcon
                key="add_to_cart"
                icon="more"
                size="16px"
                color="white"
              />
            </template>
            <template v-slot:adding-to-cart-icon>
              <SfIcon
                key="add_to_cart"
                icon="more"
                size="16px"
                color="back"
              />
            </template>
          </SfProductCard>
        </transition-group>
        <transition-group
          v-else
          appear
          name="products__slide"
          tag="div"
          class="products__list"
        >
          <SfProductCardHorizontal
            v-for="(product, i) in products"
            :key="product.id"
            :style="{ '--index': i }"
            :title="product.title"
            :description="product.description"
            :image="product.image"
            :regular-price="product.price.regular"
            :special-price="product.price.special"
            :max-rating="product.rating.max"
            :reviews-count="product.reviewsCount"
            :score-rating="product.rating.score"
            :is-in-wishlist="product.isInWishlist"
            class="products__product-card-horizontal"
            @click:wishlist="toggleWishlist(i)"
            @click:add-to-cart="openViewPage(i)">
            <template #configuration>
              <SfProperty
                class="desktop-only"
                name="Size"
                value="XS"
                style="margin: 0 0 1rem 0"
              />
              <SfProperty class="desktop-only" name="Color" value="white" />
            </template>
            <template #actions>
              <SfButton
                class="sf-button--text desktop-only"
                style="margin: 0 0 1rem auto; display: block"
                @click="$emit('click:add-to-wishlist')"
              >
                Add to Favorite list
              </SfButton>
              <SfButton
                class="sf-button--text desktop-only"
                style="margin: 0 0 0 auto; display: block"
                @click="$emit('click:add-to-compare')"
              >
                <!-- Nothing -->
              </SfButton>
            </template>
          </SfProductCardHorizontal>
        </transition-group>
        <SfPagination
          class="products__pagination"
          :current="currentPage"
          :total="4"
          :visible="5"
          @click="
            (page) => {
              currentPage = page;
            }
          "
        />
        <div class="products__show-on-page desktop-only">
          <span class="products__show-on-page__label">Show on page:</span>
          <SfSelect class="products__items-per-page">
            <SfSelectOption
              v-for="option in showOnPage"
              :key="option"
              :value="option"
              class="products__items-per-page__option"
            >
              {{ option }}
            </SfSelectOption>
          </SfSelect>
        </div>
      </div>
    </div>
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="isFilterSidebarOpen = false"
    >
      <div class="filters desktop-only">
        <!-- <SfHeading
          :level="4"
          title="Collection"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.collection"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        /> -->
        <SfHeading
          :level="4"
          title="Venue Types"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.size"
          :key="filter.label"
          :value="filter.label"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Event Types"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.material"
          :key="filter.label"
          :value="filter.label"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <!-- <SfHeading
          :level="4"
          title="Price"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.price"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        /> -->
        <!-- <SfRange
          class="form__element--range p-0"
          :config="rangeConfig"
          @change="filter.selected = !filter.selected"
        /> -->
      </div>
      <SfAccordion class="filters smartphone-only">
        <SfAccordionItem header="Show on page" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen"> {{ displayOnPage }} items </span>
          </template>
          <SfRadio
            v-for="value in showOnPage"
            :key="value"
            v-model="displayOnPage"
            :value="value"
            :label="value"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Sort by" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ sortBy }}
            </span>
          </template>
          <SfRadio
            v-for="sort in sortByOptions"
            :key="sort.value"
            v-model="sortBy"
            :value="sort.value"
            :label="sort.label"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Category" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ category }}
            </span>
          </template>
          <SfRadio
            v-for="cat in sidebarAccordion"
            :key="cat.header"
            v-model="category"
            :value="cat.header"
            :label="cat.header"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Collection" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.collection"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Color" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.color"
            :key="filter.value"
            :label="filter.label"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Venue Types" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.size"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Price" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.price"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Event Types" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.material"
            :key="filter.value"
            :value="filter.value"
            :label="filter.label"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton
            class="sf-button--full-width"
            @click="filterByTypeAndEvent"
            >Done</SfButton
          >
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearAllFilters"
            >Clear all</SfButton
          >
        </div>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfHeading,
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfComponentSelect,
  SfBreadcrumbs,
  // SfColor,
  SfProperty,
  SfRadio,
  SfSelect,
  // SfRange
} from "@storefront-ui/vue";
import { API, Auth, Storage, Hub } from 'aws-amplify'
import { listVenues, listFavorites, searchVenues } from '../graphql/queries'
import { createFavorite, deleteFavorite } from '../graphql/mutations'
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"

let cslog = console.log

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfComponentSelect,
    SfBreadcrumbs,
    // SfColor,
    SfProperty,
    SfRadio,
    SfSelect,
    // SfRange
  },
  data() {
    return {
      currentPage: 1,
      sortBy: "None",
      isFilterSidebarOpen: false,
      isGridView: true,
      category: "N.America",
      displayOnPage: "40",
      rangeConfig: {
        start: [10, 250],
        range: {
          min: 10,
          max: 500,
        },
        step: 5,
        connect: true,
        direction: "ltr",
        orientation: "horizontal",
        behaviour: "tap-drag",
        tooltips: true,
        keyboardSupport: true,
        format: {
          to: function (range) {
            return new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(range);
          },
          from: function (range) {
            const parsedValue = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).formatToParts(range);
            return parsedValue[0].value;
          },
        },
      },
      sortByOptions: [
        {
          value: "None",
          label: "None",
        },
        {
          value: "Latest",
          label: "Latest",
        },
        {
          value: "Price-up",
          label: "Price from low to high",
        },
        {
          value: "Price-down",
          label: "Price from high to low",
        },
      ],
      sidebarAccordion: [
        {
          header: "N.America",
          items: [
            { label: "All", count: "280" },
            { label: "US", count: "23" },
            { label: "Canada", count: "54" },
          ],
        },
        {
          header: "Europe",
          items: [
            { label: "All", count: "280" },
            { label: "UK", count: "23" },
            { label: "France", count: "54" },
            { label: "Germany", count: "34" },
            { label: "Italy", count: "56" },
            { label: "Belgium", count: "7" },
            { label: "Spain", count: "12" },
          ],
        },
        {
          header: "Asia",
          items: [
            { label: "All", count: "280" },
            { label: "China", count: "23" },
            { label: "Japan", count: "54" },
            { label: "Vietnam", count: "34" },
            { label: "Singapore", count: "56" },
            { label: "Korea", count: "7" },
            { label: "Thailand", count: "12" },
          ],
        },
      ],
      showOnPage: ["8", "16", "24"],
      products: Array(8).fill({}),
      filters: {
        collection: [
          {
            label: "Curated Spaces",
            value: "curated-spaces",
            count: "10",
            selected: false,
          },
          {
            label: "Covid-19 Proof",
            value: "covid-19-proof",
            count: "23",
            selected: false,
          },
          {
            label: "Your choice",
            value: "your-choice",
            count: "54",
            selected: false,
          },
        ],
        color: [
          { label: "Red", value: "red", color: "#990611", selected: false },
          { label: "Black", value: "black", color: "#000000", selected: false },
          {
            label: "Yellow",
            value: "yellow",
            color: "#DCA742",
            selected: false,
          },
          { label: "Blue", value: "blue", color: "#004F97", selected: false },
          { label: "Navy", value: "navy", color: "#656466", selected: false },
        ],
        size: [
          { label: "Gallery", value: "18", count: "", selected: false },
          { label: "Party room", value: "17", count: "", selected: false },
          { label: "Meeting room", value: "16", count: "", selected: false },
          { label: "Restaurant", value: "15", count: "", selected: false },
          { label: "Boat", value: "14", count: "", selected: false },
          { label: "Coworking space", value: "13", count: "", selected: false },
          { label: "Cinema", value: "12", count: "", selected: false },
          { label: "Bar", value: "11", count: "", selected: false },
          { label: "Cafe", value: "10", count: "", selected: false },
          { label: "Club", value: "9", count: "", selected: false },
          { label: "Rooftop", value: "8", count: "", selected: false },
          { label: "Terrace", value: "7", count: "", selected: false },
          { label: "Unusual venue", value: "6", count: "", selected: false },
          { label: "Apartment", value: "5", count: "", selected: false },
          { label: "Studio", value: "4", count: "", selected: false },
          { label: "Villa", value: "3", count: "", selected: false },
          { label: "Loft", value: "2", count: "", selected: false },
          { label: "Atelier", value: "xxl", count: "", selected: false },
          { label: "Banquet hall", value: "xl", count: "", selected: false },
          { label: "Function Room", value: "1", count: "", selected: false },
          { label: "Boardroom", value: "l", count: "", selected: false },
          { label: "Business center", value: "m", count: "", selected: false },
          { label: "Film studio", value: "s", count: "", selected: false },
          { label: "Kitchen studio", value: "xs", count: "", selected: false },
          { label: "Other", value: "xxs", count: "", selected: false },
        ],
        price: [
          {
            label: "Under $200",
            value: "under-200",
            count: "23",
            selected: false,
          },
          {
            label: "Under $300",
            value: "under-300",
            count: "54",
            selected: false,
          },
        ],
        material: [
          {
            "label": "Meeting",
            "value": "Meeting",
            "count": "",
            "selected": false
          },
          {
            "label": "Panel Discussion",
            "value": "Panel Discussion",
            "count": "",
            "selected": false
          },
          {
            "label": "Presentation",
            "value": "Presentation",
            "count": "",
            "selected": false
          },
          {
            "label": "Party",
            "value": "Party",
            "count": "",
            "selected": false
          },
          {
            "label": "Brainstorming",
            "value": "Brainstorming",
            "count": "",
            "selected": false
          },
          {
            "label": "Workshop",
            "value": "Workshop",
            "count": "",
            "selected": false
          },
          {
            "label": "Corporate Training",
            "value": "Corporate Training",
            "count": "",
            "selected": false
          },
          {
            "label": "Coaching Session",
            "value": "Coaching Session",
            "count": "",
            "selected": false
          },
          {
            "label": "Hackathon",
            "value": "Hackathon",
            "count": "",
            "selected": false
          },
          {
            "label": "Screening",
            "value": "Screening",
            "count": "",
            "selected": false
          },
          {
            "label": "Interview",
            "value": "Interview",
            "count": "",
            "selected": false
          },
          {
            "label": "Product Shoot",
            "value": "Product Shoot",
            "count": "",
            "selected": false
          },
          {
            "label": "Networking Event",
            "value": "Networking Event",
            "count": "",
            "selected": false
          },
          {
            "label": "Concert",
            "value": "Concert",
            "count": "",
            "selected": false
          },
          {
            "label": "Conference",
            "value": "Conference",
            "count": "",
            "selected": false
          },
          {
            "label": "Reception",
            "value": "Reception",
            "count": "",
            "selected": false
          },
          {
            "label": "Seminar",
            "value": "Seminar",
            "count": "",
            "selected": false
          },
          {
            "label": "Business Dinner",
            "value": "Business Dinner",
            "count": "",
            "selected": false
          },
          {
            "label": "Business Lunch",
            "value": "Business Lunch",
            "count": "",
            "selected": false
          },
          {
            "label": "Exhibition",
            "value": "Exhibition",
            "count": "",
            "selected": false
          }
        ],
      },
      breadcrumbs: [
        {
          text: "Home",
          link: "/",
        },
        {
          text: "All",
          link: "#",
        },
      ],
      currentUser: undefined,
      favorites: [],
      filterF: undefined,
      sortF: undefined,
      openSearch: false,
    }
  },
  async created() {
    try {
      this.currentUser = await Auth.currentAuthenticatedUser()
    }
    catch (err) {
      const cred = await Auth.currentCredentials()
      cslog(err, "- Using unauth cred...", 'Cred exp:', cred.expiration, "\n-------")
    }
    const searchValue = this.$route.query.searchValue
    const event = this.$route.query.event
    if (event) {
      this.filterF = (v) => new Set(v.eventTypes.map(et => et.toLowerCase())).has(event.toLowerCase())
    }
    if (searchValue) {
      this.showSearchResults(searchValue)
    }
    else {
      this.pullVenues(this.filterF, this.sortF)
    }

    const vm = this
    Hub.listen('OnPageSearch', (data) => {
      const searchValue = data.payload.data.searchValue?.trim() || ""
      if (data.payload.event == 'venueSearched' && searchValue && vm.searchValue != searchValue) {
        vm.searchValue = searchValue
        vm.showSearchResults(vm.searchValue)
      }
    })
  },
  watch: {
    sortBy(updatedSortBy, oldSortBy) {
      let sortF = undefined
      if (updatedSortBy !== oldSortBy && updatedSortBy !== this.sortByOptions[0].value) {
        switch (updatedSortBy) {
          case this.sortByOptions[1].value:
            sortF = (v1, v2) => v1.createdAt < v2.createdAt ? 1 : -1
            break
          case this.sortByOptions[2].value:
            sortF = (v1, v2) => v1.pricing.perHour[0].price - v2.pricing.perHour[0].price
            break
          case this.sortByOptions[3].value:
            sortF = (v1, v2) => v2.pricing.perHour[0].price - v1.pricing.perHour[0].price
            break
          default:
            break
        }
        this.sortF = sortF
        this.pullVenues(this.filterF, this.sortF)
      }
    }
  },
  methods: {
    async showSearchResults(searchValue) {
      try {
        if (this.openSearch) {
          const result = await API.graphql({
            query: searchVenues,
            variables: {filter: {name: {
              "matchPhrase": searchValue,
            }}},
            authMode: GRAPHQL_AUTH_MODE.API_KEY,
          })
          console.info(`Search results`, result)
          this.filterF = (v) => new Set(result.data.searchVenues.items.map(sv => sv.id)).has(v.id)
        }
        this.filterF = (v) => v.name?.toLowerCase().includes(searchValue?.toLowerCase()?.trim() || "");
        await this.pullVenues(this.filterF, this.sortF)
      }
      catch (error) {
        console.error("An error occurred when searching for your venues", error)
      }
    },
    clearAllFilters() {
      const filters = Object.keys(this.filters);
      filters.forEach((name) => {
        const prop = this.filters[name];
        prop.forEach((value) => {
          value.selected = false;
        });
      });
    },
    async filterByTypeAndEvent() {
      const selectedTypes = this.filters.size.filter(t => t.selected).map(t => t.label)
      const selectedEvents = this.filters.material.filter(e => e.selected).map(e => e.label)
      this.filterF = (v) => (
        new Set(selectedTypes).has(v.type)
        || selectedEvents.some(se => new Set(v.eventTypes).has(se))
      );
      await this.pullVenues(this.filterF, this.sortF)
      this.isFilterSidebarOpen = false
    },
    openViewPage(index) {
      cslog({ venueId: this.products[index].id })
      this.$router.push({
        name: 'venue-details',
        params: { venueId: this.products[index].id },
      })
    },
    toggleWishlist(index) {
      if (this.currentUser) {
        if (this.products[index].isInWishlist) {
          const delFavoriteId = this.favorites.filter(f => f.venue.id == this.products[index].id)[0].id
          API.graphql({
            query: deleteFavorite,
            variables: {input: {id: delFavoriteId}},
          })
          .then(result => {
            console.info(`Venue unfavorited`, result)
          })
          .catch(error => {
            cslog(error)
          })
        }
        else {
          const inputData = {
            favoriteVenueId: this.products[index].id,
            userId: this.currentUser.attributes.sub,
            owner: this.currentUser.username,
          }
          cslog("Fav input", inputData)

          API.graphql({
            query: createFavorite,
            variables: {input: inputData},
          })
          .then(result => {
            console.info("Venue favorited", result)
          })
          .catch(error => {
            cslog(error)
          })
        }
        this.products[index].isInWishlist = !this.products[index].isInWishlist
      }
    },
    async pullVenues(filterF, sortF) {
      try {
        let favVenueIds = new Set()
        let venues = []
        if (this.currentUser) {
          venues = await API.graphql({
            query: listVenues,
          })
          cslog(venues)

          if (!this.favorites?.length) {
            const favoriteResult = await API.graphql({
              query: listFavorites,
            })
            this.favorites = favoriteResult.data.listFavorites.items
          }
          favVenueIds = new Set(this.favorites.map(f => f.venue.id))
        }
        else {
          venues = await API.graphql({
            query: listVenues,
            authMode: GRAPHQL_AUTH_MODE.API_KEY,
          })
        }

        filterF = filterF || (v => true || v)
        const publishedVenues = venues.data.listVenues.items.filter(v => v.published).filter(filterF).sort(sortF)
        this.products = publishedVenues.map(v => (
          {
            title: this.trimmedStr(v.name),
            id: v.id,
            description: v.description,
            image: "",
            price: { regular: "$" + v.pricing.perHour[0].price },
            rating: { max: 5, score: this.avgRating(v) },
            reviewsCount: v.reviews.items.length,
            isInWishlist: favVenueIds.has(v.id),
          }
        ))
        let vm = this
        Promise.all(
          publishedVenues.map(v => Storage.get(v.photos?.[0].fullsize.key))
        ).then(urls => {
          cslog(urls)
          vm.products.map((v, i) => { v.image = urls[i] || "" })
          cslog(vm.products)
        }).catch(err =>
          cslog(`An error occurred when retrieving photo urls: ${JSON.stringify(err)}`)
        )
      }
      catch (err) {
        cslog(err)
      }
    },
    avgRating(venue) {
      const ratings = venue.reviews.items.map(r => r.rating)
      return ratings.length ? ratings.reduce((a, b) => (a + b)) / ratings.length : 0.1 // hacky fix
    },
    trimmedStr(str) {
      const length = 24
      return str.length > length ? str.substring(0, length - 1) + "…" : str
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) var(--spacer-base) var(--spacer-base)
    var(--spacer-sm);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    display: flex;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--h3-font-size);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-2xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      margin-right: var(--spacer-sm);
      order: 1;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --component-select-width: 220px;
    --component-select-padding: 0;
    --component-select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --component-select-margin: 0;
    --component-select-error-message-height: 0;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    margin: auto;
    @include for-desktop {
      margin: auto 0 auto auto;
    }
  }
  &__view {
    display: flex;
    order: -1;
    align-items: center;
    margin: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 var(--spacer-sm);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  --component-select-dropdown-z-index: 1;
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: space-between;
    }
  }
  &__product-card {
    --product-card-max-width: 11rem;
    --product-card-title-margin: var(--spacer-2xs) 0 0 0;
    --price-regular-font-line-height: 1;
    margin-bottom: var(--spacer-sm);
    ::v-deep .sf-product-card__price {
      margin: var(--spacer-2xs) 0 var(--spacer-xs);
    }
    flex: 1 1 50%;
    @include for-desktop {
      margin-bottom: 0;
      --product-card-max-width: 50%;
      --product-card-title-margin: var(--spacer-base) 0 0 0;
    }
  }
  &__product-card-horizontal {
    margin-bottom: var(--spacer-sm);
    flex: 0 0 100%;
    ::v-deep .sf-product-card-horizontal__wishlist-icon {
      .sf-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  &__pagination {
    display: flex;
    justify-content: center;
    margin: var(--spacer-base) 0;
  }
  @include for-desktop {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__pagination {
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
