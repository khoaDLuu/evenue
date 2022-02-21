/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview($owner: String) {
    onCreateReview(owner: $owner) {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview($owner: String) {
    onUpdateReview(owner: $owner) {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview($owner: String) {
    onDeleteReview(owner: $owner) {
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
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking($owner: String) {
    onCreateBooking(owner: $owner) {
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
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking($owner: String) {
    onUpdateBooking(owner: $owner) {
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
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking($owner: String) {
    onDeleteBooking(owner: $owner) {
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
