import React, { useState } from 'react';
import Loader from '../Loader'
import { format, parseISO } from 'date-fns';
// import { Link } from 'react-router-dom';

const SundayLeagueFixtureComponent = ({
  createNewGoal,
  fixture,
  status,
  teams,
}) => {
  const [homeTeamGoal, setHomeTeamGoal] = useState(false);
  const [awayTeamGoal, setAwayTeamGoal] = useState(false);
  const [homeTeamPlayer, setHomeTeamPlayer] = useState('');
  const [awayTeamPlayer, setAwayTeamPlayer] = useState('');
  const [homeTeamGoalMinute, setHomeTeamGoalMinute] = useState('');
  const [awayTeamGoalMinute, setAwayTeamGoalMinute] = useState('');

  const submitHomeGoal = (e) => {
    e.preventDefault();
    createNewGoal(homeTeamGoalMinute, homeTeamPlayer, fixture.homeTeam);
    setHomeTeamGoal(false);
  };

  const submitAwayGoal = (e) => {
    e.preventDefault();
    createNewGoal(awayTeamGoalMinute, awayTeamPlayer, fixture.awayTeam);
    setAwayTeamGoal(false);
  };

  const getName = (teamId) => {
    return teams.find((team) => team._id == teamId).name;
  };

  const getHomeTeamPlayers = () => {
    const { players } = teams.find((team) => team._id == fixture.homeTeam);
    return players;
  };

  const getAwayTeamPlayers = () => {
    const { players } = teams.find((team) => team._id == fixture.awayTeam);
    return players;
  };

  return (
    <div>
      {status === 'loading' ? (
        <Loader />
      ) : fixture && typeof fixture === 'object' && teams ? (
        <div>
          <button onClick={() => setHomeTeamGoal(!homeTeamGoal)}>
            Add Goal for {getName(fixture.homeTeam)}
          </button>
          {homeTeamGoal ? (
            <div>
              <form onSubmit={submitHomeGoal}>
                <input
                  type="text"
                  placeholder="Minute scored..."
                  value={homeTeamGoalMinute}
                  onChange={(e) => setHomeTeamGoalMinute(e.target.value)}
                />
                <select
                  value={homeTeamPlayer}
                  onChange={(e) => {
                    setHomeTeamPlayer(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select Player:
                  </option>
                  {getHomeTeamPlayers().map((player) => {
                    return (
                      <option value={player._id}>
                        {player.firstName} {player.surname}
                      </option>
                    );
                  })}
                </select>
                <button className="team-submit-btn">Add Goal</button>
              </form>
            </div>
          ) : null}
          <button onClick={() => setAwayTeamGoal(!awayTeamGoal)}>
            Add Goal for {getName(fixture.awayTeam)}
          </button>
          {awayTeamGoal ? (
            <div>
              <form onSubmit={submitAwayGoal}>
                <input
                  type="text"
                  placeholder="Minute scored..."
                  value={awayTeamGoalMinute}
                  onChange={(e) => setAwayTeamGoalMinute(e.target.value)}
                />
                <select
                  value={awayTeamPlayer}
                  onChange={(e) => {
                    setAwayTeamPlayer(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select Player:
                  </option>
                  {getAwayTeamPlayers().map((player) => {
                    return (
                      <option value={player._id}>
                        {player.firstName} {player.surname}
                      </option>
                    );
                  })}
                </select>
                <button className="team-submit-btn">Add Goal</button>
              </form>
            </div>
          ) : null}
          <h3>{format(parseISO(fixture.date), 'PPPPp')}</h3>
          <h2 key={fixture._id}>
            {getName(fixture.homeTeam)} {fixture.homeTeamGoals} -{' '}
            {fixture.awayTeamGoals} {getName(fixture.awayTeam)}
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default SundayLeagueFixtureComponent;
