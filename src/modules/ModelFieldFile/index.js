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
import set from "lodash/fp/set";
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
    storageOpts
  } = props;
  const [fileData, setFileData] = React.useState({
    url: null,
    file: null
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
      async function uploadFile(file) {
        const filepath = `${parentData.id}/${file.name}`;
        let uploadSnackbar;
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
        try {
          if (!parentData.id) {
            console.log("1234: no parent data id found!.");
            return {};
          }
          await Promise.delay(1000);
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
          } else if (file) {
            const storeData = await uploadFile(file);
            enqueueSnackbar("Attchments saved.", { variant: "success" });
            retFields[field] = { filename: storeData.key };
          } else {
            retFields[field] = null;
          }

          //omit all fields except file field and id
          const { ...rest } = contextData;
          Object.keys(rest).forEach(k => {
            retFields[k] = undefined;
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
          if (!hasCancelled) setFileData(set("url", result));
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
    storageOpts = {}
  } = props;
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
          label={buttonLabel || label}
          accept={accept}
          field={field}
          render={render}
          multiple={multiple}
          storageOpts={storageOpts}
        />
      </div>
    </ModelForm>
  );
}
