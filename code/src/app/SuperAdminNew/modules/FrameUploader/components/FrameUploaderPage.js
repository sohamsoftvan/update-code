import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { CloudUpload, CheckCircle, Error } from "@mui/icons-material";

const FrameUploaderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid image file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('success');
      setSelectedFile(null);
      
      // Navigate back or to success page
      setTimeout(() => {
        navigate('/frame-uploader/success');
      }, 1500);
      
    } catch (err) {
      setUploadStatus('error');
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="frame-uploader-page">
      <Card>
        <CardHeader>
          <CardTitle>
            <Typography variant="h5" component="h2">
              Frame Uploader
            </Typography>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap={2}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {uploadStatus === 'success' && (
              <Alert severity="success" icon={<CheckCircle />}>
                Frame uploaded successfully!
              </Alert>
            )}

            {uploadStatus === 'error' && (
              <Alert severity="error" icon={<Error />}>
                Upload failed. Please try again.
              </Alert>
            )}

            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="frame-file-input"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="frame-file-input">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                >
                  Select Frame Image
                </Button>
              </label>
            </Box>

            {selectedFile && (
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Selected file: {selectedFile.name}
                </Typography>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
                />
              </Box>
            )}

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                startIcon={uploading ? <div className="spinner-border spinner-border-sm" /> : null}
              >
                {uploading ? 'Uploading...' : 'Upload Frame'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={uploading}
              >
                Back
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
};

export default FrameUploaderPage;
