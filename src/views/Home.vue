<template>
  <div id="home">
    <SfHero class="hero">
      <SfHeroItem
        v-for="(img, index) in heroes"
        :key="index"
        :image="img.image"
        :title="img.title"
        :subtitle="img.subtitle"
        :button-text="img.buttonText"
        :background="img.background"
        :class="img.className"
      />
    </SfHero>
    <SfBannerGrid class="banner-grid">
      <template v-for="banner in banners" #[banner.slot]>
        <SfBanner
          :key="banner.slot"
          :title="banner.title"
          :subtitle="banner.subtitle"
          :description="banner.description"
          :button-text="banner.buttonText"
          :image="banner.image"
          :class="banner.class"
          @click="showVenueSearch('workshop')"
        >
          <template #title>
            <SfHeading
              :title="banner.title"
              :level="2"
              class="sf-heading--no-underline sf-heading--left sf-banner__title"
            />
          </template>
          <template #subtitle>
            <span class="banner-grid__subtitle">{{ banner.subtitle }}</span>
          </template>
        </SfBanner>
      </template>
    </SfBannerGrid>
    <SfCallToAction
      class="call-to-action"
      title="Do you need some help finding a space?"
      description="
        Every workshop gets matched to one of our experts who'll help bring your idea to life.
        If you need help to find a space just contact us.
      "
      button-text="ASK FOR SUGGESTIONS"
      image="https://picsum.photos/id/1029/1024"
    />
    <div class="match-with-it">
      <p class="match-with-it__paragraph">Popular spaces</p>
      <SfButton class="sf-button--text smartphone-only">See all</SfButton>
    </div>
    <SfCarousel
      :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      class="carousel"
    >
      <SfCarouselItem
        v-for="(product, index) in products"
        :key="index"
        class="carousel__item"
      >
        <SfProductCard
          :image="product.image"
          :title="product.title"
          :regular-price="product.price.regular"
          :special-price="product.price.special"
          :score-rating="product.rating.score"
          :max-rating="product.rating.max"
          :is-in-wishlist="product.isInWishlist"
          :show-add-to-cart-button="false"
          :reviews-count="product.reviews"
          :badge-label="product.badgeLabel"
          :badge-color="product.badgeColor"
          @click:wishlist="toggleWishlist(index)">
          <template v-slot:add-to-cart-icon>
            <SfIcon
              key="add_to_cart"
              icon="more"
              size="16px"
              color="white"
            />
          </template>
        </SfProductCard>
      </SfCarouselItem>
    </SfCarousel>
    <SfSection
      title-heading="What people think"
      subtitle-heading="#YOURTHOUGHTS"
      class="share-your-look"
    >
    </SfSection>
    <SfBanner
      class="app-banner desktop-only"
      subtitle="Book quickly everywhere"
      image="https://picsum.photos/id/1058/1024"
      data-testid="application-banner"
    >
      <template #title>
        <span class="app-banner__title"
          >Download our application to your mobile</span
        >
      </template>
      <template #call-to-action>
        <div class="app-banner__call-to-action">
          <SfButton
            class="app-banner__button sf-banner__call-to-action"
            aria-label="Go to Apple Product"
            data-testid="banner-cta-button"
          >
            <SfImage
              src="https://docs.storefrontui.io/assets/storybook/Home/apple.png"
              alt="Apple"
              :width="134"
              :height="44"
            />
          </SfButton>
          <SfButton
            class="app-banner__button sf-banner__call-to-action"
            aria-label="Go to Google Product"
            data-testid="banner-cta-button"
          >
            <SfImage
              src="https://docs.storefrontui.io/assets/storybook/Home/google.png"
              alt="Google"
              :width="134"
              :height="44"
            />
          </SfButton>
        </div>
      </template>
    </SfBanner>
  </div>
</template>

<script>
import {
  SfButton,
  SfHero,
  SfBannerGrid,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfHeading,
  SfIcon,
} from "@storefront-ui/vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";

export default {
  name: "Home",
  components: {
    SfButton,
    SfHero,
    SfBannerGrid,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfHeading,
    SfIcon,
  },
  data() {
    return {
      headingTitle: {
        mobile: "Top venues",
        desktop: "Top venues",
      },
      heroes: [
        {
          title: "Rent meeting rooms with just a few clicks",
          subtitle: "CURATED SPACES FOR YOU",
          buttonText: "Learn more",
          background: "rgb(236, 239, 241)",
          image: "https://picsum.photos/id/293/1024",
        },
        {
          title: "All over the world",
          subtitle: "CURATED SPACES FOR YOU",
          buttonText: "Learn more",
          background: "rgb(239, 235, 233)",
          image: "https://picsum.photos/id/380/1024",
          className:
            "sf-hero-item--position-bg-top-left sf-hero-item--align-right",
        },
        {
          title: "Find your perfect meeting space",
          subtitle: "CURATED SPACES FOR YOU",
          buttonText: "Learn more",
          background: "rgb(236, 239, 241)",
          image: "https://picsum.photos/id/317/1024",
        },
      ],
      banners: [
        {
          slot: "banner-A",
          subtitle: "Hotel meetings",
          title: "Hotel meetings",
          description:
            "Access our portfolio of major brands and boutique hotel meeting spaces worldwide.",
          buttonText: "Check them out",
          image: "https://picsum.photos/id/100/1024",
          class: "desktop-only",
        },
        {
          slot: "banner-B",
          subtitle: "Remote workspaces",
          title: "Remote workspaces",
          description:
            "Our remote workspaces help businesses re-enter the workplace safely.",
          buttonText: "Check them out",
          image: "https://picsum.photos/id/101/1024",
          class: "desktop-only",
        },
        {
          slot: "banner-C",
          subtitle: "Workshops",
          title: "Meeting, Conference and Seminar",
          description:
            "Meet in easy-to-book, unique seminar rooms with different layouts.",
          buttonText: "Check them out",
          image: "https://picsum.photos/id/1081/216/326",
        },
        {
          slot: "banner-D",
          subtitle: "Events",
          title: "Meeting, Work Session, Networking Event",
          description:
            "Discover our collection of impressive event venues at your fingertip.",
          buttonText: "Check them out",
          image: "https://picsum.photos/id/256/216/326",
        },
      ],
      products: [
        {
          title: "Collection Business Center",
          id: 1,
          description: "Modern conference room in the Nextower",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$40.00" },
          rating: { max: 5, score: 5 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: true,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Fabrique Coworking Space",
          id: 2,
          description: "Unusual studio loft in the creative district of Oberhafen",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$30.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "-10%",
          badgeColor: "color-primary",
        },
        {
          title: "Allkinds",
          id: 3,
          description: "Bright conference room for productive workshops in Ottensen",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$50.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "FINE GERMAN SPACE",
          id: 4,
          description: "Chic and stylish meeting room with glass wall",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$50.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "juggleHUB",
          id: 5,
          description: "Creative seminar room in Prenzlauer Berg coworking space",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$30.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Collection Business Center",
          id: 6,
          description: "Luxurious office with a scenic view",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$50.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Penthouse-Loft, Mitte",
          id: 7,
          description: "Sun-drenched penthouse loft in Berlin Mitte with amazing skyline view",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$60.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "-25%",
          badgeColor: "color-primary",
        },
        {
          title: "BAZE Business Center",
          id: 8,
          description: "Cozy business lounge for small coachings",
          image: "https://picsum.photos/id/1031/216/326",
          price: { regular: "$60.00" },
          rating: { max: 5, score: 4 },
          reviews: Math.floor(Math.random() * 13),
          isInWishlist: false,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
      ],
    };
  },
  computed: {
    ...mapMobileObserver(),
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
  methods: {
    toggleWishlist(index) {
      return (this.products[index].isInWishlist =
        !this.products[index].isInWishlist);
    },
    showVenueSearch(eventType) {
      this.$router.push({ path: `/venues/search`, query: { event: eventType }})
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.hero {
  --hero-item-background-position: center;
}
.match-with-it {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: var(--spacer-xl);
  font-size: var(--h3-font-size);
  font-family: var(--font-family--secondary);
  font-weight: var(--font-weight--bold);
  border-bottom: solid 1px var(--c-light);
  &__paragraph {
    margin-bottom: var(--spacer-xs);
  }
  @include for-desktop {
    border: none;
    justify-content: center;
    font-weight: var(--font-weight--semibold);
  }
}
.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}
.banner-grid {
  margin: var(--spacer-base) 0;
  --banner-container-width: 50%;
  &__subtitle {
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    font-family: var(--font-family--secondary);
    color: var(--c-gray);
    text-transform: uppercase;
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}
.share-your-look {
  --heading-title-font-weight: var(--font-weight--semibold);
  @include for-desktop {
    --section-margin: var(--spacer-2xl) 0;
  }
}
.call-to-action {
  display: flex;
}
.instagram-grid {
  display: flex;
  max-height: 20.625rem;
  width: 100%;
  justify-content: center;
  margin: 0;
  @include for-desktop {
    max-height: 40.625rem;
    max-width: 60rem;
    margin: 0 auto;
  }
  &__row {
    display: flex;
    flex-direction: column;
  }
  .gap {
    margin-left: var(--spacer-xs);
    @include for-desktop {
      margin-left: var(--spacer-sm);
    }
  }
  &__col {
    width: 10rem;
    height: 10rem;
    @include for-desktop {
      &.small {
        height: 10rem;
      }
      width: 29.375rem;
      height: 29.375rem;
    }
    & + & {
      margin-top: var(--spacer-xs);
      @include for-desktop {
        margin-top: var(--spacer-sm);
      }
    }
  }
}
.app-banner {
  --banner-container-width: 100%;
  --banner-padding: 0 var(--spacer-2xl);
  --banner-subtitle-font-size: var(--font-size--xl);
  --banner-subtitle-font-weight: var(--font-weight--medium);
  --banner-subtitle-text-transform: capitalize;
  &__title {
    margin: var(--spacer-base) 0 var(--spacer-xl) 0;
    font-size: var(--h1-font-size);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--semibold);
    text-transform: capitalize;
  }
  display: block;
  min-height: 26.25rem;
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 calc(25% + var(--spacer-2xl)) 0 var(--spacer-xl);
  &__call-to-action {
    --button-background: transparent;
    display: flex;
  }
  &__button {
    --image-width: 8.375rem;
    --image-height: 2.75rem;
    --button-padding: 0;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
    }
  }
}
</style>
