/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createThread = `mutation CreateThread($input: CreateThreadInput!) {
  createThread(input: $input) {
    id
    name
    comments {
      items {
        id
        userId
        threadCommentThreadId
        seen
        body
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const updateThread = `mutation UpdateThread($input: UpdateThreadInput!) {
  updateThread(input: $input) {
    id
    name
    comments {
      items {
        id
        userId
        threadCommentThreadId
        seen
        body
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const deleteThread = `mutation DeleteThread($input: DeleteThreadInput!) {
  deleteThread(input: $input) {
    id
    name
    comments {
      items {
        id
        userId
        threadCommentThreadId
        seen
        body
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const createThreadComment = `mutation CreateThreadComment($input: CreateThreadCommentInput!) {
  createThreadComment(input: $input) {
    id
    userId
    thread {
      id
      name
      comments {
        nextToken
      }
      createdAt
    }
    threadCommentThreadId
    seen
    body
    createdAt
    updatedAt
  }
}
`;
export const updateThreadComment = `mutation UpdateThreadComment($input: UpdateThreadCommentInput!) {
  updateThreadComment(input: $input) {
    id
    userId
    thread {
      id
      name
      comments {
        nextToken
      }
      createdAt
    }
    threadCommentThreadId
    seen
    body
    createdAt
    updatedAt
  }
}
`;
export const deleteThreadComment = `mutation DeleteThreadComment($input: DeleteThreadCommentInput!) {
  deleteThreadComment(input: $input) {
    id
    userId
    thread {
      id
      name
      comments {
        nextToken
      }
      createdAt
    }
    threadCommentThreadId
    seen
    body
    createdAt
    updatedAt
  }
}
`;
export const createClient = `mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
    id
    createdAt
    updatedAt
    name
    vacancys {
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
}
`;
export const updateClient = `mutation UpdateClient($input: UpdateClientInput!) {
  updateClient(input: $input) {
    id
    createdAt
    updatedAt
    name
    vacancys {
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
}
`;
export const deleteClient = `mutation DeleteClient($input: DeleteClientInput!) {
  deleteClient(input: $input) {
    id
    createdAt
    updatedAt
    name
    vacancys {
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
    client {
      id
      createdAt
      updatedAt
      name
      vacancys {
        nextToken
      }
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
    client {
      id
      createdAt
      updatedAt
      name
      vacancys {
        nextToken
      }
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
    client {
      id
      createdAt
      updatedAt
      name
      vacancys {
        nextToken
      }
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
    vacancyQuestionVacancyId
    question {
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
    vacancyQuestionVacancyId
    question {
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
    vacancyQuestionVacancyId
    question {
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
}
`;
