import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert, Card, Spinner, Image } from 'react-bootstrap';

const CounterSetting = () => {
  const [profile, setProfile] = useState({
    ownerName: '',
    counterName: '',
    email: '',
    mobile: '',
    status: 'Active',
    dailyOrders: 0,
    dailyAmount: 0,
    profileImage: null
  });
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [showEditModal, setShowEditModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/counter/profile');
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setEditProfile(data);
        if (data.profileImageUrl) {
          setImagePreview(data.profileImageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfile(prev => ({
        ...prev,
        profileImage: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!editProfile.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    } else if (!/^[a-zA-Z ]+$/.test(editProfile.ownerName)) {
      newErrors.ownerName = 'Invalid name (only alphabets allowed)';
    }
    
    if (!editProfile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editProfile.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!editProfile.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(editProfile.mobile)) {
      newErrors.mobile = 'Invalid mobile number (must start with 6-9 and be 10 digits)';
    }
    
    if (!editProfile.counterName.trim()) {
      newErrors.counterName = 'Counter name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('ownerName', editProfile.ownerName);
      formData.append('counterName', editProfile.counterName);
      formData.append('email', editProfile.email);
      formData.append('mobile', editProfile.mobile);
      if (editProfile.profileImage) {
        formData.append('profileImage', editProfile.profileImage);
      }

      const response = await fetch('/api/counter/profile', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Counter Settings</h2>
      
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <Image 
                  src={imagePreview || '/default-profile.png'} 
                  roundedCircle 
                  width={100} 
                  height={100} 
                  className="border"
                />
              </div>
              <Button 
                variant="primary" 
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </Button>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p><strong>Owner Name:</strong> {profile.ownerName}</p>
                <p><strong>Counter Name:</strong> {profile.counterName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Mobile:</strong> {profile.mobile}</p>
                <p><strong>Status:</strong> {profile.status}</p>
                <p><strong>Today's Orders:</strong> {profile.dailyOrders}</p>
                <p><strong>Amount Received:</strong> ₹{profile.dailyAmount.toFixed(2)}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Counter Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {errors.form && <Alert variant="danger">{errors.form}</Alert>}
            
            <div className="d-flex mb-4">
              <div className="me-4">
                <Image 
                  src={imagePreview || '/default-profile.png'} 
                  roundedCircle 
                  width={120} 
                  height={120} 
                  className="border"
                />
              </div>
              <div className="align-self-center">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={editProfile.ownerName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.ownerName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Counter Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="counterName"
                    value={editProfile.counterName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.counterName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.counterName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={editProfile.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleInputChange({
                        target: {
                          name: 'mobile',
                          value: value
                        }
                      });
                    }}
                    maxLength={10}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" /> Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CounterSetting;