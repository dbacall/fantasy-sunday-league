import React, { useState, useEffect, useRef } from 'react';
import SundayTable from './sundayTableComponent';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchResults,
} from '../../redux/thunks/sundayLeagueResultsThunks';

const SundayTableContainer = () => {
  const [sortedResults, setSortedResults] = useState([])

  const dispatch = useDispatch();

  const { results, status } = useSelector(
    (state) => state.sundayLeagueResults
  );

  const { teams } = useSelector((state) => state.sundayLeagueTeam);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && Object.keys(teams).length > 0) {
      isInitialMount.current = false;
      dispatch(fetchResults(teams));
      sortResults()
    }
  }, [results]);

  const sortResults = () => {
    let newResults = [...results]

    newResults.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    })

    setSortedResults(newResults)
  }

  return (
    <SundayTable
      results={sortedResults}
      status={status}
    />
  );
};

export default SundayTableContainer;