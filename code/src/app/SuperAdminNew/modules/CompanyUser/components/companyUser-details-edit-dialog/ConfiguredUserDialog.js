import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Typography, Box, Alert, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfiguredUserDialog = ({ isOpen, toggle, user, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    role: user?.role || "",
    permissions: user?.permissions || [],
    status: user?.status || "active"
  });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await onSave({ ...user, ...formData });
      toggle();
      // Navigate back to user management
      navigate("/company/company-user");
    } catch (err) {
      setError(err.message || "Failed to configure user");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toggle();
    onCancel && onCancel();
  };

  const handlePermissionChange = (permission) => {
    const currentPermissions = formData.permissions;
    const newPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission];
    
    setFormData({ ...formData, permissions: newPermissions });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        <Typography variant="h6">
          Configure User: {user?.firstname} {user?.lastname}
        </Typography>
      </ModalHeader>
      
      <ModalBody>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Box>
            <Typography variant="subtitle1" color="primary">
              User Information
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {user?.firstname} {user?.lastname}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body2">
              <strong>Company:</strong> {user?.company?.name || 'N/A'}
            </Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle1" color="primary">
              Permissions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {[
                "view_dashboard",
                "manage_users", 
                "manage_cameras",
                "view_reports",
                "manage_models",
                "configure_system"
              ].map((permission) => (
                <Box key={permission} display="flex" alignItems="center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                  <label htmlFor={permission} style={{ marginLeft: '8px' }}>
                    {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ModalBody>
      
      <ModalFooter>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Configuration"}
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

export default ConfiguredUserDialog;
