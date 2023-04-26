import { useState, useEffect } from "react";

export const EvacuationCenterList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEvacuationCenter();
  }, []);

  const getEvacuationCenter = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/evacuation");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const EvacuationCenterAdd = async (
  name,
  municipality,
  barangay,
  capacity
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/evacuation/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
        municipality: municipality,
        barangay: barangay,
        capacity: capacity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const EvacuationCenterUpdate = async (
  id,
  name,
  municipality,
  barangay,
  capacity
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/evacuation/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        municipality: municipality,
        barangay: barangay,
        capacity: capacity,
      }),
    });
    const data = await response.json();
    // alert("Updated!");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const EvacuationCenterDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/evacuation/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
