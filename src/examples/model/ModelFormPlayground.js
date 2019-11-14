/* eslint-disable react/no-multi-comp */
/* eslint-disable no-console */
import React from 'react';
import ModelForm, { ModelFormContext } from 'modules/ModelForm';
import Button from '@material-ui/core/Button';
import ModelFieldInput from 'modules/ModelFieldInput';
import ModelFieldSelector from 'modules/ModelFieldSelector';
import ModelFieldTextSelector from 'modules/ModelFieldTextSelector';
import ModelFieldDateTime from 'modules/ModelFieldDateTime';
import ModelFieldDate from 'modules/ModelFieldDate';
import ModelFieldFile from 'modules/ModelFieldFile';
import ModelSelector from 'modules/ModelSelector';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import range from 'lodash/range';
import Promise from 'bluebird';
import { Alerts, ModelFieldControl as ModelControl } from 'modules';
import { useParams, useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { TracerContext } from 'App';

const Fields = props => {
  const { data } = React.useContext(ModelFormContext);
  console.log('>>src/ModelFormPlayground::', 'model', data); //TRACE
  return (
    <>
      {/* <ModelControl required>
        <ModelFieldInput field="description" />
      </ModelControl> */}
      <ModelFieldSelector
        name="Question"
        field="vacancyQuestionQuestionId"
        label={'Question ..'}
        renderLabel={q => q.text}
      />
    </>
  );
};
const VacancyQuestion = props => {
  const { vq, index, parentRef, onDelete } = props;

  const beforeSave = React.useCallback(async ({ context, parent }) => {
    console.log('saving formData,parentContext', context, parent); //TRACE
    return { vacancyQuestionVacancyId: parent.data.id, archived: true };
  }, []);
  console.log('>>src/ModelFormPlayground::', 'vq', vq); //TRACE
  return (
    <>
      <ModelForm
        key={index}
        onChange={e => {
          console.log('>>src/ModelFormPlayground::', 'formData onChange', e); //TRACE
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

function NestedForm() {
  return (
    <ModelForm name="Client" readOnly>
      <ModelControl required>
        <ModelFieldInput field="name" />
      </ModelControl>
    </ModelForm>
  );
}

const FormBody = props => {
  const self = React.useRef({ renders: 0 });
  const { setTrace } = React.useContext(TracerContext);
  const { data: formData, state, handlers } = React.useContext(ModelFormContext);
  console.log('state', state, formData); //TRACE

  React.useEffect(() => {
    setTrace('renders', ++self.current.renders);
  });

  React.useEffect(() => {}, []);
  const confirm = Alerts.useConfirmAsync({
    content: 'hello',
    title: 'erjwierjwermwei'
  });

  React.useEffect(() => {
    Promise.delay(3000).then(() => {
      const ctxs = handlers.getChildContexts();
      console.log('>>src/ModelFormPlayground::', 'ctxs', ctxs); //TRACE
    });
  }, [formData, handlers]);

  const videoRender = React.useCallback(
    ({ file, url, metadata }) => {
      setTrace('videoRenderUrl', url);
      return (
        <>
          {file && <ReactPlayer controls url={URL.createObjectURL(file)} />}
          {url && !file && <ReactPlayer controls url={url} />}
          <div>{JSON.stringify(metadata || {})}</div>
        </>
      );
    },
    [setTrace]
  );

  const multipleRender = React.useCallback(({ file, url }) => {
    if (url) return <span>{url}</span>;
    else if (file) return <span>{file.name}</span>;
    return null;
  }, []);

  React.useEffect(() => {
    const afterSave = async () => {
      console.log('>>src/ModelFormPlayground::', 'calling after save'); //TRACE
    };
    handlers.attachAfterSave(afterSave, 1);
    return () => {
      handlers.detachAfterSave(afterSave);
    };
  }, [handlers]);

  if (state.loading) return <div>loading...</div>;

  return (
    <div>
      id:{formData.id}
      {/* <ModelFieldSelector
        name="Client"
        field="vacancyClientId"
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
      /> */}
      <ModelFieldDateTime field="startDate" />
      <ModelFieldDateTime
        field="startDate"
        dateOnly
        label="Start Date(date only)"
        pickerProps={{
          openTo: 'year',
          format: 'dd/MM/yyyy',
          views: ['year', 'month', 'date']
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
      <ModelControl required requiredLabel="*">
        <ModelFieldInput field="position" />
      </ModelControl>
      <ModelControl required requiredLabel="*">
        <ModelFieldTextSelector
          field="programDES"
          options={[
            { value: 'DMS', label: 'DMS' },
            { value: 'ESS', label: 'ESS' }
          ]}
        />
      </ModelControl>
      <ModelFieldInput field="description" />
      <ModelFieldFile
        label="hello"
        buttonLabel="world"
        field="video"
        render={videoRender}
        beforeFileUpload={file => {
          console.log('>>src/ModelFormPlayground::', 'file', file); //TRACE
          return {
            metadata: {
              uploader: 'me',
              uploadDate: new Date()
            }
          };
        }}
        storageOpts={{ provider: 'DummyStorageProvider' }}
      />
      {/* <ModelFieldFile
        label="Videos"
        buttonLabel="world"
        field="agreements.0"
        render={videoRender}
        beforeFileUpload={file => {
          console.log(">>src/ModelFormPlayground::", "file", file); //TRACE
        }}
        storageOpts={{ provider: "DummyStorageProvider" }}
      />
      <ModelFieldFile
        label="Videos"
        buttonLabel="world"
        field="agreements.1"
        render={videoRender}
        beforeFileUpload={file => {
          console.log(">>src/ModelFormPlayground::", "file", file); //TRACE
        }}
        storageOpts={{ provider: "DummyStorageProvider" }}
      /> */}
      {/* <ModelFieldFile
        label="hello multiple"
        buttonLabel="world"
        field="video"
        multiple
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        render={multipleRender}
        storageOpts={{ provider: "DummyStorageProvider" }}
      /> */}
      <ModelFieldTextSelector
        field="award"
        placeholder="Change to Pathway Outcome"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' }
        ]}
      />
      <NestedForm />
      {/* {range(1).map(i => {
        return (
          <VacancyQuestion key={i} vq={get(formData, "questions.items.0")} />
        );
      })} */}
      <Button
        disabled={state.saving}
        color="primary"
        onClick={async () => {
          const ret = await confirm({
            content: ({ state, setState }) => {
              return (
                <span
                  onClick={() => {
                    setState('hehe');
                  }}>
                  hello{state}
                </span>
              );
            },
            title: 'confirmation'
          });
          // throw ret;
          if (!ret) return;
          handlers.save();
        }}>
        {state.editMode ? 'Update' : 'Create'}
      </Button>
      <Button disabled={state.saving}>Cancel</Button>
    </div>
  );
};

const extraProps = `
  video {
    filename
    uploader
    uploadDate
  }
  agreements {
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

  const { testType } = useParams();
  const location = useLocation();
  const { setTrace } = React.useContext(TracerContext);

  console.log('>>src/ModelFormPlayground::', 'params', location); //TRACE
  const handleClientSelectorChange = React.useCallback(item => {
    console.log('>>src/ModelFormPlayground::', 'item', item); //TRACE
    setState(oldState => ({ ...oldState, client: item.id }));
  }, []);

  const handleOnSave = React.useCallback(savedId => {
    setTrace('savedId', savedId);
  }, []);

  const modelFormProps = {};
  switch (testType) {
    case 'load-model-from-id': {
      var searchParams2 = new URLSearchParams(location.search);
      modelFormProps.modelId = searchParams2.get('id'); // true
      break;
    }
  }

  return (
    <div>
      <h2>Components</h2>
      <h2>Form</h2>
      <ModelForm
        name="Vacancy"
        fetchPolicy="network-only"
        additionalFields={extraProps}
        onSave={handleOnSave}
        onChange={e => {
          console.log('>>src/ModelFormPlayground::', 'formData onChange', e); //TRACE
        }}
        {...modelFormProps}>
        <FormBody {...props} />
      </ModelForm>
    </div>
  );
}
