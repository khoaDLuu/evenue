<template>
  <div class="shadow">
    <SfHeader
      :logo="appLogo"
      :title="appName"
      :search-placeholder="searchPlaceholder"
      :search-value="searchValue"
      cartIcon="list"
      active-icon="cart"
      @click:cart="showVenueList"
      @click:account="showProfile"
      @click:wishlist="openFavListPage">
      <template #navigation>
        <!-- use v-show to hide protected links from guest users -->
        <SfHeaderNavigationItem
          v-for="(category, key) in rootCategories"
          :key="`sf-header-navigation-item-${key}`"
          v-show="!!user || category == 'Discover'"
          :link="category == 'Discover' ? `/venues/search` : (category == 'Events' ? `/events` : `/bookings/yours`)"
          :label="category"
        />
      </template>
      <template #search="{ searchValue: searchVal, searchPlaceholder }">
        <SfSearchBar
          :value="searchVal"
          :placeholder="searchPlaceholder"
          aria-label="Search"
          class="sf-header__search"
          @input="searchValue = $event"
          @keyup.enter="openSearchResults(searchValue)"
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
        <amplify-authenticator username-alias="email"></amplify-authenticator>
      </transition>
    </SfModal>
  </div>
</template>

<script>
import {
  SfHeader,
  SfModal,
  SfSearchBar,
} from "@storefront-ui/vue"
import { Auth, Hub } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'NavBar',
  components: {
    SfHeader,
    SfModal,
    SfSearchBar,
  },
  data() {
    return {
      isMobile: false,
      appLogo: "/assets/logo.png",
      appName: "Evenue",
      rootCategories: ["Bookings", "Events",/* "Messages", "Schedule", */ "Discover"],
      searchPlaceholder: "Search for venues",
      searchValue: "",
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
      currentNavRoute: undefined,
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
  async created() {
    try {
      this.user = await Auth.currentAuthenticatedUser()
    }
    catch (err) { console.log(err) }

    // const vm = this ??
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
      if (this.user && this.user?.username) {
        this.openModal = false
        if (this.$route.path !== this.currentNavRoute && !window.location.href.includes("bookings/new") /* dirty hack again */) {
          // To avoid error: NavigationDuplicated: Avoided redundant navigation to current location
          this.$router.push({ path: this.currentNavRoute })
        }
      }
    })
    // try {
    //   const currentUser = await Auth.currentAuthenticatedUser()
    //   console.log(currentUser)
    //   this.user = currentUser
    // }
    // catch (err) {
    //   console.log(err)
    // }

    const vm = this
    Hub.listen('CustomAuth', (data) => {
      console.log(data)
      vm.openModal = true
    })
    Hub.listen('auth', async (data) => {
      try {
        vm.user = await Auth.currentAuthenticatedUser()
      }
      catch (err) { console.log(err) }

      switch (data.payload.event) {
        case 'signIn':
          break
        case 'signUp':
          break
        case 'signOut':
          vm.user = undefined
          break
        case 'signIn_failure':
          break
        case 'configured':
          break
        default:
          vm.user = undefined
      }
    })
  },
  beforeDestroy() {
    this.unsubscribeAuth()
  },
  methods: {
    logIn() {
      this.openModal = false
    },
    signUp() {
      this.openModal = false
    },
    toggleModal() {
      this.openModal = !this.openModal;
    },
    async navigate(path) {
      this.currentNavRoute = path
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        this.user = currentUser

        if (this.user) {
          this.$router.push({ path })
        }
        else {
          this.openModal = true
        }
      }
      catch (err) {
        console.log(err)
        this.openModal = true
      }
    },
    async showVenueList() {
      await this.navigate(`/venues/yours`)
    },
    async showProfile() {
      await this.navigate(`/profile`)
    },
    async openFavListPage() {
      await this.navigate(`/favorites`)
    },
    openSearchResults(searchValue) {
      console.log("Nav - searchVal", searchValue)
      if (window.location.href.includes("venues/search")) {
        Hub.dispatch(
          'OnPageSearch',
          {
            event: 'venueSearched',
            data: { searchValue },
            message: '',
          }
        )
      }
      else {
        this.$router.push({ path: '/venues/search', query: { searchValue }})
      }
    },
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
