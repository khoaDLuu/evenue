<template>
  <div class="shadow">
    <SfHeader
      :logo="appLogo"
      :title="appName"
      :search-placeholder="searchPlaceholder"
      cartIcon="list"
      active-icon="cart"
      @click:cart="showVenueList"
      @click:account="showProfile">
      <template #navigation>
        <SfHeaderNavigationItem
          v-for="(category, key) in rootCategories"
          :key="`sf-header-navigation-item-${key}`"
          :link="category == 'Venues' ? `/venues/search` : `/bookings/yours`"
          :label="category"
        />
      </template>
    </SfHeader>
    <SfModal
      id="login"
      :visible="openModal"
      :title="modalTitle"
      @close="openModal = false"
    >
      <transition name="sf-fade" mode="out-in">
        <amplify-authenticator></amplify-authenticator>
        <!-- <div
          v-if="isLogIn"
          key="log-in"
          class="modal-content"
          data-testid="login-modal"
        >
          <p class="text-xl text-gray-800 font-semibold my-8 pt-2 w-full">LOGIN</p>
          <form class="form" @submit.prevent="() => false">
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__element"
              type="email"
            />
            <SfInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              class="form__element"
              :has-show-password="true"
            />
            <SfCheckbox
              v-model="rememberMe"
              name="remember-me"
              label="Remember me"
              class="form__element form__checkbox"
            />
            <SfButton
              type="submit"
              class="sf-button--full-width form__submit"
              data-testid="log-in-button"
              @click="logIn"
            >
              Log In
            </SfButton>
          </form>
          <SfButton
            class="sf-button--text action-button"
            data-testid="forgotten-password-button"
          >
            Forgotten password?
          </SfButton>
          <div class="aside">
            <SfHeading
              title="Don't have an account yet?"
              :level="4"
              class="aside__heading"
            />
            <SfButton
              class="sf-button--text"
              data-testid="register-now-button"
              @click="isLogIn = false"
            >
              Register now
            </SfButton>
          </div>
        </div> -->
        <!-- <div
          v-else
          key="sign-up"
          class="modal-content"
          data-testid="signin-modal"
        >
          <form class="form" @submit.prevent="() => false">
            <SfInput
              v-model="firstName"
              name="first-name"
              label="Name"
              class="form__element"
            />
            <SfInput
              v-model="lastName"
              name="last-name"
              label="Last Name"
              class="form__element"
            />
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__element"
              type="email"
            />
            <SfInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              class="form__element"
            />
            <SfButton
              type="submit"
              class="sf-button--full-width form__submit"
              data-testid="create-acount-button"
            >
              Create an account
            </SfButton>
          </form>
          <SfButton
            class="sf-button--text action-button"
            data-testid="log-in-account"
            @click="isLogIn = true"
          >
            or Log In To Your Account
          </SfButton>
        </div> -->
      </transition>
    </SfModal>
  </div>
</template>

<script>
import {
  SfHeader,
  SfModal,
  // SfInput,
  // SfButton,
  // SfCheckbox,
  // SfHeading,
} from "@storefront-ui/vue";
import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components';

export default {
  name: 'NavBar',
  components: {
    SfHeader,
    SfModal,
    // SfInput,
    // SfButton,
    // SfCheckbox,
    // SfHeading,
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
  data() {
    return {
      isMobile: false,
      appLogo: "/assets/logo.png",
      appName: "Evenue",
      rootCategories: ["Bookings", /* "Messages", "Schedule", */ "Venues"],
      searchPlaceholder: "Search for venues",
      isLogIn: true,
      email: "",
      password: "",
      createAccount: false,
      rememberMe: false,
      firstName: "",
      lastName: "",
      openModal: false,
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  computed: {
    modalTitle() {
      return this.isLogIn ? "Log In" : "Join Evenue";
    },
  },
  watch: {
    isLogIn() {
      this.email = "";
      this.password = "";
      this.createAccount = false;
      this.rememberMe = false;
      this.firstName = "";
      this.lastName = "";
    },
  },
  methods: {
    logIn() {
      //
      this.openModal = false
    },
    signUp() {
      //
      this.openModal = false
    },
    showVenueList() {
      this.$router.push({ path: `/venues/yours` })
    },
    toggleModal() {
      this.openModal = !this.openModal;
    },
    async showProfile() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        console.log(currentUser)
        this.user = currentUser
        if (this.user) {
          this.$router.push({ path: `/profile` })
        }
        else {
          this.openModal = true;
        }
      }
      catch (err) {
        console.log(err)
        this.openModal = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
amplify-authenticator {
  --container-height: 50vh;
  --box-shadow: none;
}
>>> button[class^="Button__button"] {
    background-color: #37375D;
}
>>> a {
    color: #37375D;
}
.sf-search-bar__input {
  border-width: 0 0 1px 0;
}
</style>
