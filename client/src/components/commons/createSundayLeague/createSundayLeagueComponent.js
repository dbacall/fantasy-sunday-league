import React, { useState } from 'react';

const CreateSundayLeague = ({ addLeague }) => {
  const [name, setName] = useState('');

  const submitLeague = (e) => {
    e.preventDefault();
    addLeague(name);
    setName('');
  };

  return (
    <div>
      <form onSubmit={submitLeague}>
        <input
          className="home-input"
          type="text"
          placeholder="Your league name here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default CreateSundayLeague;