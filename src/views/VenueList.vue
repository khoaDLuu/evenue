<template>
  <div class="container px-4 md:mx-auto w-full md:w-3/5 my-6">
    <!-- <list-header @click:edit="openEditPage()" /> -->
    <list-header title="Your venue list" :actions="{create: 'Create Venue'}" />
    <card-list :venues="venues" @item-deleted="refreshList" />
  </div>
</template>

<script>
import ListHeader from '../components/venue/ListHeader.vue'
import CardList from '../components/venue/CardList.vue'
import { API, Auth } from 'aws-amplify'
import { listVenues } from '../graphql/queries'

export default {
  name: "Category",
  components: {
    ListHeader,
    CardList,
  },
  data() {
    return {
      venues: [],
      currentUser: {},
    }
  },
  created() {
    this.refreshList()
  },
  methods: {
    async refreshList() {
      let vm = this
      vm.currentUser = await Auth.currentAuthenticatedUser()
      API.graphql({
        query: listVenues,
        // variables: {input: {filter: {_version: 1}}},
        variables: {filter: {owner: {eq: vm.currentUser.username}}},
      })
      .then(res => {
        console.info(`Venues listed`)
        console.info(res)
        // ~~Quick hack: filter out soft-deleted items on the client side~~
        // vm.venues = res.data.listVenues.items.filter(venue => !venue._deleted)
        vm.venues = res.data.listVenues.items
      })
      .catch(error => {
        console.error("An error occurred when listing your venues")
        console.error(error)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
