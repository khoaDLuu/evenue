/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      name
      reviews {
        items {
          rating
          review
          id
          createdAt
          updatedAt
          userReviewsId
          venueReviewsId
          owner
        }
        nextToken
      }
      id
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
      name
      reviews {
        items {
          rating
          review
          id
          createdAt
          updatedAt
          userReviewsId
          venueReviewsId
          owner
        }
        nextToken
      }
      id
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
      name
      reviews {
        items {
          rating
          review
          id
          createdAt
          updatedAt
          userReviewsId
          venueReviewsId
          owner
        }
        nextToken
      }
      id
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
          rating
          review
          id
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
          rating
          review
          id
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
          rating
          review
          id
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
      user {
        name
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      review
      id
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
      user {
        name
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      review
      id
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
      user {
        name
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      review
      id
      createdAt
      updatedAt
      userReviewsId
      venueReviewsId
      owner
    }
  }
`;
