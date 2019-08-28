'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(['\n      mutation(\n        ', '\n      ) {\n        ', '\n      }\n    '], ['\n      mutation(\n        ', '\n      ) {\n        ', '\n      }\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        query (\n          ', '\n        ){\n          ', '\n        }\n      '], ['\n        query (\n          ', '\n        ){\n          ', '\n        }\n      ']),
    _templateObject3 = _taggedTemplateLiteral(['\n        mutation($input: CreateThreadCommentInput!) {\n          createThreadComment(input: $input){\n            ', '\n          }\n        }\n      '], ['\n        mutation($input: CreateThreadCommentInput!) {\n          createThreadComment(input: $input){\n            ', '\n          }\n        }\n      ']);

exports.default = Talk;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _styles = require('@material-ui/core/styles');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApolloHooks = require('react-apollo-hooks');

var _ModelFormController = require('../ModelFormController');

var _ModelFormController2 = _interopRequireDefault(_ModelFormController);

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* eslint-disable no-console */


var useStyles = (0, _styles.makeStyles)({
  actions: {
    paddingBottom: 5
  }
});

function initThreads() {
  var subjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var client = arguments[1];

  if (subjects.length < 1) return _bluebird2.default.resolve();
  var args = '',
      mutations = '';
  var variables = {};
  subjects.forEach(function (sub, ii) {
    args += '\n  $subject_' + ii + ': ID!\n  ';
    mutations += '\n  createThread(input: { id: $subject_' + ii + ' }) {\n    id\n  }\n  ';
    variables['subject_' + ii] = sub;
  });
  return client.mutate({
    mutation: (0, _graphqlTag2.default)(_templateObject, args, mutations),
    errorPolicy: 'ignore',
    variables: variables
  });
}

// function fetchComments({subjects,client}){

// }

function Talk(_ref) {
  var _this = this;

  var subject = _ref.subject,
      allSubjects = _ref.subjects,
      currentUserId = _ref.currentUserId,
      inputProps = _ref.inputProps,
      renderComment = _ref.renderComment,
      _ref$commentDelay = _ref.commentDelay,
      commentDelay = _ref$commentDelay === undefined ? 200 : _ref$commentDelay,
      onCommitClicked = _ref.onCommitClicked;

  var _React$useState = _react2.default.useState({
    comment: '',
    submitting: false,
    subjectComments: {},
    listIds: []
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var self = _react2.default.useRef({});
  var classes = useStyles();
  var client = (0, _reactApolloHooks.useApolloClient)();
  var subjects = subject ? [subject] : allSubjects || [];
  var mainSubject = subjects[0];

  var _React$useContext = _react2.default.useContext(_ModelFormController2.default),
      getModelSchema = _React$useContext.getModelSchema;

  var _React$useMemo = _react2.default.useMemo(function () {
    return getModelSchema('ThreadComment');
  }, [getModelSchema]),
      basicFieldsString = _React$useMemo.basicFieldsString;

  _react2.default.useEffect(function () {
    self.current.comment = state.comment;
  }, [state.comment]);
  var inpProps = _react2.default.useMemo(function () {
    var defaultInputProps = {
      label: 'Comment'
    };
    return _extends({}, defaultInputProps, inputProps || {});
  }, [inputProps]);

  var handleChange = _react2.default.useCallback(function (e) {
    var comment = e.target.value;
    setState(function (oldState) {
      return _extends({}, oldState, { comment: comment });
    });
  }, []);

  var fetchComments = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var args, queries, variables, _ref3, _ref4, res, newestEntry, comment, nextToken, subject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = '', queries = '';
            variables = {};

            subjects.forEach(function (subject, ii) {
              args += '\n        $token_' + ii + ': String\n      ';
              queries += '\n        thread_' + ii + ': getThread(id:"' + subject + '"){\n          id\n          comments(nextToken: $token_' + ii + ', sortDirection: DESC, limit: 1){\n            nextToken\n            items {\n              ' + basicFieldsString + '\n            }\n          }\n        }\n      ';
              variables['token_' + ii] = (0, _get2.default)(self, 'current.subjectTokens.' + subject);
            });

            if (!(Object.keys(variables).length < 1)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            _context.next = 7;
            return _bluebird2.default.all([client.query({
              query: (0, _graphqlTag2.default)(_templateObject2, args, queries),
              variables: variables,
              fetchPolicy: 'network-only'
            }), _bluebird2.default.delay(commentDelay)]);

          case 7:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            res = _ref4[0];

            //pick which one is newer
            newestEntry = void 0, comment = void 0, nextToken = void 0;

            Object.values((0, _get2.default)(res, 'data', {})).forEach(function (entry) {
              var commentDate = new Date((0, _get2.default)(entry, 'comments.items.0.createdAt')).getTime();
              if (!newestEntry || commentDate > newestEntry) {
                newestEntry = commentDate;
                comment = (0, _get2.default)(entry, 'comments.items.0');
                nextToken = (0, _get2.default)(entry, 'comments.nextToken');
              }
            });

            if (comment) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return');

          case 14:
            subject = comment.threadCommentThreadId;

            console.log('>>Utils/Thread::', 'comment', comment); //TRACE
            setState(function (oldState) {
              var listIds = oldState.listIds || [];
              var newItems = [comment];
              var oldSc = oldState.subjectComments;
              var oldScList = oldSc[subject] || [];
              var newScList = [].concat(_toConsumableArray(oldScList), newItems);
              var newListIds = [].concat(_toConsumableArray(listIds), _toConsumableArray(newItems.map(function (_, ii) {
                return subject + '.' + (oldScList.length + ii);
              })));
              return _extends({}, oldState, {
                subjectComments: _extends({}, oldSc, _defineProperty({}, subject, newScList)),
                listIds: newListIds
              });
            });
            (0, _set2.default)(self, 'current.subjectTokens.' + subject, nextToken);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })), [subjects, client, commentDelay, basicFieldsString]);

  var fetch5Comments = _react2.default.useCallback(function () {
    _bluebird2.default.map((0, _range2.default)(5), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchComments();

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })), { concurrency: 1 });
  }, [fetchComments]);

  console.log('>>Utils/Thread::', 'state.subjectComments', state); //TRACE
  var reset = _react2.default.useCallback(function () {
    setState(function (oldState) {
      return _extends({}, oldState, {
        submitting: false,
        comment: '',
        subjectComments: {},
        listIds: []
      });
    });
    self.current = {};
    fetch5Comments();
  }, [fetch5Comments]);

  _react2.default.useEffect(function () {
    //create thread
    initThreads(subjects, client).finally(function () {
      console.log('>>Utils/Thread::', 'created'); //TRACE
      fetch5Comments();
    });
  }, [client, fetch5Comments, fetchComments, subjects]);

  var handleShowMore = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fetch5Comments();

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })), [fetch5Comments]);

  var handleSubmit = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var id, input, x;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            setState(function (oldState) {
              return _extends({}, oldState, { submitting: true });
            });
            id = mainSubject + '::' + currentUserId + '::' + (0, _nanoid2.default)();
            input = {
              id: id,
              threadCommentThreadId: mainSubject,
              userId: currentUserId,
              body: self.current.comment
            };

            console.log('>>Utils/Thread::', 'input', input); //TRACE
            _context4.next = 6;
            return client.mutate({
              mutation: (0, _graphqlTag2.default)(_templateObject3, basicFieldsString),
              variables: {
                input: input
              }
            });

          case 6:
            x = _context4.sent;

            console.log('>>Utils/Thread::', 'x', x); //TRACE
            reset();

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })), [mainSubject, currentUserId, client, basicFieldsString, reset]);

  if (!mainSubject || subjects.length < 1 || !currentUserId) {
    return _react2.default.createElement(
      'div',
      null,
      'loading..'
    );
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_TextField2.default, _extends({
      id: 'amr-thread-input',
      fullWidth: true,
      multiline: true,
      value: state.comment,
      onChange: handleChange,
      margin: 'normal',
      variant: 'outlined',
      'data-testid': 'amr-thread-input'
    }, inpProps)),
    _react2.default.createElement(
      'div',
      { className: classes.actions },
      _react2.default.createElement(
        _Button2.default,
        {
          variant: 'contained',
          disabled: !state.comment || (0, _get2.default)(state, 'comment.length', 0) < 1 || state.submitting,
          onClick: handleSubmit,
          color: 'primary' },
        'Submit \u2714'
      )
    ),
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(
      _List2.default,
      { component: 'nav', 'aria-label': 'main mailbox folders' },
      state.listIds.map(function (id) {
        var comment = (0, _get2.default)(state.subjectComments, id);
        console.log('>>Utils/Thread::', 'id', id, comment); //TRACE

        if (!comment) return null;
        if (renderComment) return _react2.default.createElement(
          _ListItem2.default,
          { onClick: onCommitClicked, key: id },
          renderComment(comment)
        );

        return _react2.default.createElement(
          _ListItem2.default,
          { button: true, key: id, onClick: onCommitClicked },
          _react2.default.createElement(_ListItemText2.default, {
            primary: comment.body,
            secondary: new Date(comment.createdAt).toLocaleString()
          })
        );
      })
    ),
    _react2.default.createElement(
      'center',
      null,
      _react2.default.createElement(
        _Button2.default,
        { variant: 'outlined', onClick: handleShowMore },
        'Show More'
      )
    )
  );
}