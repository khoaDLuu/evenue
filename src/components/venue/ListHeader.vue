<template>
  <div class="flex justify-between">
    <div>
      <SfHeading
        :class="hd.classes"
        :level="hd.level"
        :title="title"
      />
    </div>
    <div v-if="actions.create">
      <SfButton
        :class="btn.classes"
        :disabled="false"
        @click="openCreatePage">
        {{ actions.create }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfHeading
} from "@storefront-ui/vue";

export default {
  name: "ListHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    actions: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SfButton,
    SfHeading,
  },
  data() {
    return {
      hd: {
        classes: "sf-heading--left",
        level: 2,
        title: "Your venue list",
      },
      btn: {
        classes: "sf-button--underlined",
        content: "Create Venue",
      },
    }
  },
  methods: {
    openCreatePage() {
      this.$router.push({
        name: 'venues-edit',
        params: {
          // venueId: Math.floor(Math.random() * 1000).toString(),
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
