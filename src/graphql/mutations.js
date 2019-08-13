/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = `mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
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
export const updateClient = `mutation UpdateClient($input: UpdateClientInput!) {
  updateClient(input: $input) {
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
export const deleteClient = `mutation DeleteClient($input: DeleteClientInput!) {
  deleteClient(input: $input) {
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
export const createVacancy = `mutation CreateVacancy($input: CreateVacancyInput!) {
  createVacancy(input: $input) {
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
export const updateVacancy = `mutation UpdateVacancy($input: UpdateVacancyInput!) {
  updateVacancy(input: $input) {
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
export const deleteVacancy = `mutation DeleteVacancy($input: DeleteVacancyInput!) {
  deleteVacancy(input: $input) {
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
export const createVacancyQuestion = `mutation CreateVacancyQuestion($input: CreateVacancyQuestionInput!) {
  createVacancyQuestion(input: $input) {
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
export const updateVacancyQuestion = `mutation UpdateVacancyQuestion($input: UpdateVacancyQuestionInput!) {
  updateVacancyQuestion(input: $input) {
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
export const deleteVacancyQuestion = `mutation DeleteVacancyQuestion($input: DeleteVacancyQuestionInput!) {
  deleteVacancyQuestion(input: $input) {
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
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
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
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
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
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
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
