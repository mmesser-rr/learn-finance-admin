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