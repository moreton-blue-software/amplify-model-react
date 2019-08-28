/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThread = `query GetThread($id: ID!) {
  getThread(id: $id) {
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
export const listThreads = `query ListThreads(
  $filter: ModelThreadFilterInput
  $limit: Int
  $nextToken: String
) {
  listThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      comments {
        nextToken
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getThreadComment = `query GetThreadComment($id: ID!) {
  getThreadComment(id: $id) {
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
export const listThreadComments = `query ListThreadComments(
  $filter: ModelThreadCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listThreadComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      thread {
        id
        name
        createdAt
      }
      threadCommentThreadId
      seen
      body
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getClient = `query GetClient($id: ID!) {
  getClient(id: $id) {
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
      vacancys {
        nextToken
      }
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
      vacancies {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const commentByThreadId = `query CommentByThreadId(
  $threadCommentThreadId: ID
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelThreadCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentByThreadId(
    threadCommentThreadId: $threadCommentThreadId
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      thread {
        id
        name
        createdAt
      }
      threadCommentThreadId
      seen
      body
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const commentByUserIdThreadId = `query CommentByUserIdThreadId(
  $userId: String
  $threadCommentThreadId: ModelIDKeyConditionInput
  $filter: ModelThreadCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentByUserIdThreadId(
    userId: $userId
    threadCommentThreadId: $threadCommentThreadId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      thread {
        id
        name
        createdAt
      }
      threadCommentThreadId
      seen
      body
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const commentByThreadIdUserId = `query CommentByThreadIdUserId(
  $threadCommentThreadId: ID
  $userId: ModelStringKeyConditionInput
  $filter: ModelThreadCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentByThreadIdUserId(
    threadCommentThreadId: $threadCommentThreadId
    userId: $userId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      thread {
        id
        name
        createdAt
      }
      threadCommentThreadId
      seen
      body
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
