import React, { useState } from 'react';

function ParticipantPage({ events, participants, setParticipants, waitingList, setWaitingList }) {
  const [participantName, setParticipantName] = useState('');
  const [selectedOption, setSelectedOption] = useState({}); // { eventId: 'register' | 'waiting' }

  const handleOptionChange = (eventId, value) => {
    setSelectedOption((prev) => ({ ...prev, [eventId]: value }));
  };

  const handleSubmit = (eventId) => {
    if (!participantName) {
      alert('Please enter your name.');
      return;
    }

    const event = events.find((e) => e.id === eventId);
    const currentParticipants = participants[eventId] || [];
    const currentWaiting = waitingList[eventId] || [];
    const option = selectedOption[eventId] || 'register';

    if (option === 'register') {
      if (currentParticipants.length >= event.maxParticipants) {
        alert(`Event is full. You can choose to join the waiting list.`);
        return;
      }

      setParticipants({
        ...participants,
        [eventId]: [...currentParticipants, participantName],
      });

      alert(`Registered for ${event.name}!`);
    } else if (option === 'waiting') {
      setWaitingList({
        ...waitingList,
        [eventId]: [...currentWaiting, participantName],
      });
      alert(`Added to waiting list for ${event.name}`);
    }

    setParticipantName('');
  };

  return (
    <div>
      <h2>Register for an Event</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '15px' }}>
            <strong>{event.name}</strong> — {event.date} — ${event.price.toFixed(2)} — Max: {event.maxParticipants}
            <br />
            Registered: {(participants[event.id] || []).length} / {event.maxParticipants}
            <br />
            <label>
              <input
                type="radio"
                name={`option-${event.id}`}
                value="register"
                checked={selectedOption[event.id] === 'register'}
                onChange={() => handleOptionChange(event.id, 'register')}
              /> Register (if space available)
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={`option-${event.id}`}
                value="waiting"
                checked={selectedOption[event.id] === 'waiting'}
                onChange={() => handleOptionChange(event.id, 'waiting')}
              /> Join Waiting List
            </label>
            <br />
            <button
              onClick={() => handleSubmit(event.id)}
              style={{ marginTop: '5px' }}
            >
              Submit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantPage;
