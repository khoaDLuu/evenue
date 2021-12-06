<template>
  <div>
    <div class="flex flex-row justify-between shadow-lg p-6">
      <div class="flex-1">
        <p class="text-2xl">
          <span class="text-base px-2 mr-2 bg-red-600 text-white align-middle">VENUE</span>
          {{ venue.name }}
        </p>
        <p class="text-md">
          <location-marker classes="text-gray-600" />
          {{ venue.location }}
        </p>
        <p>
          <span class="text-base align-middle" :class="venue.published ? 'text-green-600' : 'text-blue-600'">
            {{ venue.published ? "Published" : "Unpublished" }}
          </span>
          <span class="text-base text-gray-600 align-middle ml-4">
            {{ `#${venue.id}` }}
          </span>
        </p>
      </div>
      <div class="flex-1 flex justify-end items-center">
        <actions @edit-clicked="openEditPage" @view-clicked="openViewPage" />
      </div>
    </div>
  </div>
</template>

<script>
import LocationMarker from '../icons/LocationMarker.vue';
import Actions from './Actions.vue';
export default {
  components: {
    Actions,
    LocationMarker
  },
  name: "Card",
  props: {
    venue: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
    }
  },
  methods: {
    openEditPage() {
      this.$router.push({ path: `/venues/${this.venue.id}` })
    },
    openViewPage() {
      return
    }
  }
};
</script>
