/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
