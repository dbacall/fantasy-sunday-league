import React from 'react';
import Loader from '../Loader'
import { Link } from 'react-router-dom';
import styles from './mySundayLeagues.module.scss'

const MySundayLeagues = ({ status, leagues }) => {
  return (
    status === 'loading' ? (
      <Loader />
    ) : (
        <section className={styles.mySundayLeagues}>
          <div className={styles.gridContainer}>
            <div className={styles.myLeagues}>
              <h2 className={styles.title}>My Leagues</h2>
              {leagues.map((league) => {
                return (
                  <div key={league.id} className={styles.link}>
                    <Link
                      to={{
                        pathname: `/sunday-league/${league.id}`,
                        state: { league },
                      }}
                    >
                      {league.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className={styles.createLeague}>
              <h2 className={styles.title}>Create League</h2>
              <p className={styles.createLeagueDescription}>
                To start creating a league click the link below. Once you begin creating a league
                you must finish the process, it lasts for about half an hour.
              </p>
              <div className={styles.link}>
                <Link
                  to='/sunday-league/new/create'
                  className={styles.link}
                >
                  Create League
              </Link>
              </div>
            </div>
            <div className={styles.findLeague}>
              <h2 className={styles.title}>Find League</h2>
            </div>
          </div>
        </section >
      )
  );
};

export default MySundayLeagues;
