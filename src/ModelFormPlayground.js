import React from "react";
import ModelForm, { ModelFormContext } from "./modules/ModelForm";
import Button from "@material-ui/core/Button";
import ModelFieldInput from "./modules/ModelFieldInput";

const FormBody = props => {
  const { data: formData, state, handlers } = React.useContext(
    ModelFormContext
  );
  console.log("state", state, formData); //TRACE
  if (state.loading) return <div>loading...</div>;

  return (
    <div>
      <ModelFieldInput field="description" />
      <Button disabled={state.saving} color="primary" onClick={handlers.save}>
        {state.editMode ? "Update" : "Create"}
      </Button>
      <Button disabled={state.saving}>Cancel</Button>
    </div>
  );
};

export default function ModelFormPlayground(props) {
  return (
    <div>
      <ModelForm
        name="Vacancy"
        modelId={"d83e2918-8fc1-4750-bb15-b40844c72842"}
        // onSave={onSave}
        // additionalFields={extraProps}
      >
        <FormBody {...props} />
      </ModelForm>
    </div>
  );
}
