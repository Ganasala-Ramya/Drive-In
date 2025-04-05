import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, ListGroup, Card, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Counters = () => {
  const [counters, setCounters] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounters();
  }, []);

  useEffect(() => {
    if (selectedCounter) {
      fetchMenuItems(selectedCounter.id);
    }
  }, [selectedCounter]);

  const fetchCounters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/counters');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch counters');
      setCounters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMenuItems = async (counterId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/counters/${counterId}/menu`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch menu');
      setMenuItems(data);
      setSelectedItem(null); // Reset selected item when counter changes
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCounterSelect = (counter) => {
    setSelectedCounter(counter);
    setShowSideNav(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar">
          <div className="position-sticky pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Counters</span>
            </h6>
            <ListGroup variant="flush">
              {counters.map(counter => (
                <ListGroup.Item 
                  key={counter.id}
                  action 
                  active={selectedCounter?.id === counter.id}
                  onClick={() => handleCounterSelect(counter)}
                  className="d-flex justify-content-between align-items-center"
                >
                  {counter.name}
                  <Badge bg="secondary" pill>{counter.status}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>

        {/* Mobile Side Nav Toggle */}
        <button 
          className="d-md-none btn btn-primary position-fixed m-3" 
          onClick={() => setShowSideNav(true)}
          style={{ zIndex: 1000 }}
        >
          ☰ Counters
        </button>

        {/* Mobile Side Nav Offcanvas */}
        <Offcanvas show={showSideNav} onHide={() => setShowSideNav(false)} responsive="md">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Counters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup variant="flush">
              {counters.map(counter => (
                <ListGroup.Item 
                  key={counter.id}
                  action 
                  active={selectedCounter?.id === counter.id}
                  onClick={() => handleCounterSelect(counter)}
                >
                  {counter.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              {selectedCounter ? `${selectedCounter.name} Menu` : 'Select a Counter'}
            </h1>
          </div>

          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {selectedCounter && (
            <div className="row">
              <div className="col-md-6">
                <h4>Menu Items</h4>
                <ListGroup>
                  {menuItems.map(item => (
                    <ListGroup.Item 
                      key={item.id}
                      action 
                      active={selectedItem?.id === item.id}
                      onClick={() => handleItemSelect(item)}
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name}</div>
                        {item.description}
                      </div>
                      <Badge bg="primary" pill>₹{item.price}</Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div className="col-md-6">
                {selectedItem ? (
                  <Card>
                    <Card.Img variant="top" src={selectedItem.imageUrl || '/default-food.png'} />
                    <Card.Body>
                      <Card.Title>{selectedItem.name}</Card.Title>
                      <Card.Text>
                        {selectedItem.description}
                      </Card.Text>
                      <div className="mb-2">
                        <strong>Price:</strong> ₹{selectedItem.price}
                      </div>
                      <div className="mb-2">
                        <strong>Availability:</strong> 
                        <Badge bg={selectedItem.available ? 'success' : 'danger'} className="ms-2">
                          {selectedItem.available ? 'Available' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div>
                        <strong>Category:</strong> {selectedItem.category}
                      </div>
                    </Card.Body>
                  </Card>
                ) : (
                  <div className="alert alert-info">
                    Select an item to view details
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedCounter && !isLoading && !error && (
            <div className="alert alert-warning">
              Please select a counter from the sidebar to view its menu
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Counters;