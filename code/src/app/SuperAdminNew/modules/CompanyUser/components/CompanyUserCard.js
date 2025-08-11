import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Button, Typography, Box, Chip, IconButton, Avatar } from "@mui/material";
import { Edit, Delete, Visibility, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CompanyUserCard = ({ user, onEdit, onDelete, onView }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      await onEdit(user);
      navigate(`/company/company-user/edit/${user.id}`);
    } catch (error) {
      console.error("Edit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      try {
        await onDelete(user.id);
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = () => {
    navigate(`/company/company-user/view/${user.id}`);
  };

  return (
    <Card className="company-user-card">
      <CardHeader>
        <CardTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>
              <Person />
            </Avatar>
            <Typography variant="h6" component="h3">
              {user.firstname} {user.lastname}
            </Typography>
          </Box>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2" color="textSecondary">
            <strong>Email:</strong> {user.email}
          </Typography>
          
          <Typography variant="body2" color="textSecondary">
            <strong>Role:</strong> {user.role}
          </Typography>
          
          <Typography variant="body2" color="textSecondary">
            <strong>Company:</strong> {user.company?.name || 'N/A'}
          </Typography>
          
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip 
              label={user.status} 
              color={user.status === 'active' ? 'secondary' : 'default'} 
              size="small" 
            />
            <Chip 
              label={user.role} 
              color="primary" 
              size="small" 
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="textSecondary">
              Created: {new Date(user.created_at).toLocaleDateString()}
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

export default CompanyUserCard;
