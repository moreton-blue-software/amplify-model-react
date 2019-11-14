/* eslint-disable react/no-multi-comp */
import React from 'react';
import { ModelControlContext } from '../ModelControl';

function Tag() {
  const ctx = React.useContext(ModelControlContext);

  return <span>{ctx.requiredLabel || '(required)'}</span>;
}

export function requiredTagText() {
  return <Tag />;
}

export default function RequiredTag() {
  const ctx = React.useContext(ModelControlContext);
  const required = ctx && ctx.required;

  if (!required) return null;

  return <span>{requiredTagText()}</span>;
}
