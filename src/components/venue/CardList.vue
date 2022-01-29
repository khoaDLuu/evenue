<template>
  <div class="mt-2">
    <div v-for="venue in venues" :key="venue.id">
      <card :venue="venue" @del-clicked="openDeleteModal" />
    </div>
    <SfModal title="Delete Venue"
      :visible="modalShowed" cross overlay :persistent="false"
      @close="modalShowed = false">
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
        <p class="text-lg font-bold inline-block px-1">You are about to delete this venue.</p>
      </div>
      <p>
        The action is irreversible
        and will be successful only when the venue has no bookings.
        Are you sure to continue?
      </p>
      <div class="flex flex-row justify-center mb-4">
        <SfButton
          class="px-4 py-2 mx-2 color-danger"
          @click.prevent="deleteVenue">
          Confirm
        </SfButton>
        <SfButton
          class="px-4 py-2 mx-2 color-secondary"
          @click.prevent="modalShowed = false">
          Cancel
        </SfButton>
      </div>
    </SfModal>
  </div>
</template>

<script>
import { SfModal, SfButton, SfIcon } from "@storefront-ui/vue";
import Card from './Card.vue';
import { API } from 'aws-amplify'
import { deleteVenue } from '../../graphql/mutations'

export default {
  name: "CardList",
  components: {
    Card,
    SfModal,
    SfButton,
    SfIcon,
  },
  props: {
    venues: {
      default: () => ([]),
      type: Array
    }
  },
  data() {
    return {
      modalShowed: false,
      delVenueId: 0,
    }
  },
  methods: {
    openDeleteModal(venueId) {
      this.modalShowed = true
      this.delVenueId = venueId
    },
    deleteVenue() {
      this.modalShowed = false
      API.graphql({
        query: deleteVenue,
        // variables: {input: {id: this.delVenueId, _version: 1}},
        variables: {input: {id: this.delVenueId}},
      })
      .then(result => {
        console.info(`Venues deleted`)
        console.info(result)
        this.$emit('item-deleted')
        // how about deleting the photos associated with the venue?
      })
      .catch(error => {
        console.error("An error occurred when deleting your venues")
        console.error(error)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
