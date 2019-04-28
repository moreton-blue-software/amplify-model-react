import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { SnackbarProvider } from "notistack";
import { ModelFormControllerProvider } from "./modules/ModelFormController";
import TextField from "@material-ui/core/TextField";
import { Map } from "immutable";
import { createApolloClient } from "./client";
import Divider from "@material-ui/core/Divider";
import ModelFormPlayground from "./ModelFormPlayground";

function GraphqlEndpoint(props) {
  const { onChange, defaultValue = "https://endpoint" } = props;
  return (
    <TextField
      label="Graphql Endpoint"
      defaultValue={defaultValue}
      margin="normal"
      onChange={onChange}
    />
  );
}

function TokenInput(props) {
  const { onChange, defaultValue = "token here" } = props;
  return (
    <TextField
      defaultValue={defaultValue}
      label="Token"
      margin="normal"
      onChange={onChange}
    />
  );
}
function SchemaInput(props) {
  const { defaultValue } = props;
  return (
    <TextField
      id="standard-multiline-static"
      label="Schema JSON"
      multiline
      rows="5"
      defaultValue={defaultValue}
      margin="normal"
    />
  );
}

export default function App(props) {
  const [stateMap, setState] = React.useState(
    Map({
      ep:
        "https://btibeqhynvcwlahdhdtot5ikxe.appsync-api.ap-southeast-2.amazonaws.com/graphql",
      token:
        "eyJraWQiOiJQTFhLbzk1SlR5MW90bEJLQWIwUDc2emcwaDNrYk5TVjFEc3YzdHFpTW1vPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjkyMDg3OC1iYWI1LTQzZTAtODJhMy05NmUzZjQwNGFiNTkiLCJldmVudF9pZCI6IjZmMWUzYWZjLTY5OTAtMTFlOS04NDZmLTJiYzc4OTc4ZmViNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NTY0NDA0NjcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9RZDdMTUl1ZlgiLCJleHAiOjE1NTY0NDQwNjcsImlhdCI6MTU1NjQ0MDQ2NywianRpIjoiNWVlYzEzMjMtM2FkMS00MDg4LTlhOTQtNWYwYWUxOTIxNDYwIiwiY2xpZW50X2lkIjoiN3EydTBhbnMyZzJqYW43dDMxdXE0azdlN2giLCJ1c2VybmFtZSI6IjhmOTIwODc4LWJhYjUtNDNlMC04MmEzLTk2ZTNmNDA0YWI1OSJ9.W5U2_5X9TcAm9Gvb6cPAYGcmC_j3rwBH5rAvx1cYmZj-v6KjgkbC8W_SShwx3BDtQkhopyMUNu3vG06zEL9nMbFzaxvQTZvg5Bav38OSJSTcN4qx0VlAuDZL_aiCWvRY5mOHtDzoHufUVpxbzYUYcqgXqLJop5n91REbQC1qeSN7Ns6ZPXbJ3tBpNWyaneJdV7zoiu5rZMrELzrOT-25svuyFr0ESlDhsCjBQjpH09urjDV5utRu0HQeLsqfILQBMPO4syMVZlnQJqitZLchUiHijBmtGrfu9CQcwKt1kTyTdhLsA_GYOQ_8x2AqJUluKYCELJI4SDi6B49aEhQWwA",
      schema: {
        data: {
          __schema: {
            queryType: {
              name: "Query"
            },
            mutationType: {
              name: "Mutation"
            },
            subscriptionType: {
              name: "Subscription"
            },
            types: [
              {
                kind: "OBJECT",
                name: "Query",
                description: null,
                fields: [
                  {
                    name: "getUser",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listUsers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelUserFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelUserConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getSortableClient",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listSortableClients",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelSortableClientFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelSortableClientConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getClient",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listClients",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelClientFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelClientConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getVacancy",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listVacancys",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getVacancyQuestion",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listVacancyQuestions",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyQuestionFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyQuestionConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getQuestion",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listQuestions",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelQuestionFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelQuestionConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getAnswer",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listAnswers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelAnswerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelAnswerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getAgency",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listAgencys",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelAgencyFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelAgencyConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getConsultant",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listConsultants",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelConsultantFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelConsultantConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getEmployee",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listEmployees",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelEmployeeFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelEmployeeConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getEngagement",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listEngagements",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelEngagementFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelEngagementConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getJobSeeker",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listJobSeekers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelJobSeekerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelJobSeekerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getInvoice",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listInvoices",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelInvoiceFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelInvoiceConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getLineItem",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listLineItems",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelLineItemFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelLineItemConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getMilestone",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listMilestones",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelMilestoneFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelMilestoneConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "getActivity",
                    description: null,
                    args: [
                      {
                        name: "id",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "SCALAR",
                            name: "ID",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "listActivitys",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelActivityFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelActivityConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "User",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "dateOfBirth",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "ID",
                description: "Built-in ID",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "String",
                description: "Built-in String",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "AWSDateTime",
                description:
                  'The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard.',
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelUserConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "User",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelUserFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dateOfBirth",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelUserFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelUserFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelUserFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelIDFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "ne",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "eq",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "le",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "ge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notContains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "between",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "beginsWith",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelStringFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "ne",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "eq",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "le",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "ge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notContains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "between",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "beginsWith",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "Int",
                description: "Built-in Int",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "SortableClient",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "clients",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelClientFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelClientConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelClientConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Client",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Client",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "address1",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "state",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "abn",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "contact",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "phone",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "email",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archivedReason",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "status",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "notes",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "leadSource",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "likelihood",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "value",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "estimatedCloseDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "actualCloseDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobType",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "leadDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "responseCode",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "subsidyKnowledge",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextContactDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "leadToProspectDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "prospectToClientDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "wageSubsidyCommission",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "wageSubsidyPercentage",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "stateGovLGA",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancies",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "invoices",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelInvoiceFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelInvoiceConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "activities",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelActivityFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelActivityConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "accountManager",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "clientAccountManagerId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "sortableClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "Boolean",
                description: "Built-in Boolean",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelVacancyConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Vacancy",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Vacancy",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "position",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "status",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "hours",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "workType",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "days",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "transport",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "rate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "award",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "cutOffDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "startDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "generalComments",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "clientSelect",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "client",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancyClientId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "employee",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancyEmployeeId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "engagements",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelEngagementFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelEngagementConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "candidates",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelJobSeekerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelJobSeekerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "questions",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyQuestionFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyQuestionConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "video",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "File",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Employee",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "surname",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "role",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "phone",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "email",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancies",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "clients",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelClientFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelClientConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "agencies",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelAgencyFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelAgencyConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "activities",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelActivityFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelActivityConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelVacancyFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "position",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "hours",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "workType",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "days",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "transport",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "award",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "cutOffDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "startDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "generalComments",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientSelect",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyClientId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyEmployeeId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelVacancyFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelVacancyFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelVacancyFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelBooleanFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "ne",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "eq",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "ENUM",
                name: "ModelSortDirection",
                description: null,
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: [
                  {
                    name: "ASC",
                    description: null,
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "DESC",
                    description: null,
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelClientFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archivedReason",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notes",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadSource",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "likelihood",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "value",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "estimatedCloseDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "actualCloseDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobType",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "responseCode",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subsidyKnowledge",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "nextContactDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadToProspectDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "prospectToClientDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyCommission",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyPercentage",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "stateGovLGA",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientAccountManagerId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelClientFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelClientFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelClientFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelAgencyConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Agency",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Agency",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "address1",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "state",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "abn",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "contact",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "phone",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "email",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "accountManager",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "agencyAccountManagerId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "consultants",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelConsultantFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelConsultantConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "engagements",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelEngagementFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelEngagementConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobSeekers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelJobSeekerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelJobSeekerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelConsultantConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Consultant",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Consultant",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "surname",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "role",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "phone",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "email",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "mainContact",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "agency",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Agency",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "consultantAgencyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelConsultantFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mainContact",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "consultantAgencyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelConsultantFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelConsultantFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelConsultantFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelEngagementConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Engagement",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Engagement",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Vacancy",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "engagementVacancyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "agency",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Agency",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "engagementAgencyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "acceptedDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "DESorJA",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "empPaymentTotal",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "empPayment4weeks",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "empPayment13weeks",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "empPayment26weeks",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobSeekers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelJobSeekerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelJobSeekerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelJobSeekerConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "JobSeeker",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "JobSeeker",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "surname",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "dob",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "phone",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "email",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "benchmarkHours",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "driversLicence",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "car",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "unemploymentLength",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "fundingLevel",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "barriers",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "resume",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "whySuited",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jsId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "program",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "programDES",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "pathwayOutcome",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "status",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "agency",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobSeekerAgencyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobSeekerVacancyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "answers",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelAnswerFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelAnswerConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "engagement",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobSeekerEngagementId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "interviewVideo",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "File",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelAnswerConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Answer",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Answer",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "answer",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "question",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "jobseeker",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "JobSeeker",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "answerJobseekerId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelAnswerFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answer",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "question",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answerJobseekerId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelAnswerFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelAnswerFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelAnswerFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "File",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "filename",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "uploader",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "hash",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelJobSeekerFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dob",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "benchmarkHours",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "driversLicence",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "car",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "unemploymentLength",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "fundingLevel",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "barriers",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "resume",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "whySuited",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jsId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "program",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "programDES",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "pathwayOutcome",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerAgencyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerVacancyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerEngagementId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelJobSeekerFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelJobSeekerFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelJobSeekerFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelEngagementFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementVacancyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementAgencyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "acceptedDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "DESorJA",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPaymentTotal",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment4weeks",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment13weeks",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment26weeks",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelEngagementFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelEngagementFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelEngagementFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelAgencyFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "agencyAccountManagerId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelAgencyFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelAgencyFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelAgencyFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelActivityConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Activity",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Activity",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "type",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "subject",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "details",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "due",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "status",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "client",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "activityClientId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "employee",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "activityEmployeeId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelActivityFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "type",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subject",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "details",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "due",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityClientId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityEmployeeId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelActivityFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelActivityFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelActivityFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelVacancyQuestionConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "VacancyQuestion",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "VacancyQuestion",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancyQuestionVacancyId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "question",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancyQuestionQuestionId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Question",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "text",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "mandatory",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "vacancies",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelVacancyQuestionFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelVacancyQuestionConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelVacancyQuestionFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionVacancyId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionQuestionId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelVacancyQuestionFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelVacancyQuestionFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelVacancyQuestionFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelInvoiceConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Invoice",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Invoice",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "invoiceNumber",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "invoiceDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "terms",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "status",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "totalPrice",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "gst",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "adjustment",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "finalPrice",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "lineItems",
                    description: null,
                    args: [
                      {
                        name: "filter",
                        description: null,
                        type: {
                          kind: "INPUT_OBJECT",
                          name: "ModelLineItemFilterInput",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "sortDirection",
                        description: null,
                        type: {
                          kind: "ENUM",
                          name: "ModelSortDirection",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "limit",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Int",
                          ofType: null
                        },
                        defaultValue: null
                      },
                      {
                        name: "nextToken",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "String",
                          ofType: null
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "ModelLineItemConnection",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "client",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "invoiceClientId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "SCALAR",
                name: "Float",
                description: "Built-in Float",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelLineItemConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "LineItem",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "LineItem",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "service",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "quantity",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "rate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "invoice",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Invoice",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "lineItemInvoiceId",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelLineItemFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "service",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "quantity",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lineItemInvoiceId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelLineItemFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelLineItemFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelLineItemFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelFloatFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "ne",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "eq",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "le",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "ge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notContains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "between",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelInvoiceFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceNumber",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "terms",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIntFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "totalPrice",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gst",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "adjustment",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "finalPrice",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelFloatFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceClientId",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelInvoiceFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelInvoiceFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelInvoiceFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelIntFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "ne",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "eq",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "le",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "ge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notContains",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "between",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Int",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelSortableClientConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "SortableClient",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelSortableClientFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelSortableClientFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelSortableClientFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelSortableClientFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelQuestionConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Question",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelQuestionFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "text",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mandatory",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelQuestionFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelQuestionFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelQuestionFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelEmployeeConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Employee",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelEmployeeFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelEmployeeFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelEmployeeFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelEmployeeFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Milestone",
                description: null,
                fields: [
                  {
                    name: "id",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "billed",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "archived",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "ModelMilestoneConnection",
                description: null,
                fields: [
                  {
                    name: "items",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "Milestone",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "nextToken",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "ModelMilestoneFilterInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelIDFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelStringFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "billed",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelBooleanFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "and",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelMilestoneFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "or",
                    description: null,
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "ModelMilestoneFilterInput",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "not",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "ModelMilestoneFilterInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Mutation",
                description: null,
                fields: [
                  {
                    name: "createUser",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateUserInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateUser",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateUserInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteUser",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteUserInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createSortableClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateSortableClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateSortableClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateSortableClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteSortableClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteSortableClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteClient",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteClientInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createVacancy",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateVacancyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateVacancy",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateVacancyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteVacancy",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteVacancyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createVacancyQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateVacancyQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateVacancyQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateVacancyQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteVacancyQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteVacancyQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteQuestion",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteQuestionInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createAnswer",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateAnswerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateAnswer",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateAnswerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteAnswer",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteAnswerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createAgency",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateAgencyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateAgency",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateAgencyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteAgency",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteAgencyInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createConsultant",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateConsultantInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateConsultant",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateConsultantInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteConsultant",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteConsultantInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createEmployee",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateEmployeeInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateEmployee",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateEmployeeInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteEmployee",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteEmployeeInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createEngagement",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateEngagementInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateEngagement",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateEngagementInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteEngagement",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteEngagementInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createJobSeeker",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateJobSeekerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateJobSeeker",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateJobSeekerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteJobSeeker",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteJobSeekerInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createInvoice",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateInvoiceInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateInvoice",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateInvoiceInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteInvoice",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteInvoiceInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createLineItem",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateLineItemInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateLineItem",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateLineItemInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteLineItem",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteLineItemInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createMilestone",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateMilestoneInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateMilestone",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateMilestoneInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteMilestone",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteMilestoneInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "createActivity",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "CreateActivityInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "updateActivity",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "UpdateActivityInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deleteActivity",
                    description: null,
                    args: [
                      {
                        name: "input",
                        description: null,
                        type: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "INPUT_OBJECT",
                            name: "DeleteActivityInput",
                            ofType: null
                          }
                        },
                        defaultValue: null
                      }
                    ],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateUserInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dateOfBirth",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateUserInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dateOfBirth",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteUserInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateSortableClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateSortableClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteSortableClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archivedReason",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notes",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadSource",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "likelihood",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "value",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "estimatedCloseDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "actualCloseDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobType",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "responseCode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subsidyKnowledge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "nextContactDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadToProspectDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "prospectToClientDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyCommission",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyPercentage",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "stateGovLGA",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientAccountManagerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientSortableClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archivedReason",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "notes",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadSource",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "likelihood",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "value",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "estimatedCloseDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "actualCloseDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobType",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "responseCode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subsidyKnowledge",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "nextContactDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "leadToProspectDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "prospectToClientDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyCommission",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "wageSubsidyPercentage",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "stateGovLGA",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientAccountManagerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientSortableClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteClientInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateVacancyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "position",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "hours",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "workType",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "days",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "transport",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "award",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "cutOffDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "startDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "generalComments",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientSelect",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyEmployeeId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "video",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "FileInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "FileInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "filename",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "uploader",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "hash",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateVacancyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "position",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "hours",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "workType",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "days",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "transport",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "award",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "cutOffDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "startDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "generalComments",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "clientSelect",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyEmployeeId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "video",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "FileInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteVacancyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateVacancyQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionQuestionId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateVacancyQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "vacancyQuestionQuestionId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteVacancyQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "text",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mandatory",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "text",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mandatory",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteQuestionInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateAnswerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answer",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "question",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answerJobseekerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateAnswerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answer",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "question",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "answerJobseekerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteAnswerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateAgencyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "agencyAccountManagerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateAgencyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "address1",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "state",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "postcode",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "abn",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "contact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "agencyAccountManagerId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteAgencyInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateConsultantInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mainContact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "consultantAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateConsultantInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "mainContact",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "consultantAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteConsultantInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateEmployeeInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateEmployeeInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "role",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteEmployeeInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateEngagementInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "acceptedDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "DESorJA",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPaymentTotal",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment4weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment13weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment26weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateEngagementInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "engagementAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "acceptedDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "DESorJA",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPaymentTotal",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment4weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment13weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "empPayment26weeks",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteEngagementInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateJobSeekerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dob",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "benchmarkHours",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "driversLicence",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "car",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "unemploymentLength",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "fundingLevel",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "barriers",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "resume",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "whySuited",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jsId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "program",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "programDES",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "pathwayOutcome",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerEngagementId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "interviewVideo",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "FileInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateJobSeekerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "firstName",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "surname",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dob",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "suburb",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "phone",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "email",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "benchmarkHours",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "driversLicence",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "car",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "unemploymentLength",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "fundingLevel",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "barriers",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "resume",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "whySuited",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jsId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "program",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "programDES",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "pathwayOutcome",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerAgencyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerVacancyId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "jobSeekerEngagementId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "interviewVideo",
                    description: null,
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "FileInput",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteJobSeekerInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateInvoiceInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceNumber",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "terms",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "totalPrice",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gst",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "adjustment",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "finalPrice",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateInvoiceInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceNumber",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "description",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "terms",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "totalPrice",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "gst",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "adjustment",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "finalPrice",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "invoiceClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteInvoiceInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateLineItemInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "service",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "quantity",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lineItemInvoiceId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateLineItemInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "service",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "quantity",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "rate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "lineItemInvoiceId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteLineItemInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateMilestoneInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "billed",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateMilestoneInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "dueDate",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "name",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "billed",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteMilestoneInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "CreateActivityInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "type",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subject",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "details",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "due",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityEmployeeId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "UpdateActivityInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "ID",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  },
                  {
                    name: "createdAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "updatedAt",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "type",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "subject",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "details",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "due",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "AWSDateTime",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "status",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "archived",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityClientId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  },
                  {
                    name: "activityEmployeeId",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "INPUT_OBJECT",
                name: "DeleteActivityInput",
                description: null,
                fields: null,
                inputFields: [
                  {
                    name: "id",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "ID",
                      ofType: null
                    },
                    defaultValue: null
                  }
                ],
                interfaces: null,
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "Subscription",
                description: null,
                fields: [
                  {
                    name: "onCreateUser",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateUser",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteUser",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "User",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateSortableClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateSortableClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteSortableClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "SortableClient",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteClient",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Client",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateVacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateVacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteVacancy",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Vacancy",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateVacancyQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateVacancyQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteVacancyQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "VacancyQuestion",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteQuestion",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Question",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateAnswer",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateAnswer",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteAnswer",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Answer",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateAgency",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateAgency",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteAgency",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Agency",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateConsultant",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateConsultant",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteConsultant",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Consultant",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateEmployee",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateEmployee",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteEmployee",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Employee",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateEngagement",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateEngagement",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteEngagement",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Engagement",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateJobSeeker",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateJobSeeker",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteJobSeeker",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "JobSeeker",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateInvoice",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateInvoice",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteInvoice",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Invoice",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateLineItem",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateLineItem",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteLineItem",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "LineItem",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateMilestone",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateMilestone",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteMilestone",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Milestone",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onCreateActivity",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onUpdateActivity",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onDeleteActivity",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "Activity",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__Schema",
                description:
                  "A GraphQL Introspection defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, the entry points for query, mutation, and subscription operations.",
                fields: [
                  {
                    name: "types",
                    description:
                      "A list of all types supported by this server.",
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "LIST",
                        name: null,
                        ofType: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "OBJECT",
                            name: "__Type",
                            ofType: null
                          }
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "queryType",
                    description:
                      "The type that query operations will be rooted at.",
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "__Type",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "mutationType",
                    description:
                      "If this server supports mutation, the type that mutation operations will be rooted at.",
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "__Type",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "directives",
                    description:
                      "'A list of all directives supported by this server.",
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "LIST",
                        name: null,
                        ofType: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "OBJECT",
                            name: "__Directive",
                            ofType: null
                          }
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "subscriptionType",
                    description:
                      "'If this server support subscription, the type that subscription operations will be rooted at.",
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "__Type",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__Type",
                description: null,
                fields: [
                  {
                    name: "kind",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "ENUM",
                        name: "__TypeKind",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "fields",
                    description: null,
                    args: [
                      {
                        name: "includeDeprecated",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Boolean",
                          ofType: null
                        },
                        defaultValue: "false"
                      }
                    ],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "OBJECT",
                          name: "__Field",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "interfaces",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "OBJECT",
                          name: "__Type",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "possibleTypes",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "OBJECT",
                          name: "__Type",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "enumValues",
                    description: null,
                    args: [
                      {
                        name: "includeDeprecated",
                        description: null,
                        type: {
                          kind: "SCALAR",
                          name: "Boolean",
                          ofType: null
                        },
                        defaultValue: "false"
                      }
                    ],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "OBJECT",
                          name: "__EnumValue",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "inputFields",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "OBJECT",
                          name: "__InputValue",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "ofType",
                    description: null,
                    args: [],
                    type: {
                      kind: "OBJECT",
                      name: "__Type",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "ENUM",
                name: "__TypeKind",
                description:
                  "An enum describing what kind of type a given __Type is",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: [
                  {
                    name: "SCALAR",
                    description: "Indicates this type is a scalar.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "OBJECT",
                    description:
                      "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INTERFACE",
                    description:
                      "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "UNION",
                    description:
                      "Indicates this type is a union. `possibleTypes` is a valid field.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "ENUM",
                    description:
                      "Indicates this type is an enum. `enumValues` is a valid field.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INPUT_OBJECT",
                    description:
                      "Indicates this type is an input object. `inputFields` is a valid field.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "LIST",
                    description:
                      "Indicates this type is a list. `ofType` is a valid field.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "NON_NULL",
                    description:
                      "Indicates this type is a non-null. `ofType` is a valid field.",
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__Field",
                description: null,
                fields: [
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "args",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "LIST",
                        name: null,
                        ofType: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "OBJECT",
                            name: "__InputValue",
                            ofType: null
                          }
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "type",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "__Type",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "isDeprecated",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Boolean",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deprecationReason",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__InputValue",
                description: null,
                fields: [
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "type",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "OBJECT",
                        name: "__Type",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "defaultValue",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__EnumValue",
                description: null,
                fields: [
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "isDeprecated",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Boolean",
                        ofType: null
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "deprecationReason",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "OBJECT",
                name: "__Directive",
                description: null,
                fields: [
                  {
                    name: "name",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "description",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "locations",
                    description: null,
                    args: [],
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "NON_NULL",
                        name: null,
                        ofType: {
                          kind: "ENUM",
                          name: "__DirectiveLocation",
                          ofType: null
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "args",
                    description: null,
                    args: [],
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "LIST",
                        name: null,
                        ofType: {
                          kind: "NON_NULL",
                          name: null,
                          ofType: {
                            kind: "OBJECT",
                            name: "__InputValue",
                            ofType: null
                          }
                        }
                      }
                    },
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "onOperation",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: true,
                    deprecationReason: "Use `locations`."
                  },
                  {
                    name: "onFragment",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: true,
                    deprecationReason: "Use `locations`."
                  },
                  {
                    name: "onField",
                    description: null,
                    args: [],
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    },
                    isDeprecated: true,
                    deprecationReason: "Use `locations`."
                  }
                ],
                inputFields: null,
                interfaces: [],
                enumValues: null,
                possibleTypes: null
              },
              {
                kind: "ENUM",
                name: "__DirectiveLocation",
                description:
                  "An enum describing valid locations where a directive can be placed",
                fields: null,
                inputFields: null,
                interfaces: null,
                enumValues: [
                  {
                    name: "QUERY",
                    description: "Indicates the directive is valid on queries.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "MUTATION",
                    description:
                      "Indicates the directive is valid on mutations.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "FIELD",
                    description: "Indicates the directive is valid on fields.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "FRAGMENT_DEFINITION",
                    description:
                      "Indicates the directive is valid on fragment definitions.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "FRAGMENT_SPREAD",
                    description:
                      "Indicates the directive is valid on fragment spreads.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INLINE_FRAGMENT",
                    description:
                      "Indicates the directive is valid on inline fragments.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "SCHEMA",
                    description:
                      "Indicates the directive is valid on a schema SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "SCALAR",
                    description:
                      "Indicates the directive is valid on a scalar SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "OBJECT",
                    description:
                      "Indicates the directive is valid on an object SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "FIELD_DEFINITION",
                    description:
                      "Indicates the directive is valid on a field SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "ARGUMENT_DEFINITION",
                    description:
                      "Indicates the directive is valid on a field argument SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INTERFACE",
                    description:
                      "Indicates the directive is valid on an interface SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "UNION",
                    description:
                      "Indicates the directive is valid on an union SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "ENUM",
                    description:
                      "Indicates the directive is valid on an enum SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "ENUM_VALUE",
                    description:
                      "Indicates the directive is valid on an enum value SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INPUT_OBJECT",
                    description:
                      "Indicates the directive is valid on an input object SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  },
                  {
                    name: "INPUT_FIELD_DEFINITION",
                    description:
                      "Indicates the directive is valid on an input object field SDL definition.",
                    isDeprecated: false,
                    deprecationReason: null
                  }
                ],
                possibleTypes: null
              }
            ],
            directives: [
              {
                name: "include",
                description:
                  "Directs the executor to include this field or fragment only when the `if` argument is true",
                locations: ["FIELD", "FRAGMENT_SPREAD", "INLINE_FRAGMENT"],
                args: [
                  {
                    name: "if",
                    description: "Included when true.",
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Boolean",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                onOperation: false,
                onFragment: true,
                onField: true
              },
              {
                name: "skip",
                description:
                  "Directs the executor to skip this field or fragment when the `if`'argument is true.",
                locations: ["FIELD", "FRAGMENT_SPREAD", "INLINE_FRAGMENT"],
                args: [
                  {
                    name: "if",
                    description: "Skipped when true.",
                    type: {
                      kind: "NON_NULL",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Boolean",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                onOperation: false,
                onFragment: true,
                onField: true
              },
              {
                name: "defer",
                description:
                  "This directive allows results to be deferred during execution",
                locations: ["FIELD"],
                args: [],
                onOperation: false,
                onFragment: false,
                onField: true
              },
              {
                name: "aws_auth",
                description:
                  "Directs the schema to enforce authorization on a field",
                locations: ["FIELD_DEFINITION"],
                args: [
                  {
                    name: "cognito_groups",
                    description:
                      "List of cognito user pool groups which have access on this field",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                onOperation: false,
                onFragment: false,
                onField: false
              },
              {
                name: "aws_publish",
                description:
                  "Tells the service which subscriptions will be published to when this mutation is called. This directive is deprecated use @aws_susbscribe directive instead.",
                locations: ["FIELD_DEFINITION"],
                args: [
                  {
                    name: "subscriptions",
                    description:
                      "List of subscriptions which will be published to when this mutation is called.",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                onOperation: false,
                onFragment: false,
                onField: false
              },
              {
                name: "aws_subscribe",
                description:
                  "Tells the service which mutation triggers this subscription.",
                locations: ["FIELD_DEFINITION"],
                args: [
                  {
                    name: "mutations",
                    description:
                      "List of mutations which will trigger this subscription when they are called.",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "String",
                        ofType: null
                      }
                    },
                    defaultValue: null
                  }
                ],
                onOperation: false,
                onFragment: false,
                onField: false
              },
              {
                name: "deprecated",
                description: null,
                locations: ["FIELD_DEFINITION", "ENUM_VALUE"],
                args: [
                  {
                    name: "reason",
                    description: null,
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    },
                    defaultValue: '"No longer supported"'
                  }
                ],
                onOperation: false,
                onFragment: false,
                onField: false
              }
            ]
          }
        }
      }
    })
  );
  const state = React.useMemo(() => stateMap.toJS(), [stateMap]);
  const { schema, client, ep, token } = state;
  React.useEffect(() => {
    if (!ep || !token) return;
    const client = createApolloClient(state.ep, state.token);
    setState(oldState => oldState.merge({ client }));
  }, [state.ep, state.token]);

  return (
    <>
      <GraphqlEndpoint
        defaultValue={ep}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          setState(oldState => oldState.merge({ ep: value }));
        }}
      />
      <TokenInput
        defaultValue={token}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          setState(oldState => oldState.merge({ token: value }));
        }}
      />
      <div>
        <SchemaInput defaultValue={JSON.stringify(schema)} />
      </div>
      {client && (
        <>
          <Divider />
          <ModelFormControllerProvider schema={schema}>
            <ApolloProvider client={client}>
              <ApolloHooksProvider client={client}>
                <SnackbarProvider
                  maxSnack={1}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <ModelFormPlayground/>
                </SnackbarProvider>
              </ApolloHooksProvider>
            </ApolloProvider>
          </ModelFormControllerProvider>
        </>
      )}
    </>
  );
}
