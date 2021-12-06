<template>
  <div class="mt-2">
    <div v-for="venue in venues" :key="venue.id">
      <card :venue="venue" />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
export default {
  name: "CardList",
  components: {
    Card
  },
  data() {
    return {
      venues: [
        {
          id: 1,
          name: "Metaverse",
          location: "Capitol",
          published: false
        },
        {
          id: 2,
          name: "Betaverse",
          location: "Nordic Realm",
          published: true
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
