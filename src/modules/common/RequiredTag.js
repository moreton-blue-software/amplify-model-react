/* eslint-disable react/no-multi-comp */
import React from 'react';
import { ModelControlContext } from '../ModelControl';

const DEFAULT_TEXT = '(required)';

function Tag() {
  const ctx = React.useContext(ModelControlContext);

  return <span>{ctx.requiredLabel || DEFAULT_TEXT}</span>;
}

export function requiredTagText() {
  return <Tag />;
}

export function useRequiredTagText() {
  const ctx = React.useContext(ModelControlContext);
  if (ctx && ctx.requiredLabel) return ctx.requiredLabel;
  return DEFAULT_TEXT;
}

export default function RequiredTag() {
  const ctx = React.useContext(ModelControlContext);
  const required = ctx && ctx.required;

  if (!required) return null;

  return <span>{requiredTagText()}</span>;
}
