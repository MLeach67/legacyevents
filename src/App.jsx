import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';
import WaitingListPage from './WaitingListPage';

function App() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState({}); // { eventId: [names] }
  const [waitingList, setWaitingList] = useState({}); // { eventId: [names] }

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
    </Router>
  );
}

export default App;
