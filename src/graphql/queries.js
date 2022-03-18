/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const recommendVenues = /* GraphQL */ `
  query RecommendVenues($limit: Int) {
    recommendVenues(limit: $limit) {
      id
      name
      headline
      description
      photos {
        name
        fullsize {
          region
          bucket
          key
        }
        thumbnails {
          region
          bucket
          key
        }
      }
      city
      pricing {
        currency
        perHour {
          startHour
          endHour
          price
        }
        perDay
      }
      type {
        name
      }
      published
      capacity {
        unit
        floorSize
        recommendedGuestCount
      }
      reviews {
        id
        bookingId
        venue {
          id
          name
          headline
          description
          photos {
            name
            fullsize {
              region
              bucket
              key
            }
            thumbnails {
              region
              bucket
              key
            }
          }
          address
          city
          pricing {
            currency
            perHour {
              startHour
              endHour
              price
            }
            perDay
          }
          type {
            name
          }
          eventTypes
          published
          extras {
            name
            type
            price
          }
          capacity {
            unit
            floorSize
            recommendedGuestCount
          }
          operatingHours {
            daysOfWeek
            startHour
            endHour
          }
          reviews {
            items {
              id
              bookingId
              user
              userName
              rating
              comment
              createdAt
              updatedAt
              userReviewsId
              venueReviewsId
              owner
            }
            nextToken
          }
          owner
          createdAt
          updatedAt
        }
        user
        userName
        rating
        comment
        createdAt
        updatedAt
        userReviewsId
        venueReviewsId
        owner
      }
      owner
    }
  }
`;
export const getFavorite = /* GraphQL */ `
  query GetFavorite($id: ID!) {
    getFavorite(id: $id) {
      id
      venue {
        id
        name
        headline
        description
        photos {
          name
          fullsize {
            region
            bucket
            key
          }
          thumbnails {
            region
            bucket
            key
          }
        }
        address
        city
        pricing {
          currency
          perHour {
            startHour
            endHour
            price
          }
          perDay
        }
        type {
          name
        }
        eventTypes
        published
        extras {
          name
          type
          price
        }
        capacity {
          unit
          floorSize
          recommendedGuestCount
        }
        operatingHours {
          daysOfWeek
          startHour
          endHour
        }
        reviews {
          items {
            id
            bookingId
            venue {
              id
              name
              headline
              description
              address
              city
              eventTypes
              published
              owner
              createdAt
              updatedAt
            }
            user
            userName
            rating
            comment
            createdAt
            updatedAt
            userReviewsId
            venueReviewsId
            owner
          }
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      userId
      owner
      createdAt
      updatedAt
      favoriteVenueId
    }
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        venue {
          id
          name
          headline
          description
          photos {
            name
            fullsize {
              region
              bucket
              key
            }
            thumbnails {
              region
              bucket
              key
            }
          }
          address
          city
          pricing {
            currency
            perHour {
              startHour
              endHour
              price
            }
            perDay
          }
          type {
            name
          }
          eventTypes
          published
          extras {
            name
            type
            price
          }
          capacity {
            unit
            floorSize
            recommendedGuestCount
          }
          operatingHours {
            daysOfWeek
            startHour
            endHour
          }
          reviews {
            items {
              id
              bookingId
              user
              userName
              rating
              comment
              createdAt
              updatedAt
              userReviewsId
              venueReviewsId
              owner
            }
            nextToken
          }
          owner
          createdAt
          updatedAt
        }
        userId
        owner
        createdAt
        updatedAt
        favoriteVenueId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      profile {
        firstName
        lastName
        email
        phone
        picture {
          name
          fullsize {
            region
            bucket
            key
          }
          thumbnails {
            region
            bucket
            key
          }
        }
      }
      reviews {
        items {
          id
          bookingId
          venue {
            id
            name
            headline
            description
            photos {
              name
            }
            address
            city
            pricing {
              currency
              perDay
            }
            type {
              name
            }
            eventTypes
            published
            extras {
              name
              type
              price
            }
            capacity {
              unit
              floorSize
              recommendedGuestCount
            }
            operatingHours {
              daysOfWeek
              startHour
              endHour
            }
            reviews {
              nextToken
            }
            owner
            createdAt
            updatedAt
          }
          user
          userName
          rating
          comment
          createdAt
          updatedAt
          userReviewsId
          venueReviewsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        profile {
          firstName
          lastName
          email
          phone
          picture {
            name
            fullsize {
              region
              bucket
              key
            }
            thumbnails {
              region
              bucket
              key
            }
          }
        }
        reviews {
          items {
            id
            bookingId
            venue {
              id
              name
              headline
              description
              address
              city
              eventTypes
              published
              owner
              createdAt
              updatedAt
            }
            user
            userName
            rating
            comment
            createdAt
            updatedAt
            userReviewsId
            venueReviewsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getVenue = /* GraphQL */ `
  query GetVenue($id: ID!) {
    getVenue(id: $id) {
      id
      name
      headline
      description
      photos {
        name
        fullsize {
          region
          bucket
          key
        }
        thumbnails {
          region
          bucket
          key
        }
      }
      address
      city
      pricing {
        currency
        perHour {
          startHour
          endHour
          price
        }
        perDay
      }
      type {
        name
      }
      eventTypes
      published
      extras {
        name
        type
        price
      }
      capacity {
        unit
        floorSize
        recommendedGuestCount
      }
      operatingHours {
        daysOfWeek
        startHour
        endHour
      }
      reviews {
        items {
          id
          bookingId
          venue {
            id
            name
            headline
            description
            photos {
              name
            }
            address
            city
            pricing {
              currency
              perDay
            }
            type {
              name
            }
            eventTypes
            published
            extras {
              name
              type
              price
            }
            capacity {
              unit
              floorSize
              recommendedGuestCount
            }
            operatingHours {
              daysOfWeek
              startHour
              endHour
            }
            reviews {
              nextToken
            }
            owner
            createdAt
            updatedAt
          }
          user
          userName
          rating
          comment
          createdAt
          updatedAt
          userReviewsId
          venueReviewsId
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listVenues = /* GraphQL */ `
  query ListVenues(
    $filter: ModelVenueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        headline
        description
        photos {
          name
          fullsize {
            region
            bucket
            key
          }
          thumbnails {
            region
            bucket
            key
          }
        }
        address
        city
        pricing {
          currency
          perHour {
            startHour
            endHour
            price
          }
          perDay
        }
        type {
          name
        }
        eventTypes
        published
        extras {
          name
          type
          price
        }
        capacity {
          unit
          floorSize
          recommendedGuestCount
        }
        operatingHours {
          daysOfWeek
          startHour
          endHour
        }
        reviews {
          items {
            id
            bookingId
            venue {
              id
              name
              headline
              description
              address
              city
              eventTypes
              published
              owner
              createdAt
              updatedAt
            }
            user
            userName
            rating
            comment
            createdAt
            updatedAt
            userReviewsId
            venueReviewsId
            owner
          }
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchVenues = /* GraphQL */ `
  query SearchVenues(
    $filter: SearchableVenueFilterInput
    $sort: [SearchableVenueSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableVenueAggregationInput]
  ) {
    searchVenues(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        headline
        description
        photos {
          name
          fullsize {
            region
            bucket
            key
          }
          thumbnails {
            region
            bucket
            key
          }
        }
        address
        city
        pricing {
          currency
          perHour {
            startHour
            endHour
            price
          }
          perDay
        }
        type {
          name
        }
        eventTypes
        published
        extras {
          name
          type
          price
        }
        capacity {
          unit
          floorSize
          recommendedGuestCount
        }
        operatingHours {
          daysOfWeek
          startHour
          endHour
        }
        reviews {
          items {
            id
            bookingId
            venue {
              id
              name
              headline
              description
              address
              city
              eventTypes
              published
              owner
              createdAt
              updatedAt
            }
            user
            userName
            rating
            comment
            createdAt
            updatedAt
            userReviewsId
            venueReviewsId
            owner
          }
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      bookingId
      venue {
        id
        name
        headline
        description
        photos {
          name
          fullsize {
            region
            bucket
            key
          }
          thumbnails {
            region
            bucket
            key
          }
        }
        address
        city
        pricing {
          currency
          perHour {
            startHour
            endHour
            price
          }
          perDay
        }
        type {
          name
        }
        eventTypes
        published
        extras {
          name
          type
          price
        }
        capacity {
          unit
          floorSize
          recommendedGuestCount
        }
        operatingHours {
          daysOfWeek
          startHour
          endHour
        }
        reviews {
          items {
            id
            bookingId
            venue {
              id
              name
              headline
              description
              address
              city
              eventTypes
              published
              owner
              createdAt
              updatedAt
            }
            user
            userName
            rating
            comment
            createdAt
            updatedAt
            userReviewsId
            venueReviewsId
            owner
          }
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      user
      userName
      rating
      comment
      createdAt
      updatedAt
      userReviewsId
      venueReviewsId
      owner
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bookingId
        venue {
          id
          name
          headline
          description
          photos {
            name
            fullsize {
              region
              bucket
              key
            }
            thumbnails {
              region
              bucket
              key
            }
          }
          address
          city
          pricing {
            currency
            perHour {
              startHour
              endHour
              price
            }
            perDay
          }
          type {
            name
          }
          eventTypes
          published
          extras {
            name
            type
            price
          }
          capacity {
            unit
            floorSize
            recommendedGuestCount
          }
          operatingHours {
            daysOfWeek
            startHour
            endHour
          }
          reviews {
            items {
              id
              bookingId
              user
              userName
              rating
              comment
              createdAt
              updatedAt
              userReviewsId
              venueReviewsId
              owner
            }
            nextToken
          }
          owner
          createdAt
          updatedAt
        }
        user
        userName
        rating
        comment
        createdAt
        updatedAt
        userReviewsId
        venueReviewsId
        owner
      }
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      venueId
      user
      checkIn
      checkOut
      guestCount
      extras {
        extra {
          name
          type
          price
        }
        number
      }
      totalCharge
      paymentCurrency
      paymentToken
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        venueId
        user
        checkIn
        checkOut
        guestCount
        extras {
          extra {
            name
            type
            price
          }
          number
        }
        totalCharge
        paymentCurrency
        paymentToken
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
