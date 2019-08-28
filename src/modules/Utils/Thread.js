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
  createThread(input: { id: $subject_${ii} }) {
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

// function fetchComments({subjects,client}){

// }

export default function Talk({
  subject,
  subjects: allSubjects,
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
    listIds: []
  });
  const self = React.useRef({});
  const classes = useStyles();
  const client = useApolloClient();
  const subjects = subject ? [subject] : allSubjects || [];
  const mainSubject = subjects[0];

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
      variables['token_' + ii] = get(self, 'current.subjectTokens.' + subject);
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
    Object.values(get(res, 'data', {})).forEach(entry => {
      const commentDate = new Date(get(entry, 'comments.items.0.createdAt')).getTime();
      if (!newestEntry || commentDate > newestEntry) {
        newestEntry = commentDate;
        comment = get(entry, 'comments.items.0');
        nextToken = get(entry, 'comments.nextToken');
      }
    });
    if (!comment) return;
    const subject = comment.threadCommentThreadId;
    console.log('>>Utils/Thread::', 'comment', comment); //TRACE
    setState(oldState => {
      const listIds = oldState.listIds || [];
      const newItems = [comment];
      const oldSc = oldState.subjectComments;
      const oldScList = oldSc[subject] || [];
      const newScList = [...oldScList, ...newItems];
      const newListIds = [
        ...listIds,
        ...newItems.map((_, ii) => subject + '.' + (oldScList.length + ii))
      ];
      return {
        ...oldState,
        subjectComments: { ...oldSc, [subject]: newScList },
        listIds: newListIds
      };
    });
    set(self, 'current.subjectTokens.' + subject, nextToken);
  }, [subjects, client, commentDelay, basicFieldsString]);

  const fetch5Comments = React.useCallback(() => {
    Promise.map(
      range(5),
      async () => {
        await fetchComments();
      },
      { concurrency: 1 }
    );
  }, [fetchComments]);

  console.log('>>Utils/Thread::', 'state.subjectComments', state); //TRACE
  const reset = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      submitting: false,
      comment: '',
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
    fetch5Comments();
  }, [fetch5Comments]);

  const handleSubmit = React.useCallback(async () => {
    setState(oldState => ({ ...oldState, submitting: true }));
    const id = mainSubject + '::' + currentUserId + '::' + nanoid();
    const input = {
      id,
      threadCommentThreadId: mainSubject,
      userId: currentUserId,
      body: self.current.comment
    };
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
  }, [mainSubject, currentUserId, client, basicFieldsString, reset]);

  if (!mainSubject || subjects.length < 1 || !currentUserId) {
    return <div>loading..</div>;
  }

  return (
    <div>
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
            !state.comment || get(state, 'comment.length', 0) < 1 || state.submitting
          }
          onClick={handleSubmit}
          color="primary">
          Submit ✔
        </Button>
      </div>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {state.listIds.map(id => {
          const comment = get(state.subjectComments, id);
          console.log('>>Utils/Thread::', 'id', id, comment); //TRACE

          if (!comment) return null;
          if (renderComment)
            return (
              <ListItem onClick={onCommitClicked} key={id}>
                {renderComment(comment)}
              </ListItem>
            );

          return (
            <ListItem button key={id} onClick={onCommitClicked}>
              <ListItemText
                primary={comment.body}
                secondary={new Date(comment.createdAt).toLocaleString()}
              />
            </ListItem>
          );
        })}
      </List>
      <center>
        <Button variant="outlined" onClick={handleShowMore}>
          Show More
        </Button>
      </center>
    </div>
  );
}
