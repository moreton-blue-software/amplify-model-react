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

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    mutations += '\n      c_' + ii + ': createThread(input: { id: $subject_' + ii + ' }) {\n        id\n      }\n  ';
    variables['subject_' + ii] = sub;
  });
  return client.mutate({
    mutation: (0, _graphqlTag2.default)(_templateObject, args, mutations),
    errorPolicy: 'ignore',
    variables: variables
  });
}

function DefaultComment(_ref) {
  var comment = _ref.comment;

  var secondary = _react2.default.useMemo(function () {
    return comment.userId.substring(0, 6) + ' ▪ ' + new Date(comment.createdAt).toLocaleString();
  }, [comment]);
  return _react2.default.createElement(_ListItemText2.default, { primary: comment.body, secondary: secondary });
}

// eslint-disable-next-line react/no-multi-comp
function Talk(_ref2) {
  var _this = this;

  var subject = _ref2.subject,
      allSubjects = _ref2.subjects,
      beforeSubmit = _ref2.beforeSubmit,
      currentUserId = _ref2.currentUserId,
      inputProps = _ref2.inputProps,
      renderComment = _ref2.renderComment,
      _ref2$commentDelay = _ref2.commentDelay,
      commentDelay = _ref2$commentDelay === undefined ? 200 : _ref2$commentDelay,
      onCommitClicked = _ref2.onCommitClicked;

  var _React$useState = _react2.default.useState({
    comment: '',
    submitting: false,
    subjectComments: {},
    listIds: [],
    noMore: false,
    loading: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var self = _react2.default.useRef({});
  var classes = useStyles();
  var client = (0, _reactApolloHooks.useApolloClient)();

  var _React$useMemo = _react2.default.useMemo(function () {
    var subjectMetadata = {};
    var tmpSubjects = allSubjects.map(function (sub) {
      if (sub.threadId) {
        subjectMetadata[sub.threadId] = sub;
        return sub.threadId;
      }
      subjectMetadata[sub] = { threadId: sub };
      return sub;
    });
    var subjects = subject ? [subject] : tmpSubjects || [];
    return { subjects: subjects, subjectMetadata: subjectMetadata };
  }, [allSubjects, subject]),
      subjects = _React$useMemo.subjects,
      subjectMetadata = _React$useMemo.subjectMetadata;

  var mainSubject = subjects[0];
  console.log('>>Utils/Thread::', 'subjectMetadata', subjectMetadata); //TRACE

  var _React$useContext = _react2.default.useContext(_ModelFormController2.default),
      getModelSchema = _React$useContext.getModelSchema;

  var _React$useMemo2 = _react2.default.useMemo(function () {
    return getModelSchema('ThreadComment');
  }, [getModelSchema]),
      basicFieldsString = _React$useMemo2.basicFieldsString;

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
    var args, queries, variables, _ref4, _ref5, res, newestEntry, comment, nextToken, entries, subject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = '', queries = '';
            variables = {};

            subjects.forEach(function (subject, ii) {
              var nextToken = (0, _get2.default)(self, 'current.subjectTokens.' + subject);
              if (nextToken === null) {
                console.log('>>Utils/Thread::', 'subject ' + subject + ' is empty'); //TRACE
                return;
              }
              args += '\n        $token_' + ii + ': String\n      ';
              queries += '\n        thread_' + ii + ': getThread(id:"' + subject + '"){\n          id\n          comments(nextToken: $token_' + ii + ', sortDirection: DESC, limit: 1){\n            nextToken\n            items {\n              ' + basicFieldsString + '\n            }\n          }\n        }\n      ';
              variables['token_' + ii] = nextToken;
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
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 1);
            res = _ref5[0];

            //pick which one is newer
            newestEntry = void 0, comment = void 0, nextToken = void 0;
            entries = Object.values((0, _get2.default)(res, 'data', {}));

            entries.forEach(function (entry) {
              var subjectComment = (0, _get2.default)(entry, 'comments.items.0');
              var subjectNextToken = (0, _get2.default)(entry, 'comments.nextToken');
              console.log('>>Utils/Thread::', 'subjectNextToken', subjectNextToken, subjectNextToken); //TRACE
              if (!subjectComment && subjectNextToken === null) {
                (0, _set2.default)(self, 'current.subjectTokens.' + entry.id, null);
                return;
              }
              var commentDate = new Date(subjectComment.createdAt).getTime();
              if (!newestEntry || commentDate >= newestEntry) {
                newestEntry = commentDate;
                comment = subjectComment;
                nextToken = subjectNextToken;
              }
            });

            if (comment) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return');

          case 15:
            subject = comment.threadCommentThreadId;

            (0, _set2.default)(self, 'current.subjectTokens.' + subject, nextToken);
            console.log('>>Utils/Thread::', 'token _next', nextToken); //TRACE
            setState(function (oldState) {
              var listIds = oldState.listIds || [];
              var newItems = _defineProperty({}, comment.id, comment);
              var oldSc = oldState.subjectComments;
              var oldScList = oldSc[subject] || {};

              if (oldScList[comment.id]) return oldState; //already added;

              var newScList = _extends({}, oldScList, newItems);
              var newListIds = [].concat(_toConsumableArray(listIds), _toConsumableArray(Object.keys(newItems).map(function (k) {
                return subject + '.' + k;
              })));
              return _extends({}, oldState, {
                subjectComments: _extends({}, oldSc, _defineProperty({}, subject, newScList)),
                listIds: newListIds
              });
            });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })), [subjects, client, commentDelay, basicFieldsString]);

  var fetch5Comments = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setState(function (oldState) {
              return _extends({}, oldState, { loading: true });
            });
            _context3.next = 3;
            return _bluebird2.default.map((0, _range2.default)(5), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

          case 3:
            setState(function (oldState) {
              return _extends({}, oldState, { loading: false });
            });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })), [fetchComments]);

  var reset = _react2.default.useCallback(function () {
    setState(function (oldState) {
      return _extends({}, oldState, {
        submitting: false,
        comment: '',
        noMore: false,
        loading: false,
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

  var handleShowMore = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var tokens, tokenList, cantShowMore;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tokens = (0, _get2.default)(self, 'current.subjectTokens', {});
            tokenList = Object.values(tokens);
            cantShowMore = tokenList.length === subjects.length && tokenList.every(function (token) {
              return token === null;
            });

            if (!cantShowMore) {
              _context4.next = 6;
              break;
            }

            setState(function (oldState) {
              return _extends({}, oldState, { noMore: true });
            });
            return _context4.abrupt('return');

          case 6:
            fetch5Comments();

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })), [fetch5Comments, subjects.length]);
  console.log('>>Utils/Thread::', 'state', state); //TRACE

  var handleSubmit = _react2.default.useCallback(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var id, input, allow, x;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
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

            if (!beforeSubmit) {
              _context5.next = 10;
              break;
            }

            _context5.next = 6;
            return _bluebird2.default.resolve(beforeSubmit(input));

          case 6:
            allow = _context5.sent;

            if (allow) {
              _context5.next = 10;
              break;
            }

            setState(function (oldState) {
              return _extends({}, oldState, { submitting: false });
            });
            return _context5.abrupt('return');

          case 10:
            console.log('>>Utils/Thread::', 'input', input); //TRACE
            _context5.next = 13;
            return client.mutate({
              mutation: (0, _graphqlTag2.default)(_templateObject3, basicFieldsString),
              variables: {
                input: input
              }
            });

          case 13:
            x = _context5.sent;

            console.log('>>Utils/Thread::', 'x', x); //TRACE
            reset();

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })), [mainSubject, currentUserId, beforeSubmit, client, basicFieldsString, reset]);

  var isInitializing = !mainSubject || subjects.length < 1 || !currentUserId;
  var isLoading = state.submitting || state.loading;
  return _react2.default.createElement(
    'div',
    { 'data-testid': 'amr-thread-container' },
    isInitializing ? _react2.default.createElement(
      'center',
      null,
      _react2.default.createElement(_CircularProgress2.default, null)
    ) : _react2.default.createElement(
      _react2.default.Fragment,
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
            disabled: isLoading || !state.comment || (0, _get2.default)(state, 'comment.length', 0) < 1,
            onClick: handleSubmit,
            color: 'primary' },
          isLoading ? 'Please wait 🕕' : 'Submit ✔'
        )
      ),
      _react2.default.createElement(_Divider2.default, null),
      _react2.default.createElement(
        _List2.default,
        { component: 'nav', role: 'thread-comment-list' },
        state.listIds.map(function (id) {
          var comment = (0, _get2.default)(state.subjectComments, id);

          if (!comment) return null;
          if (renderComment) return _react2.default.createElement(
            _ListItem2.default,
            { onClick: onCommitClicked, key: id },
            renderComment(comment)
          );

          return _react2.default.createElement(
            _ListItem2.default,
            { button: true, key: id, onClick: onCommitClicked },
            _react2.default.createElement(DefaultComment, { comment: comment })
          );
        })
      ),
      _react2.default.createElement(
        'center',
        null,
        _react2.default.createElement(
          _Button2.default,
          { variant: 'outlined', onClick: handleShowMore, disabled: state.noMore },
          'Show More'
        )
      )
    )
  );
}