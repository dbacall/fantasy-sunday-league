import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateSundayLeague from './createSundayLeagueComponent'
import api from '../../../services/api'
import { setLeagueCreated } from '../../../redux/slices/sundayCreatorSlice'
import { updateCurrentLeague } from '../../../redux/slices/sundayLeagueSlice'

const CreateSundayLeagueContainer = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user);

  const addLeague = async (name) => {
    const data = {
      name,
      owner: user.id,
    };

    const path = '/sunday-league/new';

    const result = await api.request('post', data, path);

    dispatch(updateCurrentLeague(result.data.data))

    dispatch(setLeagueCreated(true))
  };

  return (<CreateSundayLeague
    addLeague={addLeague}
  />);
}

export default CreateSundayLeagueContainer;