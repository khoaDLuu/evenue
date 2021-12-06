<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div id="default">
          <NavBar />
          <router-view></router-view>
          <p class="text-gray-300 text-center">Current user: {{ user.username }}</p>
        </div>
      </div>
      <!-- <amplify-sign-out></amplify-sign-out> -->
    </amplify-authenticator>
  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'AuthStateApp',
  components: {
    NavBar,
  },
  data() {
    return {
      title: "Login",
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#default {
}
</style>
