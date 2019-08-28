import React from 'react';
import { Thread } from './modules';

export default function ThreadPlayground() {
  const handleRenderComment = React.useCallback(comment => {
    return JSON.stringify(comment);
  }, []);
  return (
    <div>
      <Thread
        subjects={['hello_sombething', 'hello_*']}
        currentUserId="not_enuf"
        // renderComment={handleRenderComment}
      />
    </div>
  );
}
