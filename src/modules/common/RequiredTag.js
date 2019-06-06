import React from "react";
import { ModelControlContext } from "../ModelControl";

export function requiredTagText() {
  return "(required)";
}

export default function RequiredTag() {
  const ctx = React.useContext(ModelControlContext);
  const required = ctx && ctx.required;

  if (!required) return null;

  return <span>{requiredTagText()}</span>;
}
