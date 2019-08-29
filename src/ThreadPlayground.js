import React from 'react';
import Promise from 'bluebird';
import { Thread } from './modules';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function ThreadPlayground() {
  const [state, setState] = React.useState({ subjects: [], allowSubmit: true });

  const inputRef = React.useRef(null);

  const handleRenderComment = React.useCallback(comment => {
    return <div data-testid={'thread-comment-item'}>{JSON.stringify(comment)}</div>;
  }, []);
  const handleSet = React.useCallback(() => {
    const value = inputRef.current.value;
    setState(oldState => ({ ...oldState, subjects: JSON.parse(value) }));
  }, []);
  const handleBeforeSubmit = React.useCallback(async () => {
    if (!state.allowSubmit) {
      await Promise.delay(500);
    }
    return state.allowSubmit;
  }, [state.allowSubmit]);
  return (
    <div>
      <TextField
        id="amr-thread-test-subjects"
        fullWidth
        inputProps={{
          ref: inputRef
        }}
        multiline
        margin="normal"
        variant="outlined"
        data-testid="amr-thread-test-subjects"
        label="Subjects(newline separated)"
      />
      <Button onClick={handleSet} variant="contained" color="primary">
        Set
      </Button>{' '}
      <Button
        variant="outlined"
        onClick={() => {
          setState(oldState => ({ ...oldState, allowSubmit: !oldState.allowSubmit }));
        }}>
        Allow Submit = {Boolean(state.allowSubmit).toString()}
      </Button>
      <Thread
        subjects={state.subjects}
        currentUserId="not_enuf"
        renderComment={handleRenderComment}
        commentDelay={20}
        beforeSubmit={handleBeforeSubmit}
      />
    </div>
  );
}
