import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

const API_BASE_URL = "http://localhost:9098/api/cp";

const CPForm = ({ profile, onSuccess, onCancel }) => {
  const isEdit = Boolean(profile);
  const { enqueueSnackbar } = useSnackbar();

  // Form field states (with initial values if in edit mode)
  const [owner, setOwner] = useState(profile?.owner || "");
  const [mobileNumber, setMobileNumber] = useState(profile?.mobileNumber || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [counterName, setCounterName] = useState(profile?.counterName || "");
  const [selectedImage, setSelectedImage] = useState(null);

  // Errors state for validations
  const [errors, setErrors] = useState({
    owner: "",
    mobile: "",
    email: "",
    counterName: "",
    image: ""
  });

  // Enhanced validation functions with trailing spaces check
  const validateName = (value) => {
    if (!value || value.trim() === "") return "This field is required";
    if (value !== value.trim()) return "Remove extra spaces";
    if (!/^[A-Za-z\s]+$/.test(value))
      return "Invalid name (only alphabets allowed)";
    return "";
  };

  const validateEmail = (value) => {
    if (!value || value.trim() === "") return "This field is required";
    if (value !== value.trim()) return "Remove extra spaces";
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value))
      return "Invalid E-mail (format: name@email.com)";
    return "";
  };

  const validateMobile = (value) => {
    if (!value || value.trim() === "") return "This field is required";
    if (value !== value.trim()) return "Remove extra spaces";
    if (!/^[6-9]\d{9}$/.test(value))
      return "Invalid mobile number (must start with 6-9 and be 10 digits)";
    return "";
  };

  const validateCounterName = (value) => {
    if (!value || value.trim() === "") return "This field is required";
    if (value !== value.trim()) return "Remove extra spaces";
    return "";
  };

  const validateImage = () => {
    if (!isEdit && !selectedImage) return "This field is required";
    return "";
  };

  // If the profile (in edit mode) changes, update state
  useEffect(() => {
    if (profile) {
      setOwner(profile.owner);
      setMobileNumber(profile.mobileNumber);
      setEmail(profile.email);
      setCounterName(profile.counterName);
    }
  }, [profile]);

  // Enhanced input handlers with immediate validation feedback
  const handleOwnerChange = (e) => {
    const value = e.target.value;
    // Only allow alphabets and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setOwner(value);
      setErrors(prev => ({ ...prev, owner: validateName(value) }));
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Only allow digits and enforce max length of 10
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      // Immediate validation for first digit
      if (value.length > 0 && !/^[6-9]/.test(value)) {
        setErrors(prev => ({ ...prev, mobile: "Must start with 6,7,8, or 9" }));
      } else {
        setErrors(prev => ({ ...prev, mobile: validateMobile(value) }));
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handleCounterNameChange = (e) => {
    const value = e.target.value;
    setCounterName(value);
    setErrors(prev => ({ ...prev, counterName: validateCounterName(value) }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setErrors(prev => ({ ...prev, image: "" }));
    }
  };

  // Enhanced form submission with comprehensive validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const validationResults = {
      owner: validateName(owner),
      mobile: validateMobile(mobileNumber),
      email: validateEmail(email),
      counterName: validateCounterName(counterName),
      image: validateImage()
    };

    setErrors(validationResults);

    // Check if any errors exist
    if (Object.values(validationResults).some(error => error !== "")) {
      enqueueSnackbar("Please fix all errors before submitting", { 
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      });
      return;
    }

    // Proceed with form submission
    const formData = new FormData();
    formData.append("owner", owner);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);
    formData.append("counterName", counterName);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      const endpoint = isEdit 
        ? `${API_BASE_URL}/update/${profile.id}`
        : `${API_BASE_URL}/save`;
      
      await axios({
        method: isEdit ? "put" : "post",
        url: endpoint,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });

      enqueueSnackbar(
        `Counter profile ${isEdit ? "updated" : "added"} successfully!`,
        { 
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" }
        }
      );
      onSuccess();
    } catch (error) {
      enqueueSnackbar("Submission failed. Please try again.", { 
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mb:2 }}>
<Typography
  variant="h4"
  align="center"
  gutterBottom
  style={{ padding: '15px', fontFamily: 'Arial, sans-serif',fontWeight:'bold', color:"DodgerBlue",}}
>
        {isEdit ? "Edit Counter Profile" :  "Create Counter Profile"}
        
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Owner Name"
            value={owner}
            onChange={handleOwnerChange}
            error={Boolean(errors.owner)}
            helperText={errors.owner}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Mobile Number"
            value={mobileNumber}
            onChange={handleMobileChange}
            error={Boolean(errors.mobile)}
            helperText={errors.mobile}
            inputProps={{ maxLength: 10 }}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Counter Name"
            value={counterName}
            onChange={handleCounterNameChange}
            error={Boolean(errors.counterName)}
            helperText={errors.counterName}
            required
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label">
            Choose File
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            variant="caption"
            display="block"
            mt={1}
            sx={{ color: errors.image ? "error.main" : "inherit" }}
          >
            {selectedImage ? `Selected: ${selectedImage.name}` : errors.image}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" sx={{ mr: 1 }} onClick={onCancel}>
            CANCEL
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? "UPDATE" : "Create"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CPForm;