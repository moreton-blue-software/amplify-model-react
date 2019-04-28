import React from "react";
import ModelForm, { ModelFormContext } from "../ModelForm";
import { useSnackbar } from "notistack";
import Promise from "bluebird";
import capitalize from "lodash/capitalize";
import { Map, List } from "immutable";
import UploadButton from "../UploadButton";
import { Storage } from "aws-amplify";
import get from "lodash/get";

// const Renderer = React.memo(props=>{
//   const renderObj =
//   return
// });

const Uploader = props => {
  const { accept = "video/*", field, render, storageOpts } = props;
  const [fileData, setFileData] = React.useState(
    Map({ url: null, file: null })
  );

  const { data, state, handlers } = React.useContext(ModelFormContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    console.log("1234: before re-attching..");

    const beforeSave = async ({
      context: { data: contextData },
      parent: { data: parentData }
    }) => {
      console.log("1234: before saving delay", parentData);
      const file = fileData.get("file");
      let retFields = {};
      let uploadSnackbar;
      if (file && field) {
        await Promise.delay(2000);
        try {
          if (!parentData.id) {
            console.log("1234: no parent data id found!.");
            return {};
          }
          const filepath = `${parentData.id}/${file.name}`;
          uploadSnackbar = enqueueSnackbar("Uploading attachments..", {
            variant: "info",
            persist: true
          });
          const storeData = await Storage.put(filepath, file, {
            ...storageOpts
          });
          enqueueSnackbar("Attchments saved.", { variant: "success" });
          //omit all fields except file field and id
          const { id, ...rest } = contextData;
          Object.keys(rest).forEach(k => {
            retFields[k] = undefined;
          });
          retFields.id = id;
          retFields[field] = { filename: storeData.key };
        } catch (e) {
          enqueueSnackbar("Something went wrong with saving video", {
            variant: "error"
          });
          console.log("1234: SOMETHING WENT WRONG UPLOAD AND INSERT ", e);
          return false;
        } finally {
          console.log("1234: before saving delay done");
          console.log(">>ModelFieldFile/index::", "retFields", retFields); //TRACE
          closeSnackbar(uploadSnackbar);
          return retFields;
        }
      }
      return false;
    };
    handlers.attachBeforeSave(beforeSave, 1);
    return () => {
      handlers.detachBeforeSave(beforeSave);
    };
  }, [fileData.get("file"), field]);

  React.useEffect(() => {
    let hasCancelled = false;
    const url = handlers.getFieldValue(field);
    console.log(">>ModelFieldFile/index::", "url", url); //TRACE
    const filename = get(url, "filename");
    if (filename) {
      Storage.get(filename, { ...storageOpts })
        .then(result => {
          console.log(">>ModelFieldFile/index::", "result", result); //TRACE
          if (!hasCancelled)
            setFileData(oldFileData => oldFileData.merge({ url: result }));
        })
        .catch(err => console.error(err));
    }
    return () => {
      hasCancelled = true;
    };
  }, [field]);

  const hasSelectedFile = fileData.get("file") || fileData.get("url");

  const renderFn = React.useMemo(() => {
    return (
      render && render({ file: fileData.get("file"), url: fileData.get("url") })
    );
  }, [fileData, render]);
  return (
    <React.Fragment>
      <UploadButton
        onChange={e => {
          console.log(e.target.files[0]);
          const file = e.target.files[0];
          console.log(">>ModelFieldFile/index::", "file", file); //TRACE
          setFileData(oldFileData => oldFileData.merge({ file, url: null }));
        }}
        accept={accept}
        hasSelectedFile={hasSelectedFile}
        // file={fileData.get('file')}
        // url={fileData.get('url')}
      />
      {hasSelectedFile && renderFn}
    </React.Fragment>
  );
};

export default function ModelFieldFile(props) {
  const { field, accept, render, label = "File", storageOpts = {} } = props;
  const { name, data: modelData, handlers } = React.useContext(
    ModelFormContext
  );
  // const [state, setState] = React.useState(Map({ defaultValue: null }));

  const defaultValue = React.useMemo(() => {
    return { [field]: modelData[field], id: modelData.id };
  }, [modelData]);

  return (
    <ModelForm
      key={modelData.id} //added this so it reloads the form with the default value
      name={name}
      defaultModelValue={defaultValue}
    >
      <div style={{ marginTop: 15 }}>
        <label>{label}</label>
        <Uploader
          accept={accept}
          field={field}
          render={render}
          storageOpts={storageOpts}
        />
      </div>
    </ModelForm>
  );
}
