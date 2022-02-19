/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      name
      profile {
        firstName
        lastName
        email
        phone
        picture {
          name
        }
      }
      reviews {
        items {
          rating
          comment
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      name
      profile {
        firstName
        lastName
        email
        phone
        picture {
          name
        }
      }
      reviews {
        items {
          rating
          comment
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      name
      profile {
        firstName
        lastName
        email
        phone
        picture {
          name
        }
      }
      reviews {
        items {
          rating
          comment
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
export const onCreateVenue = /* GraphQL */ `
  subscription OnCreateVenue($owner: String) {
    onCreateVenue(owner: $owner) {
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
          comment
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
export const onUpdateVenue = /* GraphQL */ `
  subscription OnUpdateVenue($owner: String) {
    onUpdateVenue(owner: $owner) {
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
          comment
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
export const onDeleteVenue = /* GraphQL */ `
  subscription OnDeleteVenue($owner: String) {
    onDeleteVenue(owner: $owner) {
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
          comment
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview($owner: String) {
    onCreateReview(owner: $owner) {
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
        profile {
          firstName
          lastName
          email
          phone
        }
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      comment
      id
      createdAt
      updatedAt
      userReviewsId
      venueReviewsId
      owner
    }
  }
`;
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview($owner: String) {
    onUpdateReview(owner: $owner) {
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
        profile {
          firstName
          lastName
          email
          phone
        }
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      comment
      id
      createdAt
      updatedAt
      userReviewsId
      venueReviewsId
      owner
    }
  }
`;
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview($owner: String) {
    onDeleteReview(owner: $owner) {
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
        profile {
          firstName
          lastName
          email
          phone
        }
        reviews {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      rating
      comment
      id
      createdAt
      updatedAt
      userReviewsId
      venueReviewsId
      owner
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking($owner: String) {
    onCreateBooking(owner: $owner) {
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
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking($owner: String) {
    onUpdateBooking(owner: $owner) {
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
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking($owner: String) {
    onDeleteBooking(owner: $owner) {
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
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
