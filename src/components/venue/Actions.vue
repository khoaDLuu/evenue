<template>
  <div class="flex flex-row flex-wrap">
    <SfButton class="px-4 py-2 mr-4 my-2" @click="$emit('edit-clicked')">
      Edit
    </SfButton>
    <SfButton class="px-4 py-2 mr-4 my-2 color-secondary"
      @click="$emit('del-clicked')">
      Delete
    </SfButton>
    <SfButton class="px-4 py-2 mr-4 my-2 color-light"
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
