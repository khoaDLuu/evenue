<template>
  <div class="shadow">
    <SfHeader
      :logo="appLogo"
      :title="appName"
      :search-placeholder="searchPlaceholder"
      cartIcon="list"
      active-icon="cart"
      @click:cart="showVenueList">
      <template #navigation>
        <SfHeaderNavigationItem
          v-for="(category, key) in rootCategories"
          :key="`sf-header-navigation-item-${key}`"
          :link="`/${category}`"
          :label="category"
        />
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader } from "@storefront-ui/vue";

export default {
  name: 'NavBar',
  components: {
    SfHeader
  },
  data() {
    return {
      isMobile: false,
      appLogo: "/assets/logo.png",
      appName: "Evenue",
      rootCategories: ["Bookings", "Messages", "Schedule", "Venues"],
      searchPlaceholder: "Search for venues"
    };
  },
  methods: {
    showVenueList() {
      this.$router.push({ path: `/venues/yours` })
    }
  }
};
</script>
