/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listPlaidAccounts = /* GraphQL */ `
  query ListPlaidAccounts($athleteId: ID!) {
    listPlaidAccounts(athleteId: $athleteId) {
      account_id
      balances {
        available
        current
        iso_currency_code
        limit
        unofficial_currency_code
      }
      mask
      name
      official_name
      subtype
      type
    }
  }
`;
export const listAthletUnitAccounts = /* GraphQL */ `
  query ListAthletUnitAccounts($athleteId: ID!) {
    listAthletUnitAccounts(athleteId: $athleteId) {
      type
      id
      attributes {
        createdAt
        direction
        amount
        balance
        summary
        description
        name
        status
        routingNumber
        accountNumber
        currency
        hold
        available
      }
    }
  }
`;
export const getAthleteUnitAccountById = /* GraphQL */ `
  query GetAthleteUnitAccountById($athleteId: ID!, $unitAccountId: String!) {
    getAthleteUnitAccountById(
      athleteId: $athleteId
      unitAccountId: $unitAccountId
    ) {
      type
      id
      attributes {
        createdAt
        direction
        amount
        balance
        summary
        description
        name
        status
        routingNumber
        accountNumber
        currency
        hold
        available
      }
    }
  }
`;
export const getUnitTransactionById = /* GraphQL */ `
  query GetUnitTransactionById($athleteId: ID!, $unitTransactionId: String!) {
    getUnitTransactionById(
      athleteId: $athleteId
      unitTransactionId: $unitTransactionId
    ) {
      type
      id
      attributes {
        createdAt
        direction
        amount
        balance
        summary
        description
        name
        status
        routingNumber
        accountNumber
        currency
        hold
        available
      }
    }
  }
`;
export const listAllUnitTransactions = /* GraphQL */ `
  query ListAllUnitTransactions($athleteId: ID!) {
    listAllUnitTransactions(athleteId: $athleteId) {
      type
      id
      attributes {
        createdAt
        direction
        amount
        balance
        summary
        description
        name
        status
        routingNumber
        accountNumber
        currency
        hold
        available
      }
    }
  }
`;
export const nearbyOpportunities = /* GraphQL */ `
  query NearbyOpportunities(
    $location: LocationInput!
    $distInMeters: Int
    $limit: Int
    $nextToken: String
  ) {
    nearbyOpportunities(
      location: $location
      distInMeters: $distInMeters
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        subtitle
        logoPath
        backgroundPath
        organizationId
        websiteUrl
        websitePrompt
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
      total
      nextToken
    }
  }
`;
export const searchOpportunities = /* GraphQL */ `
  query SearchOpportunities(
    $filter: SearchableOpportunityFilterInput
    $sort: [SearchableOpportunitySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOpportunityAggregationInput]
  ) {
    searchOpportunities(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        subtitle
        logoPath
        backgroundPath
        organizationId
        websiteUrl
        websitePrompt
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
export const getAthlete = /* GraphQL */ `
  query GetAthlete($id: ID!) {
    getAthlete(id: $id) {
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
export const listAthletes = /* GraphQL */ `
  query ListAthletes(
    $filter: ModelAthleteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAthletes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAthleteAccount = /* GraphQL */ `
  query GetAthleteAccount($id: ID!) {
    getAthleteAccount(id: $id) {
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
export const listAthleteAccounts = /* GraphQL */ `
  query ListAthleteAccounts(
    $filter: ModelAthleteAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAthleteAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        unitAccountId
        routingCode
        accountNumber
        podName
        id
        createdAt
        updatedAt
        athleteAccountsId
      }
      nextToken
    }
  }
`;
export const getRecentTransaction = /* GraphQL */ `
  query GetRecentTransaction($id: ID!) {
    getRecentTransaction(id: $id) {
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
export const listRecentTransactions = /* GraphQL */ `
  query ListRecentTransactions(
    $filter: ModelRecentTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecentTransactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        transactionId
        athleteId
        status
        amount
        direction
        createdAt
        read
        settled
        id
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailChallenge = /* GraphQL */ `
  query GetEmailChallenge($code: String!, $email: String!) {
    getEmailChallenge(code: $code, email: $email) {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const listEmailChallenges = /* GraphQL */ `
  query ListEmailChallenges(
    $code: String
    $email: ModelStringKeyConditionInput
    $filter: ModelEmailChallengeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEmailChallenges(
      code: $code
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        code
        email
        verified
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInvite = /* GraphQL */ `
  query GetInvite($code: String!, $status: Status!) {
    getInvite(code: $code, status: $status) {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const listInvites = /* GraphQL */ `
  query ListInvites(
    $code: String
    $status: ModelStringKeyConditionInput
    $filter: ModelInviteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInvites(
      code: $code
      status: $status
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        code
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLocationDetail = /* GraphQL */ `
  query GetLocationDetail($id: ID!) {
    getLocationDetail(id: $id) {
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
export const listLocationDetails = /* GraphQL */ `
  query ListLocationDetails(
    $filter: ModelLocationDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocationDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      lat
      lon
      id
      createdAt
      updatedAt
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        lat
        lon
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunity = /* GraphQL */ `
  query GetOpportunity($id: ID!) {
    getOpportunity(id: $id) {
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
export const listOpportunities = /* GraphQL */ `
  query ListOpportunities(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        logoPath
        backgroundPath
        organizationId
        websiteUrl
        websitePrompt
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
      total
      nextToken
    }
  }
`;
export const getPhoneChallenge = /* GraphQL */ `
  query GetPhoneChallenge($code: String!, $phoneNumber: String!) {
    getPhoneChallenge(code: $code, phoneNumber: $phoneNumber) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const listPhoneChallenges = /* GraphQL */ `
  query ListPhoneChallenges(
    $code: String
    $phoneNumber: ModelStringKeyConditionInput
    $filter: ModelPhoneChallengeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPhoneChallenges(
      code: $code
      phoneNumber: $phoneNumber
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        code
        phoneNumber
        verified
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
