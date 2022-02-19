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
          :link="`/${category}`"
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
        <div
          v-if="isLogIn"
          key="log-in"
          class="modal-content"
          data-testid="login-modal"
        >
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
              :level="2"
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
        </div>
        <div
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
        </div>
      </transition>
    </SfModal>
  </div>
</template>

<script>
import {
  SfHeader,
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfHeading,
} from "@storefront-ui/vue";
import { Auth } from 'aws-amplify'

export default {
  name: 'NavBar',
  components: {
    SfHeader,
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfHeading,
  },
  data() {
    return {
      isMobile: false,
      appLogo: "/assets/logo.png",
      appName: "Evenue",
      rootCategories: ["Bookings", "Messages", "Schedule", "Venues"],
      searchPlaceholder: "Search for venues",
      user: undefined,
      isLogIn: true,
      email: "",
      password: "",
      createAccount: false,
      rememberMe: false,
      firstName: "",
      lastName: "",
      openModal: false,
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
    showVenueList() {
      this.$router.push({ path: `/venues/yours` })
    },
    toggleModal() {
      this.openModal = !this.openModal;
    },
    async showProfile() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        this.user = currentUser
        this.$router.push({ path: `/profile` })
      }
      catch (err) {
        console.log(err)
        this.toggleModal()
      }
    }
  }
};
</script>

<style scoped>
.sf-search-bar__input {
  border-width: 0 0 1px 0;
}
</style>
