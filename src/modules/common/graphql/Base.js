import gql from 'graphql-tag';
import upperCaseLodash from 'lodash/upperCase';

function upperCase(...args) {
  return upperCaseLodash(...args).replace(/ /g, '');
}

export function toKey(modelName) {
  return upperCase(modelName);
}

export function composeCreateMutation(modelName) {
  return gql(`
  mutation ($input: Create${modelName}Input!){
    model: create${modelName} (input: $input){
      id
    }
  }
  `);
}

export function composeUpdateMutation(modelName) {
  return gql(`
  mutation ($input: Update${modelName}Input!){
    model: update${modelName} (input: $input){
      id
    }
  }
  `);
}

export function composeDeleteMutation(modelName) {
  return gql(`
  mutation ($input: Delete${modelName}Input!){
    model: delete${modelName} (input: $input){
      id
    }
  }
  `);
}

export function composeArchiveMutation(modelName, id) {
  return gql(`
  mutation {
    update${modelName} (input: {
      id: "${id}"
      archived: true
    }){
      id
    }
  }
  `);
}

// export function composeGetQuery(modelName, id, additionalFieldsStr = '') {
//   const queryKey = 'GET_' + upperCase(`${modelName}`);
//   return {
//     query: gql`
//   query ${queryKey}{
//     model:get${modelName}(id:"${id}"){
//       ${modelFlatFields[modelName]}
//       ${
//         queryKey === 'GET_JOBSEEKER'
//           ? `interviewVideo {
//         filename
//       }`
//           : ''
//       }
//       ${additionalFieldsStr}
//     }
//   }
// `,
//     queryKey,
//   };
// }

// export function composeListQuery(modelName, additionalFieldsStr = '') {
//   const queryKey = 'LIST_' + upperCase(`${modelName}`);
//   return {
//     query: gql`
//   query ${queryKey} ($filter: Model${modelName}FilterInput, $limit: Int = 999, $nextToken: String) {
//     list:list${modelName}s(limit: $limit, filter: $filter, nextToken: $nextToken){
//       items{
//         ${modelFlatFields[modelName]}
//         ${additionalFieldsStr}
//       }
//     }
//   }
// `,
//     queryKey,
//   };
// }
