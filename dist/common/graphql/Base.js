'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toKey = toKey;
exports.composeCreateMutation = composeCreateMutation;
exports.composeUpdateMutation = composeUpdateMutation;
exports.composeDeleteMutation = composeDeleteMutation;
exports.composeArchiveMutation = composeArchiveMutation;

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _upperCase = require('lodash/upperCase');

var _upperCase2 = _interopRequireDefault(_upperCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function upperCase() {
  return _upperCase2.default.apply(undefined, arguments).replace(/ /g, '');
}

function toKey(modelName) {
  return upperCase(modelName);
}

function composeCreateMutation(modelName) {
  return (0, _graphqlTag2.default)('\n  mutation ($input: Create' + modelName + 'Input!){\n    model: create' + modelName + ' (input: $input){\n      id\n    }\n  }\n  ');
}

function composeUpdateMutation(modelName) {
  return (0, _graphqlTag2.default)('\n  mutation ($input: Update' + modelName + 'Input!){\n    model: update' + modelName + ' (input: $input){\n      id\n    }\n  }\n  ');
}

function composeDeleteMutation(modelName) {
  return (0, _graphqlTag2.default)('\n  mutation ($input: Delete' + modelName + 'Input!){\n    model: delete' + modelName + ' (input: $input){\n      id\n    }\n  }\n  ');
}

function composeArchiveMutation(modelName, id) {
  return (0, _graphqlTag2.default)('\n  mutation {\n    update' + modelName + ' (input: {\n      id: "' + id + '"\n      archived: true\n    }){\n      id\n    }\n  }\n  ');
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