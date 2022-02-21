<template>
  <div>
    <div id="default">
      <NavBar />
      <router-view></router-view>
      <router-link to="/auth">
        <p class="text-gray-200 text-center">
          Logged in as user: {{ user && user.username }}
        </p>
      </router-link>
    </div>
    <!-- <div v-if="authState !== 'signedin'">
      <p class="text-gray-100 text-center">
        You are signed out.
      </p>
    </div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div id="default">
          <NavBar />
          <router-view></router-view>
          <router-link to="/auth">
            <p class="text-gray-200 text-center">
              Current user: {{ user.username }} (click to go to /auth)
            </p>
          </router-link>
        </div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator> -->
  </div>
</template>

<script>
// import { onAuthUIStateChange } from '@aws-amplify/ui-components';
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
      console.log(err)
    }
  },
};

// export default {
//   name: 'AuthStateApp',
//   components: {
//     NavBar,
//   },
//   data() {
//     return {
//       title: "Login",
//       user: undefined,
//       authState: undefined,
//       unsubscribeAuth: undefined,
//     };
//   },
//   created() {
//     this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
//       this.authState = authState;
//       this.user = authData;
//     });
//   },
//   beforeDestroy() {
//     this.unsubscribeAuth();
//   },
// };
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#default {
}
</style>
