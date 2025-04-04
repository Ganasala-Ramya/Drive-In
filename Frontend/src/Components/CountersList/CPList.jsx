import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Button, Dialog } from "@mui/material";
import axios from "axios";
import CPCard from "./CPCard";
import ProfileSettingsDialog from "./ProfileSettingsDialog";
import CPForm from "./CPForm";

const API_BASE_URL = "http://localhost:9098/api/cp";

const CPList = () => {
  const [profiles, setProfiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // For adding a new counter.
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleOpenDialog = (profile = null) => {
    setSelectedProfile(profile);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProfile(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  // Handler for viewing settings from a card.
  const handleViewSettings = (profile) => {
    setSelectedProfile(profile);
    setSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false);
    setSelectedProfile(null);
  };

  const onSuccess = () => {
    fetchProfiles();
    handleCloseDialog();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: "DodgerBlue" }} style={{fontFamily:"Times New Roman"}}>
          <strong>List of counter profiles:</strong>
        </Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add Counter
        </Button>
      </Box>

      <Grid container spacing={3}>
        {profiles.map((profile) => (
          <Grid item xs={12} sm={8} md={4} key={profile.id}>
            <CPCard profile={profile} onViewSettings={handleViewSettings} />
          </Grid>
        ))}
        {profiles.length === 0 && (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 2 }} >
            No counter profiles available.
          </Typography>
        )}
      </Grid>

      {/* Dialog for adding or updating a counter */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: "15px",
            p: 0,
            width: "500px",
          }
        }}
      >
        <CPForm profile={selectedProfile} onSuccess={onSuccess} onCancel={handleCloseDialog} />
      </Dialog>

      {/* Profile Settings Dialog for viewing/editing settings, including deletion */}
      {selectedProfile && (
        <ProfileSettingsDialog
          profile={selectedProfile}
          open={settingsDialogOpen}
          onClose={handleCloseSettingsDialog}
          onUpdate={fetchProfiles}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default CPList;
