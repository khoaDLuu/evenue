<template>
  <div class="flex flex-row flex-wrap">
    <SfButton :class="'px-4 py-2 mr-4'" @click="$emit('edit-clicked')">
      Edit
    </SfButton>
    <SfButton :class="'px-4 py-2 mr-4 color-light'"
      @click="$emit('view-clicked')">
      View
    </SfButton>
  </div>
</template>

<script>
import { SfButton } from "@storefront-ui/vue";
export default {
  name: "Actions",
  components: {
    SfButton
  }
};
</script>
