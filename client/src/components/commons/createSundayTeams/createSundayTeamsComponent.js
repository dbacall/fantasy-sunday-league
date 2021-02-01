import React, { useState } from 'react';
import Loader from '../../Loader'

const CreateSundayTeams = ({ submitTeam, status, teams, leagueStatus, finishTeams }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTeam(name);
    setName('');
  };

  return (
    status === 'loading' || leagueStatus === 'loading' ? (
      <Loader />
    ) : (
        <section>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Team name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="team-submit-btn">Add Team</button>
            </form>
            <button className="team-submit-btn" onClick={finishTeams}>Finish Adding Teams</button>
          </div>
          <div>
            {teams.map((team, index) => {
              return (
                <div key={index}>

                  {team.name}
                </div>
              );
            })}

          </div>
        </section>
      )
  );
}

export default CreateSundayTeams;
