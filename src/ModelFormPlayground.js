import React from "react";
import ModelForm, { ModelFormContext } from "./modules/ModelForm";
import Button from "@material-ui/core/Button";
import ModelFieldInput from "./modules/ModelFieldInput";
import ModelFieldSelector from "./modules/ModelFieldSelector";
import ModelFieldTextSelector from "./modules/ModelFieldTextSelector";
import ModelFieldDateTime from "./modules/ModelFieldDateTime";
import ModelFieldDate from "./modules/ModelFieldDate";
import ModelFieldFile from "./modules/ModelFieldFile";
import ReactPlayer from "react-player";
import get from "lodash/get";
import range from "lodash/range";
import Promise from "bluebird";

const Fields = props => {
  const { data } = React.useContext(ModelFormContext);
  console.log(">>src/ModelFormPlayground::", "model", data); //TRACE
  return (
    <ModelFieldSelector
      name="Question"
      field="vacancyQuestionQuestionId"
      label={`Question ..`}
      renderLabel={q => q.text}
    />
  );
};
const VacancyQuestion = props => {
  const { vq, index, parentRef, onDelete } = props;

  const beforeSave = React.useCallback(async ({ context, parent }) => {
    console.log("saving formData,parentContext", context, parent); //TRACE
    return { vacancyQuestionVacancyId: parent.data.id, archived: true };
  }, []);
  console.log(">>src/ModelFormPlayground::", "vq", vq); //TRACE
  return (
    <ModelForm
      key={index}
      name="VacancyQuestion"
      defaultModelValue={vq}
      beforeSave={beforeSave}
      // afterSave={afterSave}
    >
      <Fields />
    </ModelForm>
  );
};

const FormBody = props => {
  const { data: formData, state, handlers } = React.useContext(
    ModelFormContext
  );
  console.log("state", state, formData); //TRACE
  React.useEffect(() => {
    Promise.delay(3000).then(() => {
      const ctxs = handlers.getChildContexts();
      console.log(">>src/ModelFormPlayground::", "ctxs", ctxs); //TRACE
    });
  }, [formData]);
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
        queryOpts={{
          fetchPolicy: "network-only",
          limit: 101,
          dataFilter: {
            archived: {
              ne: true
            }
          }
        }}
      />
      <ModelFieldSelector
        name="Employee"
        // disabled={!!agencyId}
        label="Account Manager"
        field="clientAccountManagerId"
        renderLabel={employee => `${employee.firstName} ${employee.surname}`}
        sorter={(a, b) => {
          if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
          if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
          return 0;
        }}
        filter={f => {
          console.log(">>src/ModelFormPlayground::", "f", f); //TRACE
          return true;
        }}
      />
      <ModelFieldDateTime field="startDate" />
      <ModelFieldDateTime
        field="startDate"
        dateOnly
        label="Start Date(date only)"
        pickerProps={{
          format: "dd/MM/yyyy",
          label: "Date of birth",
          views: ["year", "month", "day"]
        }}
      />
      {/* <ModelFieldDate
        field="startDate"
        label="Start Date(date only, strict)"
        pickerProps={{
          format: "dd/MM/yyyy",
          label: "Date of birth",
          views: ["year", "month", "day"]
        }}
      /> */}
      <ModelFieldInput field="description" />
      <ModelFieldFile
        label="hello"
        buttonLabel="world"
        field="video"
        render={videoRender}
        storageOpts={{ provider: "DummyStorageProvider" }}
      />
      <ModelFieldTextSelector
        field="award"
        placeholder="Change to Pathway Outcome"
        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
      />
      {range(1).map(i => {
        return (
          <VacancyQuestion key={i} vq={get(formData, "questions.items.0")} />
        );
      })}
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
  questions (filter:{
    archived: {eq:true}
  }){
    items {
      id
      question{
        id
        text
      }
    }
  }
`;

export default function ModelFormPlayground(props) {
  return (
    <div>
      <ModelForm
        name="Vacancy"
        modelId={"10009c7f-f77c-4389-b480-19cc3675e109"}
        // onSave={onSave}
        additionalFields={extraProps}
      >
        <FormBody {...props} />
      </ModelForm>
    </div>
  );
}
