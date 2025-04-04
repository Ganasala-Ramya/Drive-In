import React, { useEffect, useState } from "react";
import axios from "axios";

const Counteravailability = () => {
  const [counterdata, setCounterdata] = useState([]);

  // Function to fetch data from API
  const fetchData = () => {
    axios.get("http://localhost:9098/api/cp/all").then((response) => {
      setCounterdata(response.data);
    });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to toggle the counter's status using local data
  const changeCounterStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Not Active" : "Active";

    console.log(`Changing status for id ${id} to ${newStatus}`);
    
    // Update status in the backend
    axios
      .put(`http://localhost:9098/api/cp/updateAvailability/${id}?status=${newStatus}`)
      .then((response) => {
        window.alert(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div>
      <h1
        style={{
          color: "blue",
          textAlign: "center",
          fontFamily: "sans-serif",
          padding: "20px 0"
        }}
      >
        Counter Availability
      </h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {counterdata.map((element, index) => (
            <tr key={element.id}>
              <td>{index + 1}</td>
              <td>{element.counterName}</td>
              <td>
                <button
                  className={
                    element.status === "Active"
                      ? "btn btn-primary px-5 my-2 w-50"
                      : "btn btn-danger px-5 my-2 w-50"
                  }
                  onClick={() =>
                    changeCounterStatus(element.id, element.status)
                  }
                >
                  {element.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Counteravailability;