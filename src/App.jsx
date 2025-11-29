import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import firebase from './firebase';
import { getDatabase, ref, onValue } from "firebase/database";

import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';
import WaitingListPage from './WaitingListPage';

function App() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState({}); // { eventId: [names] }
  const [waitingList, setWaitingList] = useState({}); // { eventId: [names] }

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(firebase);
    
    // Reference to the specific collection in the database
    const collectionRef = ref(database, "Events");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          //const displayItem = Object.entries(dataItem);
          //const displayItem = dataItem;
          const dataArray = Object.entries(dataItem).map(([key, value]) => ({
            id: key,
            ...value
          }));
          
          setEvents(dataArray);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);
  console.log(events);
  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Participant Page</Link>
          <Link to="/admin" style={{ marginRight: '10px' }}>Admin Page</Link>
          <Link to="/waiting">Waiting List</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<ParticipantPage
              events={events}
              participants={participants}
              setParticipants={setParticipants}
              waitingList={waitingList}
              setWaitingList={setWaitingList}
            />}
          />
          <Route
            path="/admin"
            element={<AdminPage
              events={events}
              setEvents={setEvents}
              participants={participants}
              setParticipants={setParticipants}
              waitingList={waitingList}
              setWaitingList={setWaitingList}
            />}
          />
          <Route
            path="/waiting"
            element={<WaitingListPage
              events={events}
              waitingList={waitingList}
              setWaitingList={setWaitingList}
            />}
          />
        </Routes>
        </div>
        {/*
        <div>
        <h1>Data from database:</h1>
        <ul>
        {events.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
        </div>
        */}
    </Router>
  );
}

export default App;