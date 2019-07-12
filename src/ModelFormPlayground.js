import React from "react";
import ModelForm, { ModelFormContext } from "./modules/ModelForm";
import Button from "@material-ui/core/Button";
import ModelFieldInput from "./modules/ModelFieldInput";
import ModelFieldSelector from "./modules/ModelFieldSelector";
import ModelFieldTextSelector from "./modules/ModelFieldTextSelector";
import ModelFieldDateTime from "./modules/ModelFieldDateTime";
import ModelFieldDate from "./modules/ModelFieldDate";
import ModelFieldFile from "./modules/ModelFieldFile";
import ModelSelector from "./modules/ModelSelector";
import ReactPlayer from "react-player";
import get from "lodash/get";
import range from "lodash/range";
import Promise from "bluebird";
import { Alerts, ModelFieldControl as ModelControl } from "./modules";

const Fields = props => {
  const { data } = React.useContext(ModelFormContext);
  console.log(">>src/ModelFormPlayground::", "model", data); //TRACE
  return (
    <>
      <ModelControl required>
        <ModelFieldInput field="description" />
      </ModelControl>
      <ModelFieldSelector
        name="Question"
        field="vacancyQuestionQuestionId"
        label={`Question ..`}
        renderLabel={q => q.text}
      />
    </>
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
    <>
      <ModelForm
        key={index}
        onChange={e => {
          console.log(">>src/ModelFormPlayground::", "formData onChange", e); //TRACE
        }}
        name="VacancyQuestion"
        defaultModelValue={vq}
        beforeSave={beforeSave}
        // afterSave={afterSave}
      >
        <Fields />
      </ModelForm>
    </>
  );
};

const FormBody = props => {
  const { data: formData, state, handlers } = React.useContext(
    ModelFormContext
  );
  console.log("state", state, formData); //TRACE

  const confirm = Alerts.useConfirmAsync({
    content: "hello",
    title: "erjwierjwermwei"
  });

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

  const multipleRender = React.useCallback(({ file, url }) => {
    if (url) return <span>{url}</span>;
    else if (file) return <span>{file.name}</span>;
    return null;
  }, []);

  React.useEffect(() => {
    const afterSave = async () => {
      console.log(">>src/ModelFormPlayground::", "calling after save"); //TRACE
    };
    handlers.attachAfterSave(afterSave, 1);
    return () => {
      handlers.detachAfterSave(afterSave);
    };
  }, []);

  if (state.loading) return <div>loading...</div>;

  return (
    <div>
      id:{formData.id}
      <ModelFieldSelector
        name="Client"
        field="vacancyClientId"
        readOnly
        onLabelClick={e => {
          alert("hello");
        }}
        renderLabel={client => client.name}
        sorter={(a, b) => {
          if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
          if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
          return 0;
        }}
        queryOpts={{
          fetchPolicy: "network-only",
          limit: 100,
          dataFilter: {
            archived: {
              ne: true
            }
          }
        }}
      />
      <ModelControl required>
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
      </ModelControl>
      <ModelFieldDateTime field="startDate" />
      <ModelFieldDateTime
        field="startDate"
        dateOnly
        label="Start Date(date only)"
        pickerProps={{
          openTo: "year",
          format: "dd/MM/yyyy",
          views: ["year", "month", "date"]
        }}
      />
      {/* <ModelControl required>
        <ModelFieldDate
          field="startDate"
          label="Start Date(date only, strict)"
          pickerProps={{
            format: "dd/MM/yyyy",
            views: ["year", "month", "date"]
          }}
        />
      </ModelControl> */}
      <ModelControl required>
        <ModelFieldInput field="description" />
      </ModelControl>
      <ModelFieldInput field="description" />
      {/* <ModelFieldFile
        label="hello"
        buttonLabel="world"
        field="video"
        render={videoRender}
        storageOpts={{ provider: "DummyStorageProvider" }}
      /> */}
      <ModelFieldFile
        label="hello multiple"
        buttonLabel="world"
        field="video"
        multiple
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        render={multipleRender}
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
      <Button
        disabled={state.saving}
        color="primary"
        onClick={async () => {
          const ret = await confirm({
            content: ({ state, setState }) => {
              return (
                <span
                  onClick={() => {
                    setState("hehe");
                  }}
                >
                  hello{state}
                </span>
              );
            },
            title: "confirmation"
          });
          // throw ret;
          if (!ret) return;
          handlers.save();
        }}
      >
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
  const [state, setState] = React.useState({
    client: null
  });

  const handleClientSelectorChange = React.useCallback(item => {
    console.log(">>src/ModelFormPlayground::", "item", item); //TRACE
    setState(oldState => ({ ...oldState, client: item.id }));
  }, []);
  return (
    <div>
      <h2>Components</h2>
      <div>
        <ModelSelector
          name="Client"
          // readOnly={readOnly}
          // onLabelClick={onLabelClick}
          // disabled={disabled}
          // renderLabel={renderLabel}
          value={state.client}
          onChange={handleClientSelectorChange}
          label={"Test Client"}
          // placeholder={"Client Placeholder"}
          // queryOpts={queryOpts}
          // sorter={sorter}
          // filter={filter}
        />
      </div>
      <h2>Form</h2>
      <ModelForm
        name="Vacancy"
        // modelId={"4d8ec785-c737-4a7f-a4c3-bff330e38a29"}
        modelId={"52b7a079-bb7b-4ed2-ac69-464ea7c3b520"}
        // onSave={onSave}
        additionalFields={extraProps}
        onChange={e => {
          console.log(">>src/ModelFormPlayground::", "formData onChange", e); //TRACE
        }}
      >
        <FormBody {...props} />
      </ModelForm>
    </div>
  );
}
