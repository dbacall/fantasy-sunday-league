import React, { useEffect, useRef } from 'react';
import SundayCreator from './sundayCreatorComponent'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../../redux/slices/sundayCreatorSlice'

const SundayCreatorContainer = () => {
  const dispatch = useDispatch()
  const { leagueCreated, teamsAdded, seasonAdded } = useSelector((state) => state.sundayCreator)


  useEffect(() => {
    return function cleanup() {
      dispatch(reset());
    };
  }, []);

  return (<SundayCreator
    leagueCreated={leagueCreated}
    teamsAdded={teamsAdded}
    seasonAdded={seasonAdded}
  />);
}

export default SundayCreatorContainer;