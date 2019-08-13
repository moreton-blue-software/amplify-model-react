/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = `query GetClient($id: ID!) {
  getClient(id: $id) {
    id
    createdAt
    updatedAt
    name
    vacancys {
      nextToken
    }
  }
}
`;
export const listClients = `query ListClients(
  $filter: ModelClientFilterInput
  $limit: Int
  $nextToken: String
) {
  listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      name
    }
    nextToken
  }
}
`;
export const getVacancy = `query GetVacancy($id: ID!) {
  getVacancy(id: $id) {
    id
    createdAt
    updatedAt
    position
    description
    video {
      id
      filename
      uploader
      uploadDate
      hash
    }
    agreements {
      id
      filename
      uploader
      uploadDate
      hash
    }
    questions {
      nextToken
    }
    client {
      id
      createdAt
      updatedAt
      name
    }
    vacancyClientId
  }
}
`;
export const listVacancys = `query ListVacancys(
  $filter: ModelVacancyFilterInput
  $limit: Int
  $nextToken: String
) {
  listVacancys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      position
      description
      vacancyClientId
    }
    nextToken
  }
}
`;
export const getVacancyQuestion = `query GetVacancyQuestion($id: ID!) {
  getVacancyQuestion(id: $id) {
    id
    createdAt
    updatedAt
    indexNo
    vacancy {
      id
      createdAt
      updatedAt
      position
      description
      vacancyClientId
    }
    vacancyQuestionVacancyId
    question {
      id
      createdAt
      updatedAt
      text
      mandatory
      archived
    }
    vacancyQuestionQuestionId
    archived
  }
}
`;
export const listVacancyQuestions = `query ListVacancyQuestions(
  $filter: ModelVacancyQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listVacancyQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      indexNo
      vacancyQuestionVacancyId
      vacancyQuestionQuestionId
      archived
    }
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    id
    createdAt
    updatedAt
    text
    mandatory
    archived
    vacancies {
      nextToken
    }
  }
}
`;
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      text
      mandatory
      archived
    }
    nextToken
  }
}
`;
