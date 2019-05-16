import React from "react";
import ModelForm, { ModelFormContext } from "./modules/ModelForm";
import Button from "@material-ui/core/Button";
import ModelFieldInput from "./modules/ModelFieldInput";
import ModelFieldSelector from "./modules/ModelFieldSelector";
import ModelFieldTextSelector from "./modules/ModelFieldTextSelector";
import ModelFieldDateTime from "./modules/ModelFieldDateTime";
import ModelFieldFile from "./modules/ModelFieldFile";
import ReactPlayer from "react-player";

const FormBody = props => {
  const { data: formData, state, handlers } = React.useContext(
    ModelFormContext
  );
  console.log("state", state, formData); //TRACE

  const videoRender = React.useCallback(({ file, url }) => {
    if (url) return <ReactPlayer controls url={url} />;
    else if (file)
      return <ReactPlayer controls url={URL.createObjectURL(file)} />;
    return null;
  }, []);

  if (state.loading) return <div>loading...</div>;

  return (
    <div>
      <ModelFieldSelector
        name="Client"
        field="vacancyClientId"
        renderLabel={client => client.name}
      />
      <ModelFieldDateTime field="startDate" />
      <ModelFieldInput field="description" />
      <ModelFieldFile
        field="video"
        render={videoRender}
        storageOpts={{ provider: "DummyStorageProvider" }}
      />
      <ModelFieldTextSelector
        field="award"
        placeholder="Change to Pathway Outcome"
        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
      />
      <Button disabled={state.saving} color="primary" onClick={handlers.save}>
        {state.editMode ? "Update" : "Create"}
      </Button>
      <Button disabled={state.saving}>Cancel</Button>
    </div>
  );
};

const extraProps = `
  video {
    filename
  }
`;

export default function ModelFormPlayground(props) {
  return (
    <div>
      <ModelForm
        name="Vacancy"
        modelId={"cdf71f59-debb-44ce-94b2-f94f2e41d5e4"}
        // onSave={onSave}
        additionalFields={extraProps}
      >
        <FormBody {...props} />
      </ModelForm>
    </div>
  );
}
