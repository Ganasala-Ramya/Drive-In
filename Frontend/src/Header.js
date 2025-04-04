import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [logindetails, setLogindetails] = useState({
    username: "",
    password: "",
  });
  const [adminlogin, setAdminlogin] = useState(0);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9098/api/cp/login", logindetails).then((response) => {
      setAdminlogin(response.status);
      console.log(response.status);
      if (response.status === 200) {
        console.log("Welcome to Drive-in, login successful");
        handleClose();
        navigate("/admin");
        sessionStorage.setItem("login", "200");
      } else {
        console.log("Login not successful");
        window.alert("Invalid details, please check it");
      }
    });
  };

  useEffect(() => {
    const sessionLogin = sessionStorage.getItem("login");
    if (sessionLogin !== "200" || !sessionLogin) {
      logout();
    } else {
      setAdminlogin(200);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("login");
    setAdminlogin(0);
    navigate("/");
    console.log("Logged out successfully");
  };

  return (
    <div className="">
      <div className="header">
        <h5  >Drive-In</h5>
        {adminlogin === 0 ? (
          <button className="btn btn-warning px-5 me-3" onClick={handleShow}>
            Login
          </button>
        ) : (
          <button className="btn btn-danger px-5 me-3" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      {/* Popup (Modal) */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={login}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={logindetails.username}
                onChange={(e) =>
                  setLogindetails({
                    ...logindetails,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={logindetails.password}
                onChange={(e) =>
                  setLogindetails({
                    ...logindetails,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
