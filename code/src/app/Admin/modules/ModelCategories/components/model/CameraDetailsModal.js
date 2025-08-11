import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CameraDetailsModal = ({ isOpen, toggle, camera, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await onSave(camera);
      toggle();
      // Navigate to camera management page
      navigate("/admin/cameras");
    } catch (err) {
      setError(err.message || "Failed to save camera details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toggle();
    onCancel && onCancel();
  };

  const handleViewCamera = () => {
    navigate(`/admin/cameras/view/${camera.id}`);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        <Typography variant="h6">
          Camera Details
        </Typography>
      </ModalHeader>
      
      <ModalBody>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {camera && (
            <>
              <Box>
                <Typography variant="subtitle1" color="primary">
                  Camera Information
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {camera.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {camera.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {camera.status}
                </Typography>
                <Typography variant="body2">
                  <strong>IP Address:</strong> {camera.ip_address}
                </Typography>
                <Typography variant="body2">
                  <strong>Port:</strong> {camera.port}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color="primary">
                  Model Configuration
                </Typography>
                <Typography variant="body2">
                  <strong>Model:</strong> {camera.model?.name || 'Not assigned'}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {camera.model?.category || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {camera.model?.description || 'No description'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color="primary">
                  Connection Details
                </Typography>
                <Typography variant="body2">
                  <strong>Protocol:</strong> {camera.protocol || 'RTSP'}
                </Typography>
                <Typography variant="body2">
                  <strong>Username:</strong> {camera.username || 'Not set'}
                </Typography>
                <Typography variant="body2">
                  <strong>Last Connected:</strong> {camera.last_connected ? new Date(camera.last_connected).toLocaleString() : 'Never'}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </ModalBody>
      
      <ModalFooter>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            onClick={handleViewCamera}
            disabled={loading}
          >
            View Camera
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default CameraDetailsModal;
