<template>
  <div>
    <div id="default">
      <NavBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify"
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'Main',
  components: {
    NavBar,
  },
  data() {
    return {
      title: "Home",
      user: undefined,
    };
  },
  async created() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      console.log(currentUser)
      this.user = currentUser
    }
    catch (err) {
      const cred = await Auth.currentCredentials()
      console.log(err, "- Using unauth cred...", 'Cred exp:', cred.expiration, "\n-------")
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
