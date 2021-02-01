import React from 'react';
import Loader from '../Loader'
import SundayFixtures from '../sundayFixtures/sundayFixturesContainer';
import styles from './sundayGameweek.module.scss'

const SundayGameweekComponent = ({
  createNewGameweek,
  gameweek,
  status,
  getPrevious,
  getNext,
  completeGameweek
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    createNewGameweek();
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    getPrevious();
  };

  const handleNext = (e) => {
    e.preventDefault();
    getNext();
  };

  return (
    status === 'loading' ? (
      <Loader />
    ) : gameweek ? (
      <section className={styles.gameweek}>
        <h3 className={styles.title}>Gameweek {gameweek.number}</h3>
        {/* <button onClick={handleClick}>Start Next Gameweek</button> */}
        <div className={styles.fixturesContainer}>
          <SundayFixtures gameweek={gameweek} />
          <div className={styles.buttonContainer}>
            {gameweek && gameweek.number > 1 ? (
              <a href="" onClick={handlePrevious} className={styles.previous}>
                Previous
              </a>
            ) : null}
            {/* <button onClick={() => completeGameweek()}>Complete Gameweek & Update Table</button> */}
            <a href="" onClick={handleNext} className={styles.next}>
              Next
        </a>
          </div>
        </div>
      </section>
    ) : null
  );
};

export default SundayGameweekComponent;
