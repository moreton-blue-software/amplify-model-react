import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import UploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import nanoid from "nanoid";
const UploadButton = React.memo(
  ({
    hasSelectedFile,
    onChange: handleUpload,
    accept,
    multiple,
    url,
    labelText,
    ...rest
  }) => {
    console.log(">>UploadButton/index::", "multiple", accept); //TRACE
    const [id] = React.useState(`upload-button@${labelText}-${nanoid()}`);

    return (
      <div
        style={{
          // width: 640, height: 400,
          margin: "10px 0"
        }}
      >
        <input
          onChange={handleUpload}
          accept={accept}
          style={{ display: "none" }}
          id={id}
          multiple={multiple}
          type="file"
        />
        <label htmlFor={id}>
          <Button
            {...rest}
            component="span"
            style={{ marginBottom: 10 }}
            variant="outlined"
            size="small"
          >
            <UploadIcon
              fontSize="small"
              style={{ marginRight: 10, marginBottom: -5 }}
            />
            {hasSelectedFile ? "Change" : "Upload"} {labelText || "file"}
          </Button>
          {/* )} */}
        </label>
        {hasSelectedFile && (
          <Button
            variant="outlined"
            size="small"
            component="span"
            onClick={() => handleUpload(null)}
            style={{ marginBottom: 10, marginLeft: 5 }}
          >
            ✖ Remove{multiple ? " All" : ""}
          </Button>
        )}
      </div>
    );
  }
);

UploadButton.defaultProps = {
  multiple: false
};

UploadButton.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File),
  url: PropTypes.string
};

export default UploadButton;
