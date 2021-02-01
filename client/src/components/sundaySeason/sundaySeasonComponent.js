import React, { useState } from 'react';
import Loader from '../Loader'
import SundayGameweek from '../sundayGameweek/sundayGameweekContainer';
import SundayTable from '../sundayTable/sundayTableContainer';
import styles from './sundaySeason.module.scss'

const SundaySeasonComponent = ({ createNewSeason, season, status }) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const previousYear = currentYear - 1;
  const nextYear = currentYear + 1;

  const [newSeason, setNewSeason] = useState(false);
  const [yearFrom, setYearFrom] = useState(currentYear);
  const [yearTo, setYearTo] = useState(nextYear);

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewSeason(parseInt(yearFrom), parseInt(yearTo));
    setNewSeason(false);
  };

  const renderYear = () => {
    return season.yearFrom === season.yearTo ? (
      <h3 className={styles.year}>{season.yearFrom}</h3>
    ) :
      (
        <h3 className={styles.year}>
          {season.yearFrom}/{season.yearTo}
        </h3>
      )
  }

  return (
    <section className={styles.season}>

      {status === 'loading' ? (
        <Loader />
      ) : season ? (
        <div>
          {renderYear()}


          < div className={styles.mainContainer}>
            <div className={styles.table}>
              <SundayTable />
            </div>
            <div className={styles.gameweek}>
              <SundayGameweek />
            </div>
          </div>
        </div>
      ) : null
      }

      {/* <button onClick={() => setNewSeason(!newSeason)}>Start New Season</button>
      {
        newSeason ? (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Start Year:
              <select
                  value={yearFrom}
                  onChange={(e) => {
                    setYearFrom(e.target.value);
                  }}
                >
                  <option value={previousYear}>{previousYear}</option>
                  <option value={currentYear}>{currentYear}</option>
                  <option value={nextYear}>{nextYear}</option>
                  <option value={nextYear + 1}>{nextYear + 1}</option>
                </select>
              </label>

              <label>
                End Year:
              <select
                  value={yearTo}
                  onChange={(e) => {
                    setYearTo(e.target.value);
                  }}
                >
                  <option value={previousYear}>{previousYear}</option>
                  <option value={currentYear}>{currentYear}</option>
                  <option value={nextYear}>{nextYear}</option>
                  <option value={nextYear + 1}>{nextYear + 1}</option>
                </select>
              </label>
              <button className="team-submit-btn">Create New Season</button>
            </form>
          </div>
        ) : null
      } */}
    </section >
  );
};

export default SundaySeasonComponent;
