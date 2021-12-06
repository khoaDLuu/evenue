<template>
  <div class="container md:mx-auto w-3/5 my-6">
    <list-header />
    <card-list />
  </div>
</template>

<script>
import ListHeader from '../components/venue/ListHeader.vue';
import CardList from '../components/venue/CardList.vue';

export default {
  name: "Category",
  components: {
    ListHeader,
    CardList
  },
  data() {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
