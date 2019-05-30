import gql from "graphql-tag";

export const typeDefs = gql`
  scalar AWSDateTime
  scalar AWSDate

  enum ModelSortDirection {
    ASC
    DESC
  }

  type File {
    id: String!
    filename: String!
    uploader: String
    hash: String
  }

  type Employee {
    id: ID!
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    firstName: String
    surname: String
    role: String
    phone: String
  }

  type Vacancy {
    id: ID!
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    position: String
    numberOfOpenings: Int
    vacancyClientId: ID
    employee: Employee
    vacancyEmployeeId: ID
    questions(
      filter: ModelVacancyQuestionFilterInput
      sortDirection: ModelSortDirection
      limit: Int
      nextToken: String
    ): ModelVacancyQuestionConnection
    video: File
  }

  type VacancyQuestion {
    id: ID!
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    indexNo: Int
    vacancyQuestionVacancyId: ID
    vacancyQuestionQuestionId: ID
    archived: Boolean
  }

  type ModelVacancyQuestionConnection {
    items: [VacancyQuestion]
    nextToken: String
  }

  input ModelVacancyQuestionFilterInput {
    id: ModelIDFilterInput
    createdAt: ModelStringFilterInput
    updatedAt: ModelStringFilterInput
    indexNo: ModelIntFilterInput
    vacancyQuestionVacancyId: ModelIDFilterInput
    vacancyQuestionQuestionId: ModelIDFilterInput
    archived: ModelBooleanFilterInput
    and: [ModelVacancyQuestionFilterInput]
    or: [ModelVacancyQuestionFilterInput]
    not: ModelVacancyQuestionFilterInput
  }

  input ModelStringFilterInput {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    notContains: String
    between: [String]
    beginsWith: String
  }

  input ModelIDFilterInput {
    ne: ID
    eq: ID
    le: ID
    lt: ID
    ge: ID
    gt: ID
    contains: ID
    notContains: ID
    between: [ID]
    beginsWith: ID
  }

  input ModelIntFilterInput {
    ne: Int
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    contains: Int
    notContains: Int
    between: [Int]
  }

  input ModelFloatFilterInput {
    ne: Float
    eq: Float
    le: Float
    lt: Float
    ge: Float
    gt: Float
    contains: Float
    notContains: Float
    between: [Float]
  }

  input ModelBooleanFilterInput {
    ne: Boolean
    eq: Boolean
  }

  input CreateVacancyQuestionInput {
    id: ID
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    indexNo: Int
    vacancyQuestionVacancyId: ID
    vacancyQuestionQuestionId: ID
    archived: Boolean
  }

  input UpdateVacancyQuestionInput {
    id: ID!
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    indexNo: Int
    vacancyQuestionVacancyId: ID
    vacancyQuestionQuestionId: ID
    archived: Boolean
  }

  input DeleteVacancyQuestionInput {
    id: ID
  }

  input CreateVacancyInput {
    id: ID
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    position: String
    numberOfOpenings: Int
    description: String
    status: String
    hours: String
    workType: String
    days: String
    transport: String
    rate: String
    award: String
    cutOffDate: AWSDateTime
    startDate: AWSDateTime
    generalComments: String
    clientSelect: String
    archived: Boolean
    vacancyClientId: ID
    vacancyEmployeeId: ID
    video: FileInput
  }

  input FileInput {
    filename: String!
    uploader: String
    hash: String
  }

  input UpdateVacancyInput {
    id: ID!
    createdAt: AWSDateTime
    updatedAt: AWSDateTime
    position: String
    numberOfOpenings: Int
    description: String
    status: String
    hours: String
    workType: String
    days: String
    transport: String
    rate: String
    award: String
    cutOffDate: AWSDateTime
    startDate: AWSDateTime
    generalComments: String
    clientSelect: String
    archived: Boolean
    vacancyClientId: ID
    vacancyEmployeeId: ID
    video: FileInput
  }

  input DeleteVacancyInput {
    id: ID
  }

  type ModelVacancyConnection {
    items: [Vacancy]
    nextToken: String
  }

  input ModelVacancyFilterInput {
    id: ModelIDFilterInput
    createdAt: ModelStringFilterInput
    updatedAt: ModelStringFilterInput
    position: ModelStringFilterInput
    numberOfOpenings: ModelIntFilterInput
    description: ModelStringFilterInput
    status: ModelStringFilterInput
    hours: ModelStringFilterInput
    workType: ModelStringFilterInput
    days: ModelStringFilterInput
    transport: ModelStringFilterInput
    rate: ModelStringFilterInput
    award: ModelStringFilterInput
    cutOffDate: ModelStringFilterInput
    startDate: ModelStringFilterInput
    generalComments: ModelStringFilterInput
    clientSelect: ModelStringFilterInput
    archived: ModelBooleanFilterInput
    vacancyClientId: ModelIDFilterInput
    vacancyEmployeeId: ModelIDFilterInput
    and: [ModelVacancyFilterInput]
    or: [ModelVacancyFilterInput]
    not: ModelVacancyFilterInput
  }

  type ModelEmployeeConnection {
    items: [Employee]
    nextToken: String
  }

  input ModelEmployeeFilterInput {
    id: ModelIDFilterInput
    createdAt: ModelStringFilterInput
    updatedAt: ModelStringFilterInput
    firstName: ModelStringFilterInput
    surname: ModelStringFilterInput
    role: ModelStringFilterInput
    phone: ModelStringFilterInput
    email: ModelStringFilterInput
    archived: ModelBooleanFilterInput
    userRefId: ModelStringFilterInput
    and: [ModelEmployeeFilterInput]
    or: [ModelEmployeeFilterInput]
    not: ModelEmployeeFilterInput
  }

  type Mutation {
    createVacancyQuestion(input: CreateVacancyQuestionInput!): VacancyQuestion
    updateVacancyQuestion(input: UpdateVacancyQuestionInput!): VacancyQuestion
    deleteVacancyQuestion(input: DeleteVacancyQuestionInput!): VacancyQuestion
    createVacancy(input: CreateVacancyInput!): Vacancy
    updateVacancy(input: UpdateVacancyInput!): Vacancy
    deleteVacancy(input: DeleteVacancyInput!): Vacancy
  }

  type Query {
    getVacancy(id: ID!): Vacancy
    listVacancys(
      filter: ModelVacancyFilterInput
      limit: Int
      nextToken: String
    ): ModelVacancyConnection
    getVacancyQuestion(id: ID!): VacancyQuestion
    listVacancyQuestions(
      filter: ModelVacancyQuestionFilterInput
      limit: Int
      nextToken: String
    ): ModelVacancyQuestionConnection
    getEmployee(id: ID!): Employee
    listEmployees(
      filter: ModelEmployeeFilterInput
      limit: Int
      nextToken: String
    ): ModelEmployeeConnection
  }
`;
