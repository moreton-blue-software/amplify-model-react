/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateThread = `subscription OnCreateThread {
  onCreateThread {
    id
    hash
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
export const onUpdateThread = `subscription OnUpdateThread {
  onUpdateThread {
    id
    hash
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
export const onDeleteThread = `subscription OnDeleteThread {
  onDeleteThread {
    id
    hash
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
export const onCreateThreadComment = `subscription OnCreateThreadComment {
  onCreateThreadComment {
    id
    userId
    thread {
      id
      hash
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
export const onUpdateThreadComment = `subscription OnUpdateThreadComment {
  onUpdateThreadComment {
    id
    userId
    thread {
      id
      hash
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
export const onDeleteThreadComment = `subscription OnDeleteThreadComment {
  onDeleteThreadComment {
    id
    userId
    thread {
      id
      hash
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
export const onCreateClient = `subscription OnCreateClient {
  onCreateClient {
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
        startDate
        vacancyClientId
      }
      nextToken
    }
  }
}
`;
export const onUpdateClient = `subscription OnUpdateClient {
  onUpdateClient {
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
        startDate
        vacancyClientId
      }
      nextToken
    }
  }
}
`;
export const onDeleteClient = `subscription OnDeleteClient {
  onDeleteClient {
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
        startDate
        vacancyClientId
      }
      nextToken
    }
  }
}
`;
export const onCreateVacancy = `subscription OnCreateVacancy {
  onCreateVacancy {
    id
    createdAt
    updatedAt
    position
    description
    startDate
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
export const onUpdateVacancy = `subscription OnUpdateVacancy {
  onUpdateVacancy {
    id
    createdAt
    updatedAt
    position
    description
    startDate
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
export const onDeleteVacancy = `subscription OnDeleteVacancy {
  onDeleteVacancy {
    id
    createdAt
    updatedAt
    position
    description
    startDate
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
export const onCreateVacancyQuestion = `subscription OnCreateVacancyQuestion {
  onCreateVacancyQuestion {
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
      startDate
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
export const onUpdateVacancyQuestion = `subscription OnUpdateVacancyQuestion {
  onUpdateVacancyQuestion {
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
      startDate
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
export const onDeleteVacancyQuestion = `subscription OnDeleteVacancyQuestion {
  onDeleteVacancyQuestion {
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
      startDate
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
