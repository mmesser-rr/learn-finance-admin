/* eslint-disable */

export const getOpportunityFormData = /* GraphQL */ `
  query getOpportunity($id: ID!) {
    getOpportunity(id: $id) {
      id
      categories
      createdAt
      creator {
        id
        handle
      }
      creatorId
      details
      detailsTldr
      endDateTime
      eventType
      heroPhotoUri
      isPrivate
      locationDetail {
        address
        city
        country
        name
        state
        unit
        zipCode
      }
      logoUri
      onlineReserved
      onlineTotal
      organizations {
        items {
          id
          displayName
          relationshipType
        }
      }
      orgs {
        displayName
        relationshipType
      }
      registrationUrl
      reward
      rewardDetails
      seatsReserved
      seatsTotal
      startDateTime
      subtitle
      status
      tags
      timezone
      title
      updatedAt
      websitePrompt
      websiteUrl
    }
  }
`;

export const getCustomLearn = /* GraphQL */ `
  query GetLearn($id: ID!) {
    getLearn(id: $id) {
      creatorId
      creator {
        firstName
        lastName
        mobilePhone
        athleteTag
        bio
        profilePhotoUri
        heroPhotoUri
        email
        level
        dateOfBirth
        plaidToken
        wyreId
        isActive
        handle
        id
        createdAt
        updatedAt
      }
      bgImageUri
      sponsor
      title
      level
      reward
      deposits {
        videoUri
        title
        questions {
          questionText
          answers
          correctAnswer
        }
      }
      id
      createdAt
      updatedAt
    }
  }
`;