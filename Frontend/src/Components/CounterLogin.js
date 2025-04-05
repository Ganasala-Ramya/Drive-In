import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const CounterLogin = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (showOtpField && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, showOtpField]);

  const validateMobile = () => {
    if (!mobile) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(mobile)) return "Invalid mobile number (must start with 6-9 and be 10 digits)";
    return null;
  };

  const validateOtp = () => {
    if (!otp) return "OTP is required";
    if (!/^\d{4}$/.test(otp)) return "OTP must be 4 digits";
    return null;
  };

  const handleSendOtp = async () => {
    const mobileError = validateMobile();
    if (mobileError) {
      setErrors({ mobile: mobileError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      if (!data.registered) {
        throw new Error('Mobile number is not registered');
      }

      setShowOtpField(true);
      setCountdown(60);
      setResendDisabled(true);
      setErrors({});
    } catch (error) {
      setErrors({ mobile: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateOtp = async () => {
    const otpError = validateOtp();
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/validate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP validation failed');
      }

      if (!data.verified) {
        throw new Error('Incorrect OTP');
      }

      setIsLoggedIn(true);
      setShowModal(false);
      sessionStorage.setItem("login", "true");
      navigate("/counter-dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setErrors({ otp: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      sessionStorage.removeItem("login");
      setIsLoggedIn(false);
      setMobile('');
      setOtp('');
      setShowOtpField(false);
      navigate("/counterlogin");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleShow = () => setShowModal(true);

  return (
    <div className="container mt-5">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h5>Drive-In</h5>
        {!isLoggedIn ? (
          <Button variant="warning" className="px-5 me-3" onClick={handleShow}>
            Login
          </Button>
        ) : (
          <Button variant="danger" className="px-5 me-3" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Counter Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^\d]/g, ''))}
              disabled={showOtpField}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && <Alert variant="danger" className="mt-2">{errors.mobile}</Alert>}
          </Form.Group>

          {!showOtpField ? (
            <Button 
              variant="primary" 
              onClick={handleSendOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Sending...</span>
                </>
              ) : 'Send OTP'}
            </Button>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="Enter 4-digit OTP"
              />
              {errors.otp && <Alert variant="danger" className="mt-2">{errors.otp}</Alert>}
              <div className="d-flex gap-2 mt-3">
                <Button 
                  variant="primary" 
                  onClick={handleValidateOtp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Verifying...</span>
                    </>
                  ) : 'Verify OTP'}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setCountdown(60);
                    setResendDisabled(true);
                    handleSendOtp();
                  }}
                  disabled={resendDisabled || isLoading}
                >
                  {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                </Button>
              </div>
            </Form.Group>
          )}
        </Modal.Body>
      </Modal>
      
      <ImageCarousel/>
   {/* <Footer/> */}
    </div>
  );
};

export default CounterLogin;