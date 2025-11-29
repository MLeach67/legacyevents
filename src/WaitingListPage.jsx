import React from 'react';

function WaitingListPage({ events, waitingList, setWaitingList }) {
  const handleRemoveFromWaiting = (eventId, participant) => {
    setWaitingList((prev) => ({
      ...prev,
      [eventId]: prev[eventId].filter((p) => p !== participant),
    }));
  };

  const handlePaidToggle = (eventId, idx) => {
    const updatedList = [...waitingList[eventId]];
    updatedList[idx].paid = !updatedList[idx].paid;
    setWaitingList((prev) => ({
      ...prev,
      [eventId]: updatedList,
    }));
  };

  return (
    <div>
      <h2>Waiting Lists</h2>
      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: '30px' }}>
            <h4>{event.name} — {event.date}</h4>
            <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Paid</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(waitingList[event.id] && waitingList[event.id].length > 0) ? (
                  waitingList[event.id].map((p, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{p.firstName}</td>
                      <td>{p.lastName}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={p.paid || false}
                          onChange={() => handlePaidToggle(event.id, idx)}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleRemoveFromWaiting(event.id, p)}>Remove</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No participants on waiting list.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default WaitingListPage;
