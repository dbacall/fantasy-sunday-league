import React, { useState } from 'react';
import Loader from '../Loader'
import { Link } from 'react-router-dom';

const SundayLeagueTeam = ({ team, submitPlayer, players, status }) => {
  const [addPlayer, setAddPlayer] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPlayer(firstName, surname, position);
    setFirstName('');
    setSurname('');
    setPosition('');
  };

  return (
    <div>
      <h1>{team.name}</h1>
      <button onClick={() => setAddPlayer(!addPlayer)}>Add Player</button>
      {addPlayer ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className="add-team-input"
              type="text"
              placeholder="Player first name here..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="add-team-input"
              type="text"
              placeholder="Player surname here..."
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label>
              <input
                type="radio"
                value="Goalkeeper"
                checked={position === 'Goalkeeper'}
                onChange={(e) => setPosition(e.target.value)}
              />
              Goalkeeper
            </label>
            <label>
              <input
                type="radio"
                value="Defender"
                checked={position === 'Defender'}
                onChange={(e) => setPosition(e.target.value)}
              />
              Defender
            </label>
            <label>
              <input
                type="radio"
                value="Midfielder"
                checked={position === 'Midfielder'}
                onChange={(e) => setPosition(e.target.value)}
              />
              Midfielder
            </label>
            <label>
              <input
                type="radio"
                value="Forward"
                checked={position === 'Forward'}
                onChange={(e) => setPosition(e.target.value)}
              />
              Forward
            </label>
            <button className="team-submit-btn">Add</button>
          </form>
        </div>
      ) : null}
      <h2>Players</h2>
      {status === 'loading' ? (
        <Loader />
      ) : players.length > 0 ? (
        players.map((player, index) => {
          return (
            <div key={index}>
              <Link
                to={{
                  pathname: `/sunday-league/${player._id}`,
                  state: { player },
                }}
              >
                {player.firstName} {player.surname} - {player.position}
              </Link>
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default SundayLeagueTeam;
