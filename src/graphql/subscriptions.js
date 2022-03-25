/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAthlete = /* GraphQL */ `
  subscription OnCreateAthlete {
    onCreateAthlete {
      firstName
      lastName
      mobilePhone
      athleteTag
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
        email
        level
        dateOfBirth
        plaidToken
        wyreId
        isActive
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
        email
        level
        dateOfBirth
        plaidToken
        wyreId
        isActive
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
        email
        level
        dateOfBirth
        plaidToken
        wyreId
        isActive
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
export const onCreateLocationDetail = /* GraphQL */ `
  subscription OnCreateLocationDetail {
    onCreateLocationDetail {
      address
      unit
      city
      state
      zipCode
      country
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocationDetail = /* GraphQL */ `
  subscription OnUpdateLocationDetail {
    onUpdateLocationDetail {
      address
      unit
      city
      state
      zipCode
      country
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocationDetail = /* GraphQL */ `
  subscription OnDeleteLocationDetail {
    onDeleteLocationDetail {
      address
      unit
      city
      state
      zipCode
      country
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      lat
      lon
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      lat
      lon
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      lat
      lon
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
      title
      subtitle
      logoPath
      backgroundPath
      organizationId
      websiteUrl
      websitePrompt
      location {
        lat
        lon
        id
        createdAt
        updatedAt
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
        id
        createdAt
        updatedAt
      }
      details
      detailsTldr
      startDateTime
      endDateTime
      timezone
      eventType
      inPerson
      categories
      tags
      seatsTotal
      seatsReserved
      isPrivate
      status
      reward
      rewardDetails
      creator
      createdDateTime
      updatedDateTime
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOpportunity = /* GraphQL */ `
  subscription OnUpdateOpportunity {
    onUpdateOpportunity {
      id
      title
      subtitle
      logoPath
      backgroundPath
      organizationId
      websiteUrl
      websitePrompt
      location {
        lat
        lon
        id
        createdAt
        updatedAt
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
        id
        createdAt
        updatedAt
      }
      details
      detailsTldr
      startDateTime
      endDateTime
      timezone
      eventType
      inPerson
      categories
      tags
      seatsTotal
      seatsReserved
      isPrivate
      status
      reward
      rewardDetails
      creator
      createdDateTime
      updatedDateTime
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOpportunity = /* GraphQL */ `
  subscription OnDeleteOpportunity {
    onDeleteOpportunity {
      id
      title
      subtitle
      logoPath
      backgroundPath
      organizationId
      websiteUrl
      websitePrompt
      location {
        lat
        lon
        id
        createdAt
        updatedAt
      }
      locationDetail {
        address
        unit
        city
        state
        zipCode
        country
        name
        id
        createdAt
        updatedAt
      }
      details
      detailsTldr
      startDateTime
      endDateTime
      timezone
      eventType
      inPerson
      categories
      tags
      seatsTotal
      seatsReserved
      isPrivate
      status
      reward
      rewardDetails
      creator
      createdDateTime
      updatedDateTime
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
