import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CPForm from './CPForm';

const ProfileSettingsDialog = ({ profile, open, onClose, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEnterEditMode = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSuccess = () => {
    setEditMode(false);
    onUpdate();
    onClose();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this counter?");
    if (confirmDelete) {
      await onDelete(profile.id);
      onUpdate();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <h2 style={{ fontFamily: "Times New Roman" }}>
          <strong>Counter Settings</strong>
        </h2>
        {!editMode && (
          <IconButton
            aria-label="edit"
            onClick={handleEnterEditMode}
            color="primary"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2 }}>
        {editMode ? (
          <CPForm profile={profile} onSuccess={handleSuccess} onCancel={handleCancelEdit} />
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Owner Name:</strong> {profile.owner}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Counter Name:</strong> {profile.counterName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {profile.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Mobile Number:</strong> {profile.mobileNumber}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Counter Status:</strong> {profile.status}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>No. of Orders Today:</strong> 50
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Amount Received Today:</strong> {profile.amountToday}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {!editMode && (
          <IconButton onClick={handleDelete} color="primary">
            <DeleteIcon />
          </IconButton>
        )}
        <Button onClick={onClose} color="primary" variant="outlined">
          {editMode ? "Close" : "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileSettingsDialog;
