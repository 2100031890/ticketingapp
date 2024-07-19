// DataContext.js
import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [key, setKey] = useState(0); 

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/ticket/all-tickets');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]); // Fetch data whenever key changes

  const refreshData = () => {
    setKey(prevKey => prevKey + 1); // Update key to force refresh
  };


  const addTicket = async (ticketData) => {
    try {
      const response = await fetch('http://localhost:8080/ticket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      refreshData();
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const updateTicket = async (ticketData) => {
    try {
      const response = await fetch('http://localhost:8080/ticket/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      refreshData();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const deleteTicket = async (tickedid) => {
    try {
      const url = `http://localhost:8080/ticket/delete/${tickedid}`; 
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      refreshData();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData ,addTicket,updateTicket,deleteTicket}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
