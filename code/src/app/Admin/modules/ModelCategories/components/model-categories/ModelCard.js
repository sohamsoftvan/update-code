import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Button, Typography, Box, Chip, IconButton } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ModelCard = ({ model, onEdit, onDelete, onView }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      await onEdit(model);
      navigate(`/admin/model-categories/edit/${model.id}`);
    } catch (error) {
      console.error("Edit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this model?")) {
      setLoading(true);
      try {
        await onDelete(model.id);
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = () => {
    navigate(`/admin/model-categories/view/${model.id}`);
  };

  return (
    <Card className="model-card">
      <CardHeader>
        <CardTitle>
          <Typography variant="h6" component="h3">
            {model.name}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2" color="textSecondary">
            {model.description}
          </Typography>
          
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip 
              label={model.category} 
              color="primary" 
              size="small" 
            />
            <Chip 
              label={model.status} 
              color={model.status === 'active' ? 'secondary' : 'default'} 
              size="small" 
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="textSecondary">
              Created: {new Date(model.created_at).toLocaleDateString()}
            </Typography>
            
            <Box display="flex" gap={1}>
              <IconButton
                size="small"
                onClick={handleView}
                disabled={loading}
                color="primary"
              >
                <Visibility />
              </IconButton>
              
              <IconButton
                size="small"
                onClick={handleEdit}
                disabled={loading}
                color="primary"
              >
                <Edit />
              </IconButton>
              
              <IconButton
                size="small"
                onClick={handleDelete}
                disabled={loading}
                color="secondary"
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ModelCard;
