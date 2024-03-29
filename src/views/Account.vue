<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfLoader :loading="loading">
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile" data-testid="my-profile">
          <SfMyProfile
            :account="account"
            data-testid="my-profile-tabs"
            :personalInputsLabels="['Given name', 'Family Name', 'Email', 'Phone Number']"
            personalDataDescription="Edit any of your details below (except email) so your profile is always up to date:"
            @update:personal="updateUser"
            @update:password="changePassword">
            <template #password-change-description>
              <p class="message">
                Your current email address is
                <span class="message__label text-green-600">{{ account.email }}</span>.
                <br>
                If you want to change the password to access your account, enter the
                following information:<br />
              </p>
            </template>
            <template #personal-data-description="{ personalDataDescription }">
              <p class="message">
                {{ personalDataDescription }}
              </p>
              <SfInput
                v-model="additionalDetails.phone"
                label="Phone Number"
                name="phone"
                class="form__element"
              />
            </template>
            <template #personal-data-notice>
              <p class="notice">
                At <span class="text-sm text-green-600 font-semibold">Evenue</span>, we
                attach great importance to privacy issues and are
                committed to protecting the personal data of our users.
                Learn more about how we care and use your personal data in the
                <a href="" class="text-green-600">Privacy Policy.</a>
              </p>
            </template>
          </SfMyProfile>
        </SfContentPage>
        <!-- <SfContentPage title="Shipping details" data-testid="shipping-details">
          <SfShippingDetails
            :account="account"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @update:shipping="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage title="Newsletter">
          <SfMyNewsletter />
        </SfContentPage> -->
      </SfContentCategory>
      <SfContentCategory title="Booking details">
        <SfContentPage title="Booking history">
          <!-- <SfOrderHistory :orders="account.orders" /> -->
          <router-link to="/bookings/yours">
            <SfButton>
              Navigate to the booking list page
            </SfButton>
          </router-link>
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Log out" />
    </SfContentPages>
    </SfLoader>
  </div>
</template>

<script>
import {
  SfMyProfile,
  // SfShippingDetails,
  // SfMyNewsletter,
  // SfOrderHistory,
  SfInput,
  SfButton,
  SfBreadcrumbs,
  SfContentPages,
  SfLoader,
} from "@storefront-ui/vue";
import { countries } from "@storefront-ui/vue/src/components/templates/internalData.js";
import { Auth } from "aws-amplify"

export default {
  name: "MyAccount",
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMyProfile,
    // SfShippingDetails,
    // SfMyNewsletter,
    // SfOrderHistory,
    SfInput,
    SfButton,
    SfLoader,
  },
  data() {
    return {
      activePage: "My profile",
      breadcrumbs: [
        {
          text: "Home",
          link: "/",
        },
        {
          text: "My Account",
          link: "#",
        },
      ],
      account: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        // shipping: [
        //   {
        //     firstName: "John",
        //     lastName: "Dog",
        //     streetName: "Sezame Street",
        //     apartment: "24/193A",
        //     city: "Wroclaw",
        //     state: "Lower Silesia",
        //     zipCode: "53-540",
        //     country: "Poland",
        //     phoneNumber: "(00)560 123 456",
        //   },
        //   {
        //     firstName: "John",
        //     lastName: "Dog",
        //     streetName: "Sezame Street",
        //     apartment: "20/193A",
        //     city: "Wroclaw",
        //     state: "Lower Silesia",
        //     zipCode: "53-603",
        //     country: "Poland",
        //     phoneNumber: "(00)560 123 456",
        //   },
        // ],
        orders: [
          ["#45", "23th June, 2021", "Visa card", "$412.00", "Finalised"],
          ["#46", "26th June, 2021", "Paypal", "$132.00", "Finalised"],
          ["#47", "28th June, 2021", "Mastercard", "$12.00", "Finalised"],
          ["#48", "28th June, 2021", "Paypal", "$20.00", "In process"],
        ],
      },
      countries,
      additionalDetails: {
        phone: "",
      },
      loading: false,
    }
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      // this.account.firstName = user.attributes.given_name // not working!
      this.account = {
        ...this.account,
        firstName: user.attributes.given_name,
        lastName: user.attributes.family_name,
        email: user.attributes.email,
        phone: user.attributes.phone_number,
      }
      this.additionalDetails.phone = user.attributes.phone_number
    } catch (error) {
      console.log('error get auth user:', error);
    }
  },
  methods: {
    async changeActivePage(title) {
      if (title === "Log out") {
        this.loading = true
        try {
          await Auth.signOut()
          this.loading = false
          this.$router.push({ path: "/" })
        } catch (error) {
          console.log('error signing out: ', error);
        }
        return;
      }
      this.activePage = title;
    },
    async updateUser($event) {
      try {
        this.account = { ...this.account, ...$event, ...this.additionalDetails }
        console.log(this.account)
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
          'given_name': this.account.firstName || "",
          'family_name': this.account.lastName || "",
          'name': `${this.account.firstName || ""} ${this.account.lastName || ""}`,
          // 'email': this.account.email, // forbidden?
          'phone_number': this.account.phone,
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    async changePassword($event) {
      this.account = { ...this.account, ...$event }
      console.log(this.account)
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(user, 'oldPassword', 'newPassword');
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
