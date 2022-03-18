<template>
  <div class="container px-4 md:mx-auto w-full md:w-3/5 my-6">
    <list-header title="Your favorite venues" />
    <fav-card-list :favorites="favVenues" @item-deleted="refreshList" />
  </div>
</template>

<script>
import ListHeader from '../components/venue/ListHeader.vue'
import FavCardList from '../components/venue/FavCardList.vue'
import { API, Auth } from 'aws-amplify'
import { listFavorites } from '../graphql/queries'

export default {
  name: "Category",
  components: {
    ListHeader,
    FavCardList,
  },
  data() {
    return {
      favVenues: [],
      currentUser: {},
    }
  },
  async created() {
    try {
      this.currentUser = await Auth.currentAuthenticatedUser()
    }
    catch (err) {
      console.log(err)
    }
    this.refreshList()
  },
  methods: {
    async refreshList() {
      let vm = this
      API.graphql({
        query: listFavorites,
      })
      .then(res => {
        console.info(`Favorite venues listed`, res)
        vm.favVenues = res.data.listFavorites.items
        // Favs are auto-filtered for current user (specified by auth rules)
      })
      .catch(error => {
        console.error("An error occurred when listing your favorite venues", error)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
