import React, { useState } from 'react';

function ParticipantPage({ events, participants, setParticipants, waitingList, setWaitingList }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState({}); // { eventId: 'register' | 'waiting' }

  const handleOptionChange = (eventId, value) => {
    setSelectedOption((prev) => ({ ...prev, [eventId]: value }));
  };

  const handleSubmit = (eventId) => {
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    const event = events.find((e) => e.id === eventId);
    const currentParticipants = participants[eventId] || [];
    const currentWaiting = waitingList[eventId] || [];
    const option = selectedOption[eventId] || 'register';

    const newParticipant = {
      firstName,
      lastName,
      email,
      phone,
      paid: false // default unpaid
    };

    if (option === 'register') {
      if (currentParticipants.length >= event.maxParticipants) {
        alert(`Event is full. You can choose to join the waiting list.`);
        return;
      }

      setParticipants({
        ...participants,
        [eventId]: [...currentParticipants, newParticipant],
      });

      alert(`Registered for ${event.name}!`);
    } else if (option === 'waiting') {
      setWaitingList({
        ...waitingList,
        [eventId]: [...currentWaiting, newParticipant],
      });
      alert(`Added to waiting list for ${event.name}`);
    }

    // Clear input fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <h2>Register for an Event</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginRight: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

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
