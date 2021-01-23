import React, { useState } from 'react';
import Loader from '../Loader'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import styles from './sundayFixtures.module.scss'
import { enGB } from 'date-fns/locale'

const SundayFixturesComponent = ({
  createNewFixture,
  teams,
  gameweek,
  status,
}) => {
  const [newFixture, setNewFixture] = useState(false);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewFixture(homeTeam, awayTeam, date);
    setNewFixture(false);
  };

  const getName = (teamId) => {
    return teams.find((team) => team._id == teamId).name;
  };

  return (
    <section className={styles.fixtures}>
      {/* <button onClick={() => setNewFixture(!newFixture)}>Add Fixture</button>
      {newFixture ? (
        <div>
          <form onSubmit={handleSubmit}>
            <select
              value={homeTeam}
              onChange={(e) => {
                setHomeTeam(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Home Team:
              </option>
              {teams.map((team) => {
                return <option value={team.id}>{team.name}</option>;
              })}
            </select>

            <select
              value={awayTeam}
              onChange={(e) => {
                setAwayTeam(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Away Team:
              </option>
              {teams.map((team) => {
                return <option value={team.id}>{team.name}</option>;
              })}
            </select>

            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />

            <button className="team-submit-btn">Create Fixture</button>
          </form>
        </div>
      ) : null} */}
      {status === 'loading' ? (
        <Loader />
      ) : gameweek && teams.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {gameweek.fixtures.map(fixture => (
              <tr key={fixture.id}>
                <td>{getName(fixture.homeTeam)}</td>
                <td><a href=''>vs</a></td>
                <td>{getName(fixture.awayTeam)}</td>
                <td>{format(parseISO(fixture.date), 'Pp', { locale: enGB })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  );
};

export default SundayFixturesComponent;