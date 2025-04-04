import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const CPCard = ({ profile, onViewSettings }) => {
  const navigate = useNavigate();
  const baseImageUrl = "http://localhost:9098/uploads/";
  const imageUrl = profile.imageUrl
    ? profile.imageUrl
    : profile.image
    ? `${baseImageUrl}${profile.image}`
    : null;

  // Navigates to details page when the image is clicked.
  const handleImageClick = () => {
    navigate(`/admin/details/${profile.id}`, { state: { profile } });
  };

  // Clicking the settings icon opens the settings dialog.
  const handleSettingsIconClick = (event) => {
    event.stopPropagation();
    if (onViewSettings) onViewSettings(profile);
  };

  return (
    <Card sx={{ position: "relative", cursor: "pointer" }} onClick={handleImageClick}>
      {imageUrl ? (
        <CardMedia component="img" image={imageUrl} alt="Profile Image" height="200" />
      ) : (
        <Box sx={{ height: 200, backgroundColor: "gray" }} />
      )}
      <IconButton
        onClick={handleSettingsIconClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.27)",
            "& svg": { color: "white" },
          },
        }}
      >
        <SettingsIcon sx={{ color: "white" }} />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: "rgba(1, 1, 2, 0.67)",
          color: "white",
          px: 1,
          py: 0.5,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {profile.counterName}
        </Typography>
      </Box>
    </Card>
  );
};

export default CPCard;