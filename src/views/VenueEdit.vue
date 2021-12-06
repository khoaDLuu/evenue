<template>
  <div class="container mx-auto mt-4">
    <div class="flex w-11/12 md:w-full">
      <div class="w-3/10 pr-4">
        <div class="relative">
          <p class="text-3xl border-b-2 pb-4 pt-2.5 mb-6">Edit Venue</p>
          <p class="my-6 text-gray-900">
            A 'venue' is a building (or some other unified location) that has more than one space available to book.
          </p>
          <div class="absolute top-1.5 right-0">
            <building classes="text-green-400" />
          </div>
        </div>
        <div v-for="guideStep in guideSteps" :key="guideStep.number" class="relative">
          <div class="text-xl text-gray-600 border border-current rounded-full mr-2 inline-block align-middle">
            <div class="h-0 py-50p">
              <div class="transform -translate-y-2/4">{{ guideStep.number }}</div>
            </div>
          </div>
          <p class="text-xl text-gray-800 inline-block align-middle">{{ guideStep.title }}</p>
          <p class="text-sm text-gray-600">{{ guideStep.comment }}</p>
        </div>
      </div>

      <div class="w-7/10 border-l border-gray-300 pl-8">
        <div class="my-8">
          <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
        </div>
        <div id="form-template">
          <form class="form">
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Content</p>
            <SfInput
              v-model="firstName"
              label="Venue name"
              name="firstName"
              class="form__element form__element--half"
              required
              :valid="firstNameBlur || validFirstName(firstName)"
              error-message="Please type your name"
              @blur="firstNameBlur = false"
            />
            <SfInput
              v-model="lastName"
              label="Venue headline"
              name="lastName"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="lastNameBlur || validLastName(lastName)"
              error-message="Please type your last name. Your name should have at least one character."
              @blur="lastNameBlur = false"
            />
            <SfTextarea
              v-model="message"
              class="form__element max-w-full"
              label="Description"
              name="message"
              cols="120"
              rows="6"
              maxlength="400"
              minlength="10"
              wrap="soft"
              :readonly="true"
              placeholder="Type in the venue's description"
              required
              :valid="messageBlur || validMessage(message)"
              error-message="Please type minimum 10 characters and maximum 400."
              @blur="messageBlur = false"
            >
            </SfTextarea>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Address</p>
            <SfInput
              v-model="streetName"
              label="Street name"
              name="streetName"
              class="form__element form__element--half"
              required
              :valid="streetNameBlur || validStreetName(streetName)"
              error-message="Please type your street name"
              @blur="streetNameBlur = false"
            />
            <SfInput
              v-model="apartment"
              label="House/Apartment number"
              type="number"
              name="apartment"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="apartmentBlur || validApartment(apartment)"
              error-message="Please type your apartment/house number."
              @blur="apartmentBlur = false"
            />
            <SfInput
              v-model="city"
              label="City"
              name="city"
              class="form__element"
              required
              :valid="cityBlur || validCity(city)"
              error-message="Please type your city."
              @blur="cityBlur = false"
            />
            <SfInput
              v-model="zipCode"
              label="Zip code"
              name="zipCode"
              type="number"
              class="form__element form__element--half"
              required
              :valid="zipCodeBlur || validZipCode(zipCode)"
              error-message="Please type your zip code. Zipcode should have only numbers."
              @blur="zipCodeBlur = false"
            />
            <SfComponentSelect
              v-model="country"
              label="Country"
              class="
                form__element
                form__element--half
                form__element--half-even
                form__select
                sf-component-select--underlined
              "
              required
              :valid="countryBlur || validCountry(country)"
              error-message="Please choose your country."
              @blur="countryBlur = false"
            >
              <SfComponentSelectOption
                v-for="countryOption in countries"
                :key="countryOption"
                :value="countryOption"
              >
                {{ countryOption }}
              </SfComponentSelectOption>
            </SfComponentSelect>
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Contact</p>
            <!-- TODO: Should have default values as user's personal contact info -->
            <SfInput
              v-model="phoneNumber"
              label="Phone number"
              name="phone"
              type="number"
              class="form__element form__element--half"
              required
              :valid="phoneNumberBlur || validPhoneNumber(phoneNumber)"
              error-message="Please type your phone number."
              @blur="phoneNumberBlur = false"
            />
            <SfInput
              v-model="email"
              label="Email"
              name="email"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="emailBlur || validEmail(email)"
              error-message="Please enter a valid email address."
              @blur="emailBlur = false"
            />
            <p class="text-xl text-gray-800 font-semibold mt-4 w-full">Pricing</p>
            <SfHeading title="Prices" :level="5" />
            <SfRange
              v-model="range"
              class="form__element--range"
              :config="rangeConfig"
            />
            <div class="form__action mt-4">
              <SfButton type="submit" @click.prevent="publish">Publish</SfButton>
              <SfButton
                class="
                  sf-button color-secondary
                  form__action-button form__action-button--secondary
                " type="submit" @click.prevent="save">Save and go to list</SfButton>
              <SfButton
                class="
                  sf-button color-light
                  form__action-button form__action-button--secondary
                "
                @click="reset">Reset</SfButton
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfBreadcrumbs,
  SfInput,
  SfComponentSelect,
  SfButton,
  SfTextarea,
  SfHeading,
  SfRange,
} from "@storefront-ui/vue";
import Building from '../components/icons/Building.vue'

export default {
  name: "VenueEdit",
  components: {
    Building,
    SfBreadcrumbs,
    SfInput,
    SfComponentSelect,
    SfButton,
    SfTextarea,
    SfHeading,
    SfRange
  },
  props: {
    venue: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      guideSteps: [
        {
          number: 1,
          title: "Create your venue",
          comment: "Provide venue name.",
          done: true
        },
        {
          number: 2,
          title: "Provide required information",
          comment: "Required fields are marked with a red asterisk. Please remember to click save button at the bottom of the page.",
          done: false
        },
        {
          number: 3,
          title: "Publish your venue",
          comment: "After publishing make sure to add at least one space. You also have the possibility to add or refine information by editing your venue.",
          done: false
        }
      ],
      breadcrumbs: [
        {
          text: 'Venue List',
          link: '/venues/yours'
        },
        {
          text: '#:ID - Edit',
          link: '/venues/yours/:ID'
        }
      ],
      valid: false,
      submitted: false,
      firstName: "",
      firstNameBlur: true,
      lastName: "",
      lastNameBlur: true,
      streetName: "",
      streetNameBlur: true,
      apartment: "",
      apartmentBlur: true,
      city: "",
      cityBlur: true,
      state: "",
      stateBlur: true,
      zipCode: "",
      zipCodeBlur: true,
      country: "",
      countryBlur: true,
      phoneNumber: "",
      phoneNumberBlur: true,
      email: "",
      emailBlur: true,
      countries: [
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "The Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City",
      ],
      message: "",
      messageBlur: true,
      range: [0, 1],
      rangeConfig: {
        start: [10, 500],
        range: {
          min: 10,
          max: 1000,
        },
        step: 5,
        connect: true,
        direction: "ltr",
        orientation: "horizontal",
        behaviour: "tap-drag",
        tooltips: true,
        keyboardSupport: true,
        format: {
          to: function (range) {
            return new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(range);
          },
          from: function (range) {
            const parsedValue = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).formatToParts(range);
            return parsedValue[0].value;
          },
        },
      }
    }
  },
  methods: {
    validate() {
      this.firstNameBlur = false;
      this.lastNameBlur = false;
      this.streetNameBlur = false;
      this.apartmentBlur = false;
      this.cityBlur = false;
      this.zipCodeBlur = false;
      this.countryBlur = false;
      this.phoneNumberBlur = false;
      this.emailBlur = false;
      this.messageBlur = false;
      if (
        this.validEmail(this.email) &&
        this.validPhoneNumber(this.phoneNumber) &&
        this.validFirstName(this.firstName) &&
        this.validLastName(this.lastName) &&
        this.validStreetName(this.streetName) &&
        this.validApartment(this.apartment) &&
        this.validCity(this.city) &&
        this.validZipCode(this.zipCode) &&
        this.validCountry(this.country) &&
        this.validMessage(this.message)
      ) {
        this.valid = true;
      }
    },
    validFirstName(firstName) {
      return firstName.length > 2;
    },
    validLastName(lastName) {
      return lastName.length > 2;
    },
    validStreetName(streetName) {
      return streetName.length > 2;
    },
    validApartment(apartment) {
      const regex = /^[0-9]/;
      return regex.test(apartment);
    },
    validCity(city) {
      return !!city && city.length > 2;
    },
    validZipCode(zipCode) {
      const regex = /^[0-9]/;
      return regex.test(zipCode);
    },
    validCountry(country) {
      return !!country;
    },
    validPhoneNumber(phone) {
      const regex = /^[0-9]{9}$/;
      return regex.test(phone);
    },
    validEmail(email) {
      const regex = /(.+)@(.+){2,}\.(.+){2,}/;
      return regex.test(email.toLowerCase());
    },
    validMessage(message) {
      return !!message && message.length > 10 && message.length <= 400;
    },
    save() {
      this.validate();
      if (this.valid) {
        this.submitted = true;
      }
    },
    publish() {
      // TODO
      this.validate();
      if (this.valid) {
        this.submitted = true;
      }
    },
    reset() {
      this.email = "";
      this.phoneNumber = "";
      this.zipCode = "";
      this.country = "";
      this.streetName = "";
      this.city = "";
      this.lastName = "";
      this.firstName = "";
      this.apartment = "";
      this.message = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.py-50p {
  padding: 50% 10px;
}
#form-template {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 870px;
    margin: 0 auto;
  }
}
.form {
  padding: var(--spacer-sm) 0;
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__action-button {
    &:first-child {
      margin: var(--spacer-sm) 0 0 0;
    }
    &--secondary {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__button {
    --button-width: 100%;
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
      &--range {
        margin: var(--spacer-xl) var(--spacer-base) var(--spacer-2xl);
      }
      & textarea {
        @apply box-border max-w-full;
      }
    }
    &__action {
      flex: 0 0 100%;
      display: flex;
    }
    &__button {
      --button-width: auto;
    }
  }
}
</style>
