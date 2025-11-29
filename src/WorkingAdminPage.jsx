import React, { useState } from 'react';

function AdminPage({ events, setEvents, participants, setParticipants, waitingList, setWaitingList }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!name || !date || !price || !maxParticipants) {
      alert('Please fill all fields.');
      return;
    }

    if (editingId !== null) {
      setEvents(
        events.map((event) =>
          event.id === editingId
            ? { ...event, name, date, price: parseFloat(price), maxParticipants: parseInt(maxParticipants) }
            : event
        )
      );
      setEditingId(null);
    } else {
      const newEvent = {
        id: Date.now(),
        name,
        date,
        price: parseFloat(price),
        maxParticipants: parseInt(maxParticipants),
      };
      setEvents([...events, newEvent]);
    }

    setName('');
    setDate('');
    setPrice('');
    setMaxParticipants('');
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setName(event.name);
    setDate(event.date);
    setPrice(event.price);
    setMaxParticipants(event.maxParticipants);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((event) => event.id !== id));
      setParticipants((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setWaitingList((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleUnregisterParticipant = (eventId, participantName) => {
    setParticipants((prev) => ({
      ...prev,
      [eventId]: prev[eventId].filter((name) => name !== participantName),
    }));

    // Move first waiting list participant into main participants if exists
    if (waitingList[eventId] && waitingList[eventId].length > 0) {
      const [first, ...rest] = waitingList[eventId];
      setParticipants((prev) => ({
        ...prev,
        [eventId]: [...(prev[eventId] || []), first],
      }));
      setWaitingList((prev) => ({
        ...prev,
        [eventId]: rest,
      }));
    }
  };

  const handleUnregisterWaiting = (eventId, participantName) => {
    setWaitingList((prev) => ({
      ...prev,
      [eventId]: prev[eventId].filter((name) => name !== participantName),
    }));
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleAddEvent} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" />
        <input type="number" placeholder="Max Participants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />
        <button type="submit" style={{ marginLeft: '10px' }}>{editingId ? 'Update Event' : 'Add Event'}</button>
      </form>

      <h3>Event List</h3>
      {events.length === 0 ? <p>No events yet.</p> :
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: '30px' }}>
            <h4>{event.name} — {event.date} — ${event.price.toFixed(2)} — Max: {event.maxParticipants}</h4>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)} style={{ marginLeft: '5px' }}>Delete</button>

            {/* Registered Participants Table */}
            <h5>Registered Participants</h5>
            <table border="1" cellPadding="5" style={{ marginTop: '5px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(participants[event.id] || []).length === 0 ? (
                  <tr>
                    <td colSpan="3">No participants registered.</td>
                  </tr>
                ) : (
                  participants[event.id].map((p, idx) => (
                    <tr key={p}>
                      <td>{idx + 1}</td>
                      <td>{p}</td>
                      <td>
                        <button onClick={() => handleUnregisterParticipant(event.id, p)}>Unregister</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Waiting List Table */}
            <h5 style={{ marginTop: '15px' }}>Waiting List</h5>
            <table border="1" cellPadding="5" style={{ marginTop: '5px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(waitingList[event.id] || []).length === 0 ? (
                  <tr>
                    <td colSpan="3">No participants on waiting list.</td>
                  </tr>
                ) : (
                  waitingList[event.id].map((p, idx) => (
                    <tr key={p}>
                      <td>{idx + 1}</td>
                      <td>{p}</td>
                      <td>
                        <button onClick={() => handleUnregisterWaiting(event.id, p)}>Remove</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      }
    </div>
  );
}

export default AdminPage;
