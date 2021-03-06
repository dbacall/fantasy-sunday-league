import React from 'react';
import { shallow, mount } from 'enzyme';
import SundayLeague from '../sundayLeagueComponent';

describe('sundayLeague component tests:', () => {
  const props = { league: { name: 'league1' } };
  const teams = [{ name: 'team1' }, { name: 'team2' }];

  it('should show the form when add team button clicked', () => {
    const wrap = shallow(<SundayLeague {...props} />);
    wrap.find('button').first().simulate('click');
    expect(wrap).toMatchSnapshot();
  });

  it('should show the name you type in to the input', () => {
    const wrap = shallow(<SundayLeague {...props} />);
    wrap.find('button').simulate('click');
    expect(wrap.find('input').prop('value')).toEqual('');
    wrap.find('input').simulate('change', {
      target: { value: 'team1' },
    });
    expect(wrap.find('input').prop('value')).toEqual('team1');
  });

  it('should submit the team', () => {
    const submitTeam = jest.fn();
    const event = { preventDefault: jest.fn() };
    const wrap = shallow(<SundayLeague {...props} submitTeam={submitTeam} />);
    wrap.find('button').simulate('click');
    wrap.find('input').simulate('change', {
      target: { value: 'team1' },
    });
    wrap.find('form').simulate('submit', event);
    expect(submitTeam).toHaveBeenCalled();
    expect(submitTeam).toHaveBeenCalledWith('team1');
  });

  it('should show teams if in props', () => {
    const wrap = shallow(<SundayLeague {...props} teams={teams} />);
    expect(wrap).toMatchSnapshot();
  });
});
