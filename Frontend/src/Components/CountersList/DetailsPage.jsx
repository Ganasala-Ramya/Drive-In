import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DetailsPage = ({ profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get the profile from navigation state or fallback to the profiles prop
  const profileFromState = location.state?.profile;
  const profileFromProps =
    profiles && profiles.find((profile) => profile.id.toString() === id);
  const profile = profileFromState || profileFromProps;

  if (!profile) {
    return (
      <Box sx={{ padding: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Profile not found</Typography>
        <Typography variant="body1">
          Please return to the previous page or try again.
        </Typography>
      </Box>
    );
  }

  // Construct the image URL if available.
  const baseImageUrl = "http://localhost:9098/uploads/";
  const imageUrl = profile.imageUrl
    ? profile.imageUrl
    : profile.image
    ? `${baseImageUrl}${profile.image}`
    : null;

  return (
    <Box sx={{ padding: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      {/* Display image if available */}
      {imageUrl && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "4px",
            }}
          />
        </Box>
      )}

      <Typography variant="h4" component="h2" gutterBottom>
        {profile.counterName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Owner:</strong> {profile.owner}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Mobile:</strong> {profile.mobileNumber}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {profile.email}
      </Typography>
    </Box>
  );
};

export default DetailsPage;
