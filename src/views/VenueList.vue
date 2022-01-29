<template>
  <div class="container md:mx-auto w-3/5 my-6">
    <!-- <list-header @click:edit="openEditPage()" /> -->
    <list-header />
    <card-list :venues="venues" @item-deleted="refreshList" />
  </div>
</template>

<script>
import ListHeader from '../components/venue/ListHeader.vue';
import CardList from '../components/venue/CardList.vue';
import { API, Auth } from 'aws-amplify'
import { listVenues } from '../graphql/queries'

export default {
  name: "Category",
  components: {
    ListHeader,
    CardList
  },
  data() {
    return {
      venues: [
        // {
        //   id: 1,
        //   name: "Metaverse",
        //   city: "Capitol",
        //   published: false
        // }
      ],
      currentUser: {},
    }
  },
  created() {
    this.refreshList()
  },
  methods: {
    async refreshList() {
      let vm = this
      vm.currentUser = await Auth.currentAuthenticatedUser();
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
    // openCreatePage() {
    //   this.$router.push({ path: `/venues/edit` })
    // }, // Defined in `list-header`
    // openEditPage(vid) {
    //   this.$router.push({
    //     name: 'venues-edit',
    //     params: {
    //       venue: this.venues.filter(v => v.id === vid)
    //     }
    //   })
    // }, // Defined in `list-header`
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
