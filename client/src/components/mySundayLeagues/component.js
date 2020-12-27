import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

const MySundayLeagues = ({ status, leagues }) => {
  return (
    <div>
      <h1>My Sunday Leagues</h1>

      {status === 'loading' ? (
        <ReactLoading type={'spin'} color={'black'} height={40} width={40} />
      ) : (
        leagues.map((league) => {
          return (
            <div>
              <Link
                to={{
                  pathname: `/sunday-league/${league._id}`,
                  state: { league: league },
                }}
              >
                {league.leagueName}
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

MySundayLeagues.propTypes = {
  leagues: PropTypes.array,
  status: PropTypes.string,
};

MySundayLeagues.defaultProps = {
  leagues: [],
  status: 'loading',
};

export default MySundayLeagues;