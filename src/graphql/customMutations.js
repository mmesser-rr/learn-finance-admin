export const createCustomLearn = /* GraphQL */ `
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
export const updateCustomLearn = /* GraphQL */ `
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
export const deleteCustomLearn = /* GraphQL */ `
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