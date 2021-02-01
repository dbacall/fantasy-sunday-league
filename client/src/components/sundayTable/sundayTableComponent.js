import React from 'react';
import Loader from '../Loader'
import styles from './sundayTable.module.scss'

const SundayTableComponent = ({
  results,
  status,
}) => {

  return (
    <section className={styles.table}>
      {status === 'loading' ? (
        <Loader />
      ) : (
          < div >
            <h3 className={styles.title}>Table</h3>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>Drawn</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id}>
                      <td>{index + 1}</td>
                      <td>{result.name}</td>
                      <td>{result.won + result.lost + result.drawn}</td>
                      <td>{result.won}</td>
                      <td>{result.lost}</td>
                      <td>{result.drawn}</td>
                      <td>{result.goalsFor}</td>
                      <td>{result.goalsAgainst}</td>
                      <td>{result.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </section >
  );
};

export default SundayTableComponent;