/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAthlete = /* GraphQL */ `
  subscription OnCreateAthlete {
    onCreateAthlete {
      firstName
      lastName
      mobilePhone
      athleteTag
      bio
      profilePhotoUri
      heroPhotoUri
      email
      level
      sport {
        name
        airTableId
        isActive
      }
      team {
        name
        airTableId
        isActive
      }
      address {
        streetAddress
        apt
        city
        state
        zipCode
      }
      dateOfBirth
      accounts {
        nextToken
      }
      unitLookup {
        appId
        custId
      }
      podSettings {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      plaidToken
      plaidProcessorToken {
        plaidAccountId
        processorToken
      }
      wyreId
      isActive
      handle
      socialHandles {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAthlete = /* GraphQL */ `
  subscription OnUpdateAthlete {
    onUpdateAthlete {
      firstName
      lastName
      mobilePhone
      athleteTag
      bio
      profilePhotoUri
      heroPhotoUri
      email
      level
      sport {
        name
        airTableId
        isActive
      }
      team {
        name
        airTableId
        isActive
      }
      address {
        streetAddress
        apt
        city
        state
        zipCode
      }
      dateOfBirth
      accounts {
        nextToken
      }
      unitLookup {
        appId
        custId
      }
      podSettings {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      plaidToken
      plaidProcessorToken {
        plaidAccountId
        processorToken
      }
      wyreId
      isActive
      handle
      socialHandles {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAthlete = /* GraphQL */ `
  subscription OnDeleteAthlete {
    onDeleteAthlete {
      firstName
      lastName
      mobilePhone
      athleteTag
      bio
      profilePhotoUri
      heroPhotoUri
      email
      level
      sport {
        name
        airTableId
        isActive
      }
      team {
        name
        airTableId
        isActive
      }
      address {
        streetAddress
        apt
        city
        state
        zipCode
      }
      dateOfBirth
      accounts {
        nextToken
      }
      unitLookup {
        appId
        custId
      }
      podSettings {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      plaidToken
      plaidProcessorToken {
        plaidAccountId
        processorToken
      }
      wyreId
      isActive
      handle
      socialHandles {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAthleteAccount = /* GraphQL */ `
  subscription OnCreateAthleteAccount {
    onCreateAthleteAccount {
      athlete {
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
      unitAccountId
      routingCode
      accountNumber
      podName
      id
      createdAt
      updatedAt
      athleteAccountsId
    }
  }
`;
export const onUpdateAthleteAccount = /* GraphQL */ `
  subscription OnUpdateAthleteAccount {
    onUpdateAthleteAccount {
      athlete {
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
      unitAccountId
      routingCode
      accountNumber
      podName
      id
      createdAt
      updatedAt
      athleteAccountsId
    }
  }
`;
export const onDeleteAthleteAccount = /* GraphQL */ `
  subscription OnDeleteAthleteAccount {
    onDeleteAthleteAccount {
      athlete {
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
      unitAccountId
      routingCode
      accountNumber
      podName
      id
      createdAt
      updatedAt
      athleteAccountsId
    }
  }
`;
export const onCreateRecentTransaction = /* GraphQL */ `
  subscription OnCreateRecentTransaction {
    onCreateRecentTransaction {
      transactionId
      athleteId
      status
      amount
      direction
      createdAt
      read
      settled
      podAllocation {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      id
      updatedAt
    }
  }
`;
export const onUpdateRecentTransaction = /* GraphQL */ `
  subscription OnUpdateRecentTransaction {
    onUpdateRecentTransaction {
      transactionId
      athleteId
      status
      amount
      direction
      createdAt
      read
      settled
      podAllocation {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      id
      updatedAt
    }
  }
`;
export const onDeleteRecentTransaction = /* GraphQL */ `
  subscription OnDeleteRecentTransaction {
    onDeleteRecentTransaction {
      transactionId
      athleteId
      status
      amount
      direction
      createdAt
      read
      settled
      podAllocation {
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      id
      updatedAt
    }
  }
`;
export const onCreateSocialHandle = /* GraphQL */ `
  subscription OnCreateSocialHandle {
    onCreateSocialHandle {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const onUpdateSocialHandle = /* GraphQL */ `
  subscription OnUpdateSocialHandle {
    onUpdateSocialHandle {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const onDeleteSocialHandle = /* GraphQL */ `
  subscription OnDeleteSocialHandle {
    onDeleteSocialHandle {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const onCreateEmailChallenge = /* GraphQL */ `
  subscription OnCreateEmailChallenge {
    onCreateEmailChallenge {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEmailChallenge = /* GraphQL */ `
  subscription OnUpdateEmailChallenge {
    onUpdateEmailChallenge {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEmailChallenge = /* GraphQL */ `
  subscription OnDeleteEmailChallenge {
    onDeleteEmailChallenge {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
      sponsor
      title
      category
      heroPhotoUri
      logoUri
      tagline
      description
      dateTime
      location
      reward
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
      sponsor
      title
      category
      heroPhotoUri
      logoUri
      tagline
      description
      dateTime
      location
      reward
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
      sponsor
      title
      category
      heroPhotoUri
      logoUri
      tagline
      description
      dateTime
      location
      reward
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInvite = /* GraphQL */ `
  subscription OnCreateInvite {
    onCreateInvite {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInvite = /* GraphQL */ `
  subscription OnUpdateInvite {
    onUpdateInvite {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInvite = /* GraphQL */ `
  subscription OnDeleteInvite {
    onDeleteInvite {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLearn = /* GraphQL */ `
  subscription OnCreateLearn {
    onCreateLearn {
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
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLearn = /* GraphQL */ `
  subscription OnUpdateLearn {
    onUpdateLearn {
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
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLearn = /* GraphQL */ `
  subscription OnDeleteLearn {
    onDeleteLearn {
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
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOpportunity = /* GraphQL */ `
  subscription OnCreateOpportunity {
    onCreateOpportunity {
      id
      categories
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
      details
      detailsTldr
      endDateTime
      eventType
      heroPhotoUri
      isPrivate
      location {
        lat
        lon
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
      }
      logoUri
      onlineReserved
      onlineTotal
      organizations {
        nextToken
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
      status
      subtitle
      tags
      title
      timezone
      websitePrompt
      websiteUrl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOpportunity = /* GraphQL */ `
  subscription OnUpdateOpportunity {
    onUpdateOpportunity {
      id
      categories
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
      details
      detailsTldr
      endDateTime
      eventType
      heroPhotoUri
      isPrivate
      location {
        lat
        lon
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
      }
      logoUri
      onlineReserved
      onlineTotal
      organizations {
        nextToken
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
      status
      subtitle
      tags
      title
      timezone
      websitePrompt
      websiteUrl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOpportunity = /* GraphQL */ `
  subscription OnDeleteOpportunity {
    onDeleteOpportunity {
      id
      categories
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
      details
      detailsTldr
      endDateTime
      eventType
      heroPhotoUri
      isPrivate
      location {
        lat
        lon
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
      }
      logoUri
      onlineReserved
      onlineTotal
      organizations {
        nextToken
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
      status
      subtitle
      tags
      title
      timezone
      websitePrompt
      websiteUrl
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePhoneChallenge = /* GraphQL */ `
  subscription OnCreatePhoneChallenge {
    onCreatePhoneChallenge {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePhoneChallenge = /* GraphQL */ `
  subscription OnUpdatePhoneChallenge {
    onUpdatePhoneChallenge {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePhoneChallenge = /* GraphQL */ `
  subscription OnDeletePhoneChallenge {
    onDeletePhoneChallenge {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReward = /* GraphQL */ `
  subscription OnCreateReward {
    onCreateReward {
      id
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
      title
      wealthAmount
      logoUri
      description
      heroPhotoUri
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReward = /* GraphQL */ `
  subscription OnUpdateReward {
    onUpdateReward {
      id
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
      title
      wealthAmount
      logoUri
      description
      heroPhotoUri
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReward = /* GraphQL */ `
  subscription OnDeleteReward {
    onDeleteReward {
      id
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
      title
      wealthAmount
      logoUri
      description
      heroPhotoUri
      createdAt
      updatedAt
    }
  }
`;
