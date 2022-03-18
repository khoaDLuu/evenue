<template>
  <div class="mt-2">
    <div v-for="favorite in favorites" :key="favorite.id">
      <div>
        <div class="flex flex-row justify-between shadow-lg p-6">
          <div class="flex-auto basis-3/4">
            <p class="text-2xl">
              <span class="text-base px-2 mr-2 bg-green-600 text-white align-middle">FAVORITE</span>
              {{ favorite.venue.name }}
            </p>
            <p class="text-md">
              <location-marker classes="text-gray-600" />
              {{ favorite.venue.city }}
            </p>
            <p>
              <span class="text-base text-gray-600 align-middle">
                {{ `#${favorite.venue.id}` }}
              </span>
            </p>
          </div>
          <div class="flex-auto flex justify-end items-center">
            <actions
              :actions="{del: 'Unfavorite', view: 'View'}"
              @del-clicked="unfavorite(favorite.id)"
              @view-clicked="openViewPage(favorite.venue.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationMarker from '../icons/LocationMarker.vue'
import Actions from './Actions.vue'
import { API } from 'aws-amplify'
import { deleteFavorite } from '../../graphql/mutations'

export default {
  name: "CardList",
  components: {
    Actions,
    LocationMarker,
  },
  props: {
    favorites: {
      default: () => ([]),
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {
    unfavorite(favoriteId) {
      API.graphql({
        query: deleteFavorite,
        variables: {input: {id: favoriteId}},
      })
      .then(result => {
        console.info(`Venue unfavorited`)
        console.info(result)
        this.$emit('item-deleted')
      })
      .catch(error => {
        console.error("An error occurred when unfavoriting your venues")
        console.error(error)
      })
    },
    openViewPage(favoriteVenueId) {
      this.$router.push({
        name: 'venue-details',
        params: { venueId: favoriteVenueId },
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
