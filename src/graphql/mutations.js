/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processBooking = /* GraphQL */ `
  mutation ProcessBooking($input: CreateBookingInput!) {
    processBooking(input: $input)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createVenue = /* GraphQL */ `
  mutation CreateVenue(
    $input: CreateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    createVenue(input: $input, condition: $condition) {
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
export const updateVenue = /* GraphQL */ `
  mutation UpdateVenue(
    $input: UpdateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    updateVenue(input: $input, condition: $condition) {
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
export const deleteVenue = /* GraphQL */ `
  mutation DeleteVenue(
    $input: DeleteVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    deleteVenue(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
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
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
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
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
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
