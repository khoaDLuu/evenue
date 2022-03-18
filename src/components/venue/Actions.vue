<template>
  <div class="flex flex-row flex-wrap">
    <SfButton v-if="actions.edit"
      class="px-4 py-2 mr-4 my-2"
      @click="$emit('edit-clicked')">
      {{ actions.edit }}
    </SfButton>
    <SfButton v-if="actions.del"
      class="px-4 py-2 mr-4 my-2 color-secondary"
      @click="$emit('del-clicked')">
      {{ actions.del }}
    </SfButton>
    <SfButton v-if="actions.view"
      class="px-4 py-2 mr-4 my-2 color-light"
      @click="$emit('view-clicked')">
      {{ actions.view }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton } from "@storefront-ui/vue"

export default {
  name: "Actions",
  props: {
    actions: {
      type: Object,
      required: true,
    },
  },
  components: {
    SfButton,
  },
};
</script>
