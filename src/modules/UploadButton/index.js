import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

const UploadButton = React.memo(
  ({ hasSelectedFile, onChange: handleUpload, accept, multiple, url, ...rest }) => {
    return (
      <div
        style={{
          // width: 640, height: 400,
          margin: '10px 0',
        }}
      >
        <input
          onChange={handleUpload}
          accept={accept}
          style={{ display: 'none' }}
          id="contained-upload-button"
          multiple={multiple}
          type="file"
        />
        <label htmlFor="contained-upload-button">
          {/* {!file && !url && (
            <Card
              style={{
                height: 360,
                display: 'grid',
                cursor: 'pointer',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              {...rest}
              component="span"
            >
              <Typography variant="body1">
                <UploadIcon
                  fontSize="small"
                  style={{ marginRight: 10, marginBottom: -5 }}
                />
                Upload video
              </Typography>
            </Card>
          )}
          {(url || file) && ( */}
          <Button
            {...rest}
            component="span"
            style={{ marginBottom: 10 }}
            variant="contained"
          >
            <Typography variant="body1">
              <UploadIcon
                fontSize="small"
                style={{ marginRight: 10, marginBottom: -5 }}
              />
              {hasSelectedFile ? 'Change' : 'Upload'} file
            </Typography>
          </Button>
          {/* )} */}
        </label>
      </div>
    );
  },
);

UploadButton.defaultProps = {
  multiple: false,
};

UploadButton.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File),
  url: PropTypes.string,
};

export default UploadButton;
