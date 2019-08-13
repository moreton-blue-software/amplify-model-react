import React from "react";
import ModelForm, { ModelFormContext } from "../ModelForm";
import { useSnackbar } from "notistack";
import Promise from "bluebird";
import capitalize from "lodash/capitalize";
import UploadButton from "../UploadButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Storage } from "aws-amplify";
import setFp from "lodash/fp/set";
import set from "lodash/set";
import get from "lodash/get";

// const Renderer = React.memo(props=>{
//   const renderObj =
//   return
// });

function ProgressDisplay({ onDone, onError, filepath, storageOpts, file }) {
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    let um = false;
    Storage.put(filepath, file, {
      progressCallback(progress) {
        if (um) return;
        const progressPercentage = (progress.loaded / progress.total) * 100;
        setState(Math.floor(progressPercentage));
      },
      ...storageOpts
    })
      .then(storeData => {
        onDone(storeData);
      })
      .catch(e => {
        onError(e);
      });
    return () => (um = true);
  }, []);
  return <span>Uploading attachments.. {state}%</span>;
}

const useUploaderStyles = makeStyles({
  multipleDisplay: {
    "& > div": {
      minHeight: 30,
      padding: 10
    }
  }
});

const Uploader = props => {
  const {
    accept = "video/*",
    label,
    multiple,
    field,
    render,
    storageOpts,
    defaultModelValue,
    beforeFileUpload
  } = props;
  const [fileData, setFileData] = React.useState({
    url: null,
    file: undefined
  });
  const classes = useUploaderStyles();
  const [fileListData, setFileListData] = React.useState([]);

  const { data, state, handlers } = React.useContext(ModelFormContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    console.log("1234: before re-attching..");

    const beforeSave = async ({
      context: { data: contextData },
      parent: { data: parentData }
    }) => {
      // console.log("1234: before saving delay", contextData, parentData);
      async function uploadFile(rawFile) {
        const filepath = `${parentData.id}/${rawFile.name}`;
        let uploadSnackbar;
        let file = rawFile;

        if (beforeFileUpload) {
          const newFile = await beforeFileUpload(rawFile);
          if (newFile) {
            file = newFile;
          }
        }

        const storeDataPromise = new Promise(function(resolve, reject) {
          uploadSnackbar = enqueueSnackbar(
            // `Uploading attachments.. ${progressPercentage}%`,
            <ProgressDisplay
              {...{ file, filepath, storageOpts }}
              onDone={resolve}
              onError={reject}
            />,
            {
              variant: "info",
              persist: true
            }
          );
        });
        const storeData = await storeDataPromise;
        closeSnackbar(uploadSnackbar);
        return storeData;
      }
      const { file } = fileData;
      let retFields = {};
      if (field) {
        const fieldRoot = field.split(".")[0];
        try {
          if (!parentData.id) {
            console.log("1234: no parent data id found!.");
            return {};
          }
          await Promise.delay(500);
          if (fileListData && fileListData.length > 0) {
            const filesUpls = await Promise.map(
              fileListData,
              fileData => {
                if (fileData.file) return uploadFile(fileData.file);

                // return {fileData.u}
              },
              { concurrency: 4 }
            );
            console.log(">>ModelFieldFile/index::", "filesUpls", filesUpls); //TRACE
          } else {
            retFields = { [fieldRoot]: parentData[fieldRoot] };
            if (file) {
              const storeData = await uploadFile(file);
              console.log(
                ">>ModelFieldFile/index::" + field,
                "xxretFields",
                retFields
              ); //TRACE

              set(retFields, field, {
                filename: storeData.key
              });
            } else if (file === null) {
              set(retFields, field, null);
            }
          }

          //omit all fields except file field and id
          Object.keys(retFields).forEach(k => {
            if (fieldRoot !== k) {
              retFields[k] = undefined;
            } else {
              if (!!get(retFields, [k, "length"])) {
                // an array
                retFields[k].forEach(retFieldItem => {
                  if (retFieldItem) retFieldItem["__typename"] = undefined;
                });
              } else if (!!retFields[k]) {
                // an object
                retFields[k]["__typename"] = undefined;
              }
            }
          });
          retFields.id = parentData.id;
        } catch (e) {
          enqueueSnackbar("Something went wrong with saving video", {
            variant: "error"
          });
          console.log("1234: SOMETHING WENT WRONG UPLOAD AND INSERT ", e);
          return false;
        } finally {
          console.log("1234: before saving delay done");
          // console.log(">>ModelFieldFile/index::", "retFields", retFields); //TRACE
          // closeSnackbar(uploadSnackbar);
          // throw Error(JSON.stringify(retFields));
          console.log(
            ">>ModelFieldFile/index::" + field,
            "retFields",
            retFields
          ); //TRACE
          return retFields;
        }
      }
      return false;
    };
    handlers.attachBeforeSave(beforeSave, 1);
    return () => {
      handlers.detachBeforeSave(beforeSave);
    };
  }, [fileData.file, field, fileListData]);

  React.useEffect(() => {
    let hasCancelled = false;
    const url = handlers.getFieldValue(field);
    console.log(">>ModelFieldFile/index::", "url", url); //TRACE
    const filename = get(url, "filename");
    if (filename) {
      Storage.get(filename, { ...storageOpts })
        .then(result => {
          // console.log(">>ModelFieldFile/index::", "result", result); //TRACE
          if (!hasCancelled) setFileData(setFp("url", result));
        })
        .catch(err => console.error(err));
    }
    return () => {
      hasCancelled = true;
    };
  }, [field]);

  const hasSelectedFile = fileData.file || fileData.url;

  const renderFn = React.useMemo(() => {
    return render && render({ file: fileData.file, url: fileData.url });
  }, [fileData, render]);
  console.log(">>ModelFieldFile/index::", "fileData", fileListData); //TRACE
  return (
    <React.Fragment>
      <UploadButton
        labelText={label}
        multiple={multiple}
        onChange={e => {
          const fileList = get(e, "target.files", []);
          if (multiple) {
            setFileListData(oldFileListData => [
              ...oldFileListData,
              ...[...fileList].map(f => ({ file: f }))
            ]);
          } else {
            setFileData(oldFileData => ({
              ...oldFileData,
              file: fileList[0] || null,
              url: null
            }));
          }
        }}
        accept={accept}
        hasSelectedFile={hasSelectedFile}
        // file={fileData.get('file')}
        // url={fileData.get('url')}
      />
      {hasSelectedFile && !multiple && renderFn}
      {multiple && (
        <div className={classes.multipleDisplay}>
          {fileListData.map((fileData, ii) => {
            return (
              <Paper key={ii}>
                {render({ file: fileData.file, url: fileData.url })}
                <Button
                  size="small"
                  style={{ float: "right" }}
                  onClick={() => {
                    setFileListData(oldFileListData => {
                      return oldFileListData.filter((v, indx) => indx !== ii);
                    });
                  }}
                >
                  Remove
                </Button>
              </Paper>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default function ModelFieldFile(props) {
  const {
    field,
    accept,
    render,
    label = "File",
    buttonLabel,
    multiple,
    storageOpts = {},
    beforeFileUpload
  } = props;
  const { name, data: modelData, handlers } = React.useContext(
    ModelFormContext
  );
  // const [state, setState] = React.useState(Map({ defaultValue: null }));
  const defaultValue = React.useMemo(() => {
    // const m = { id: modelData.id };
    // set(m, field, get(modelData, field));
    return modelData;
  }, [modelData]);
  console.log(">>ModelFieldFile/index::" + field, "defaultValue", defaultValue); //TRACE
  return (
    <ModelForm
      // key={modelData.id} //added this so it reloads the form with the default value
      name={name}
      defaultModelValue={defaultValue}
    >
      <div style={{ marginTop: 15 }}>
        <label>{label}</label>
        <Uploader
          label={buttonLabel || label}
          accept={accept}
          field={field}
          render={render}
          multiple={multiple}
          storageOpts={storageOpts}
          beforeFileUpload={beforeFileUpload}
          defaultModelValue={defaultValue}
        />
      </div>
    </ModelForm>
  );
}
