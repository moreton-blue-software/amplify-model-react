/* eslint-disable no-console */
import React from 'react';
import Promise from 'bluebird';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useApolloClient } from 'react-apollo-hooks';
import ModelFormControllerContext from '../ModelFormController';
import nanoid from 'nanoid';
import get from 'lodash/get';
import set from 'lodash/set';
import range from 'lodash/range';

const useStyles = makeStyles({
  actions: {
    paddingBottom: 5
  }
});

function initThreads(subjects = [], client) {
  if (subjects.length < 1) return Promise.resolve();
  let args = '',
    mutations = '';
  const variables = {};
  subjects.forEach((sub, ii) => {
    args += `
  $subject_${ii}: ID!
  `;
    mutations += `
      c_${ii}: createThread(input: { id: $subject_${ii}, hash: "_thread" }) {
        id
      }
  `;
    variables['subject_' + ii] = sub;
  });
  return client.mutate({
    mutation: gql`
      mutation(
        ${args}
      ) {
        ${mutations}
      }
    `,
    errorPolicy: 'ignore',
    variables
  });
}

function DefaultComment({ comment }) {
  const secondary = React.useMemo(() => {
    return (
      comment.userId.substring(0, 6) +
      ' ▪ ' +
      new Date(comment.createdAt).toLocaleString()
    );
  }, [comment]);
  return <ListItemText primary={comment.body} secondary={secondary} />;
}

// eslint-disable-next-line react/no-multi-comp
export default function Talk({
  subject,
  subjects: allSubjects,
  beforeSubmit,
  // name = '',
  currentUserId,
  inputProps,
  renderComment,
  commentDelay = 200,
  onCommitClicked
}) {
  const [state, setState] = React.useState({
    comment: '',
    submitting: false,
    subjectComments: {},
    listIds: [],
    noMore: false,
    loading: false
  });
  const self = React.useRef({});
  const classes = useStyles();
  const client = useApolloClient();
  const { subjects, subjectMetadata } = React.useMemo(() => {
    const subjectMetadata = {};
    const tmpSubjects = allSubjects.map(sub => {
      if (sub.threadId) {
        subjectMetadata[sub.threadId] = sub;
        return sub.threadId;
      }
      subjectMetadata[sub] = { threadId: sub };
      return sub;
    });
    const subjects = subject ? [subject] : tmpSubjects || [];
    return { subjects, subjectMetadata };
  }, [allSubjects, subject]);
  const mainSubject = subjects[0];
  console.log('>>Utils/Thread::', 'subjectMetadata', subjectMetadata); //TRACE
  const { getModelSchema } = React.useContext(ModelFormControllerContext);
  const { basicFieldsString } = React.useMemo(() => getModelSchema('ThreadComment'), [
    getModelSchema
  ]);

  React.useEffect(() => {
    self.current.comment = state.comment;
  }, [state.comment]);
  const inpProps = React.useMemo(() => {
    const defaultInputProps = {
      label: 'Comment'
    };
    return { ...defaultInputProps, ...(inputProps || {}) };
  }, [inputProps]);

  const handleChange = React.useCallback(e => {
    const comment = e.target.value;
    setState(oldState => ({ ...oldState, comment }));
  }, []);

  const fetchComments = React.useCallback(async () => {
    let args = '',
      queries = '';
    const variables = {};
    subjects.forEach((subject, ii) => {
      const nextToken = get(self, 'current.subjectTokens.' + subject);
      if (nextToken === null) {
        console.log('>>Utils/Thread::', 'subject ' + subject + ' is empty'); //TRACE
        return;
      }
      args += `
        $token_${ii}: String
      `;
      queries += `
        thread_${ii}: getThread(id:"${subject}"){
          id
          comments(nextToken: $token_${ii}, sortDirection: DESC, limit: 1){
            nextToken
            items {
              ${basicFieldsString}
            }
          }
        }
      `;
      variables['token_' + ii] = nextToken;
    });
    if (Object.keys(variables).length < 1) return;

    const [res] = await Promise.all([
      client.query({
        query: gql`
        query (
          ${args}
        ){
          ${queries}
        }
      `,
        variables,
        fetchPolicy: 'network-only'
      }),
      Promise.delay(commentDelay)
    ]);
    //pick which one is newer
    let newestEntry, comment, nextToken;
    const entries = Object.values(get(res, 'data', {}));
    entries.forEach(entry => {
      const subjectComment = get(entry, 'comments.items.0');
      const subjectNextToken = get(entry, 'comments.nextToken');
      console.log(
        '>>Utils/Thread::',
        'subjectNextToken',
        subjectNextToken,
        subjectNextToken
      ); //TRACE
      if (!subjectComment && subjectNextToken === null) {
        set(self, 'current.subjectTokens.' + entry.id, null);
        return;
      }
      const commentDate = new Date(subjectComment.createdAt).getTime();
      if (!newestEntry || commentDate >= newestEntry) {
        newestEntry = commentDate;
        comment = subjectComment;
        nextToken = subjectNextToken;
      }
    });
    if (!comment) return;

    const subject = comment.threadCommentThreadId;
    set(self, 'current.subjectTokens.' + subject, nextToken);
    console.log('>>Utils/Thread::', 'token _next', nextToken); //TRACE
    setState(oldState => {
      const listIds = oldState.listIds || [];
      const newItems = { [comment.id]: comment };
      const oldSc = oldState.subjectComments;
      const oldScList = oldSc[subject] || {};

      if (oldScList[comment.id]) return oldState; //already added;

      const newScList = { ...oldScList, ...newItems };
      const newListIds = [
        ...listIds,
        ...Object.keys(newItems).map(k => subject + '.' + k)
      ];
      return {
        ...oldState,
        subjectComments: { ...oldSc, [subject]: newScList },
        listIds: newListIds
      };
    });
  }, [subjects, client, commentDelay, basicFieldsString]);

  const fetch5Comments = React.useCallback(async () => {
    setState(oldState => ({ ...oldState, loading: true }));
    await Promise.map(
      range(5),
      async () => {
        await fetchComments();
      },
      { concurrency: 1 }
    );
    setState(oldState => ({ ...oldState, loading: false }));
  }, [fetchComments]);

  const reset = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      submitting: false,
      comment: '',
      noMore: false,
      loading: false,
      subjectComments: {},
      listIds: []
    }));
    self.current = {};
    fetch5Comments();
  }, [fetch5Comments]);

  React.useEffect(() => {
    //create thread
    initThreads(subjects, client).finally(() => {
      console.log('>>Utils/Thread::', 'created'); //TRACE
      fetch5Comments();
    });
  }, [client, fetch5Comments, fetchComments, subjects]);

  const handleShowMore = React.useCallback(async () => {
    const tokens = get(self, 'current.subjectTokens', {});
    const tokenList = Object.values(tokens);
    const cantShowMore =
      tokenList.length === subjects.length && tokenList.every(token => token === null);
    if (cantShowMore) {
      setState(oldState => ({ ...oldState, noMore: true }));
      return;
    }
    fetch5Comments();
  }, [fetch5Comments, subjects.length]);
  console.log('>>Utils/Thread::', 'state', state); //TRACE

  const handleSubmit = React.useCallback(async () => {
    setState(oldState => ({ ...oldState, submitting: true }));
    const id = mainSubject + '::' + currentUserId + '::' + nanoid();
    const input = {
      id,
      threadCommentThreadId: mainSubject,
      userId: currentUserId,
      body: self.current.comment
    };
    if (beforeSubmit) {
      const allow = await Promise.resolve(beforeSubmit(input));
      if (!allow) {
        setState(oldState => ({ ...oldState, submitting: false }));
        return;
      }
    }
    console.log('>>Utils/Thread::', 'input', input); //TRACE
    const x = await client.mutate({
      mutation: gql`
        mutation($input: CreateThreadCommentInput!) {
          createThreadComment(input: $input){
            ${basicFieldsString}
          }
        }
      `,
      variables: {
        input
      }
    });
    console.log('>>Utils/Thread::', 'x', x); //TRACE
    reset();
  }, [mainSubject, currentUserId, beforeSubmit, client, basicFieldsString, reset]);

  const isInitializing = !mainSubject || subjects.length < 1 || !currentUserId;
  const isLoading = state.submitting || state.loading;
  return (
    <div data-testid="amr-thread-container">
      {isInitializing ? (
        <center>
          <CircularProgress />
        </center>
      ) : (
        <React.Fragment>
          <TextField
            id="amr-thread-input"
            fullWidth
            multiline
            value={state.comment}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            data-testid="amr-thread-input"
            {...inpProps}
          />
          <div className={classes.actions}>
            <Button
              variant="contained"
              disabled={
                isLoading || !state.comment || get(state, 'comment.length', 0) < 1
              }
              onClick={handleSubmit}
              color="primary">
              {isLoading ? 'Please wait 🕕' : 'Submit ✔'}
            </Button>
          </div>
          <Divider />
          <List component="nav" role="thread-comment-list">
            {state.listIds.map(id => {
              const comment = get(state.subjectComments, id);

              if (!comment) return null;
              if (renderComment)
                return (
                  <ListItem onClick={onCommitClicked} key={id}>
                    {renderComment(comment)}
                  </ListItem>
                );

              return (
                <ListItem button key={id} onClick={onCommitClicked}>
                  <DefaultComment comment={comment} />
                </ListItem>
              );
            })}
          </List>
          <center>
            <Button variant="outlined" onClick={handleShowMore} disabled={state.noMore}>
              Show More
            </Button>
          </center>
        </React.Fragment>
      )}
    </div>
  );
}
