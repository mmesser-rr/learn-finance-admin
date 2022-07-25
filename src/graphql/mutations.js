/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const initiatePhoneChallenge = /* GraphQL */ `
  mutation InitiatePhoneChallenge($phoneNumber: String!) {
    initiatePhoneChallenge(phoneNumber: $phoneNumber) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const returnUserChallenge = /* GraphQL */ `
  mutation ReturnUserChallenge($phoneNumber: String!) {
    returnUserChallenge(phoneNumber: $phoneNumber) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const validateReturnUser = /* GraphQL */ `
  mutation ValidateReturnUser($phoneNumber: String!, $code: String!) {
    validateReturnUser(phoneNumber: $phoneNumber, code: $code)
  }
`;
export const tryPhoneChallenge = /* GraphQL */ `
  mutation TryPhoneChallenge($phoneNumber: String!, $code: String!) {
    tryPhoneChallenge(phoneNumber: $phoneNumber, code: $code)
  }
`;
export const generateInvite = /* GraphQL */ `
  mutation GenerateInvite {
    generateInvite {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const initiateEmailChallenge = /* GraphQL */ `
  mutation InitiateEmailChallenge($email: String!) {
    initiateEmailChallenge(email: $email) {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const tryEmailChallenge = /* GraphQL */ `
  mutation TryEmailChallenge($email: String!, $code: String!) {
    tryEmailChallenge(email: $email, code: $code)
  }
`;
export const openAppAndAccount = /* GraphQL */ `
  mutation OpenAppAndAccount($ssn: String!, $athleteId: ID!) {
    openAppAndAccount(ssn: $ssn, athleteId: $athleteId) {
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
export const openAccount = /* GraphQL */ `
  mutation OpenAccount($athleteId: ID!) {
    openAccount(athleteId: $athleteId) {
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
export const unitWebhookService = /* GraphQL */ `
  mutation UnitWebhookService($data: String) {
    unitWebhookService(data: $data) {
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
export const podSettings = /* GraphQL */ `
  mutation PodSettings(
    $athleteId: ID!
    $savings: Int!
    $investments: Int!
    $spending: Int!
  ) {
    podSettings(
      athleteId: $athleteId
      savings: $savings
      investments: $investments
      spending: $spending
    ) {
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
export const createPlaidLink = /* GraphQL */ `
  mutation CreatePlaidLink($athleteId: ID!) {
    createPlaidLink(athleteId: $athleteId) {
      access_token
      item_id
      link_token
      request_id
      new_access_token
    }
  }
`;
export const updatePlaidLink = /* GraphQL */ `
  mutation UpdatePlaidLink($athleteId: ID!, $accessToken: String!) {
    updatePlaidLink(athleteId: $athleteId, accessToken: $accessToken) {
      access_token
      item_id
      link_token
      request_id
      new_access_token
    }
  }
`;
export const createPlaidPayment = /* GraphQL */ `
  mutation CreatePlaidPayment(
    $athleteId: ID!
    $plaidAccountId: String!
    $amount: Float!
    $description: String
  ) {
    createPlaidPayment(
      athleteId: $athleteId
      plaidAccountId: $plaidAccountId
      amount: $amount
      description: $description
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
export const bookPayment = /* GraphQL */ `
  mutation BookPayment(
    $athleteId: ID!
    $unitAccountId: String!
    $amount: Float!
    $description: String
    $receiverUnitAccountId: String!
    $receiverAccountType: String
  ) {
    bookPayment(
      athleteId: $athleteId
      unitAccountId: $unitAccountId
      amount: $amount
      description: $description
      receiverUnitAccountId: $receiverUnitAccountId
      receiverAccountType: $receiverAccountType
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
export const debitAccount = /* GraphQL */ `
  mutation DebitAccount(
    $athleteId: ID!
    $unitAccountId: String!
    $amount: Float!
    $description: String
    $receiverName: String!
    $receiverRoutingNumber: String!
    $receiverAccountNumber: String!
    $receiverAccountType: String
    $addenda: String
  ) {
    debitAccount(
      athleteId: $athleteId
      unitAccountId: $unitAccountId
      amount: $amount
      description: $description
      receiverName: $receiverName
      receiverRoutingNumber: $receiverRoutingNumber
      receiverAccountNumber: $receiverAccountNumber
      receiverAccountType: $receiverAccountType
      addenda: $addenda
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
export const creditAccount = /* GraphQL */ `
  mutation CreditAccount(
    $athleteId: ID!
    $unitAccountId: String!
    $amount: Float!
    $description: String
    $receiverName: String!
    $receiverRoutingNumber: String!
    $receiverAccountNumber: String!
    $receiverAccountType: String
    $addenda: String
  ) {
    creditAccount(
      athleteId: $athleteId
      unitAccountId: $unitAccountId
      amount: $amount
      description: $description
      receiverName: $receiverName
      receiverRoutingNumber: $receiverRoutingNumber
      receiverAccountNumber: $receiverAccountNumber
      receiverAccountType: $receiverAccountType
      addenda: $addenda
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
export const createAthlete = /* GraphQL */ `
  mutation CreateAthlete(
    $input: CreateAthleteInput!
    $condition: ModelAthleteConditionInput
  ) {
    createAthlete(input: $input, condition: $condition) {
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
export const updateAthlete = /* GraphQL */ `
  mutation UpdateAthlete(
    $input: UpdateAthleteInput!
    $condition: ModelAthleteConditionInput
  ) {
    updateAthlete(input: $input, condition: $condition) {
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
export const deleteAthlete = /* GraphQL */ `
  mutation DeleteAthlete(
    $input: DeleteAthleteInput!
    $condition: ModelAthleteConditionInput
  ) {
    deleteAthlete(input: $input, condition: $condition) {
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
export const createAthleteAccount = /* GraphQL */ `
  mutation CreateAthleteAccount(
    $input: CreateAthleteAccountInput!
    $condition: ModelAthleteAccountConditionInput
  ) {
    createAthleteAccount(input: $input, condition: $condition) {
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
export const updateAthleteAccount = /* GraphQL */ `
  mutation UpdateAthleteAccount(
    $input: UpdateAthleteAccountInput!
    $condition: ModelAthleteAccountConditionInput
  ) {
    updateAthleteAccount(input: $input, condition: $condition) {
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
export const deleteAthleteAccount = /* GraphQL */ `
  mutation DeleteAthleteAccount(
    $input: DeleteAthleteAccountInput!
    $condition: ModelAthleteAccountConditionInput
  ) {
    deleteAthleteAccount(input: $input, condition: $condition) {
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
export const createRecentTransaction = /* GraphQL */ `
  mutation CreateRecentTransaction(
    $input: CreateRecentTransactionInput!
    $condition: ModelRecentTransactionConditionInput
  ) {
    createRecentTransaction(input: $input, condition: $condition) {
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
export const updateRecentTransaction = /* GraphQL */ `
  mutation UpdateRecentTransaction(
    $input: UpdateRecentTransactionInput!
    $condition: ModelRecentTransactionConditionInput
  ) {
    updateRecentTransaction(input: $input, condition: $condition) {
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
export const deleteRecentTransaction = /* GraphQL */ `
  mutation DeleteRecentTransaction(
    $input: DeleteRecentTransactionInput!
    $condition: ModelRecentTransactionConditionInput
  ) {
    deleteRecentTransaction(input: $input, condition: $condition) {
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
export const createSocialHandle = /* GraphQL */ `
  mutation CreateSocialHandle(
    $input: CreateSocialHandleInput!
    $condition: ModelSocialHandleConditionInput
  ) {
    createSocialHandle(input: $input, condition: $condition) {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const updateSocialHandle = /* GraphQL */ `
  mutation UpdateSocialHandle(
    $input: UpdateSocialHandleInput!
    $condition: ModelSocialHandleConditionInput
  ) {
    updateSocialHandle(input: $input, condition: $condition) {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const deleteSocialHandle = /* GraphQL */ `
  mutation DeleteSocialHandle(
    $input: DeleteSocialHandleInput!
    $condition: ModelSocialHandleConditionInput
  ) {
    deleteSocialHandle(input: $input, condition: $condition) {
      platform
      handle
      id
      createdAt
      updatedAt
      athleteSocialHandlesId
    }
  }
`;
export const createEmailChallenge = /* GraphQL */ `
  mutation CreateEmailChallenge(
    $input: CreateEmailChallengeInput!
    $condition: ModelEmailChallengeConditionInput
  ) {
    createEmailChallenge(input: $input, condition: $condition) {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const updateEmailChallenge = /* GraphQL */ `
  mutation UpdateEmailChallenge(
    $input: UpdateEmailChallengeInput!
    $condition: ModelEmailChallengeConditionInput
  ) {
    updateEmailChallenge(input: $input, condition: $condition) {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmailChallenge = /* GraphQL */ `
  mutation DeleteEmailChallenge(
    $input: DeleteEmailChallengeInput!
    $condition: ModelEmailChallengeConditionInput
  ) {
    deleteEmailChallenge(input: $input, condition: $condition) {
      code
      email
      verified
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createInvite = /* GraphQL */ `
  mutation CreateInvite(
    $input: CreateInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    createInvite(input: $input, condition: $condition) {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateInvite = /* GraphQL */ `
  mutation UpdateInvite(
    $input: UpdateInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    updateInvite(input: $input, condition: $condition) {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteInvite = /* GraphQL */ `
  mutation DeleteInvite(
    $input: DeleteInviteInput!
    $condition: ModelInviteConditionInput
  ) {
    deleteInvite(input: $input, condition: $condition) {
      code
      status
      createdAt
      updatedAt
    }
  }
`;
export const createLearn = /* GraphQL */ `
  mutation CreateLearn(
    $input: CreateLearnInput!
    $condition: ModelLearnConditionInput
  ) {
    createLearn(input: $input, condition: $condition) {
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
export const updateLearn = /* GraphQL */ `
  mutation UpdateLearn(
    $input: UpdateLearnInput!
    $condition: ModelLearnConditionInput
  ) {
    updateLearn(input: $input, condition: $condition) {
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
export const deleteLearn = /* GraphQL */ `
  mutation DeleteLearn(
    $input: DeleteLearnInput!
    $condition: ModelLearnConditionInput
  ) {
    deleteLearn(input: $input, condition: $condition) {
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
export const createOpportunity = /* GraphQL */ `
  mutation CreateOpportunity(
    $input: CreateOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    createOpportunity(input: $input, condition: $condition) {
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
export const updateOpportunity = /* GraphQL */ `
  mutation UpdateOpportunity(
    $input: UpdateOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    updateOpportunity(input: $input, condition: $condition) {
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
export const deleteOpportunity = /* GraphQL */ `
  mutation DeleteOpportunity(
    $input: DeleteOpportunityInput!
    $condition: ModelOpportunityConditionInput
  ) {
    deleteOpportunity(input: $input, condition: $condition) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      displayName
      relationshipType
      opportunityId
      createdAt
      updatedAt
    }
  }
`;
export const createPhoneChallenge = /* GraphQL */ `
  mutation CreatePhoneChallenge(
    $input: CreatePhoneChallengeInput!
    $condition: ModelPhoneChallengeConditionInput
  ) {
    createPhoneChallenge(input: $input, condition: $condition) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const updatePhoneChallenge = /* GraphQL */ `
  mutation UpdatePhoneChallenge(
    $input: UpdatePhoneChallengeInput!
    $condition: ModelPhoneChallengeConditionInput
  ) {
    updatePhoneChallenge(input: $input, condition: $condition) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const deletePhoneChallenge = /* GraphQL */ `
  mutation DeletePhoneChallenge(
    $input: DeletePhoneChallengeInput!
    $condition: ModelPhoneChallengeConditionInput
  ) {
    deletePhoneChallenge(input: $input, condition: $condition) {
      code
      phoneNumber
      verified
      createdAt
      updatedAt
    }
  }
`;
export const createReward = /* GraphQL */ `
  mutation CreateReward(
    $input: CreateRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    createReward(input: $input, condition: $condition) {
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
export const updateReward = /* GraphQL */ `
  mutation UpdateReward(
    $input: UpdateRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    updateReward(input: $input, condition: $condition) {
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
export const deleteReward = /* GraphQL */ `
  mutation DeleteReward(
    $input: DeleteRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    deleteReward(input: $input, condition: $condition) {
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
