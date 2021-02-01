import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/navbar/navbarContainer';
import Register from '../components/register/registerContainer';
import Login from '../components/login/loginContainer';
import Home from '../components/home/homeContainer';
import MySundayLeagues from '../components/mySundayLeagues/mySundayLeaguesContainer';
import SundayLeague from '../components/sundayLeague/sundayLeagueContainer';
import SundayLeagueTeam from '../components/sundayLeagueTeam/sundayLeagueTeamContainer';
import SundayFixture from '../components/sundayFixture/sundayFixtureContainer';
import SundayCreator from '../components/sundayCreator/sundayCreatorContainer'

const RouterConfig = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/my-sunday-leagues" component={MySundayLeagues} />
          <PrivateRoute
            exact
            path="/sunday-league/:id"
            component={SundayLeague}
          />
          <PrivateRoute
            exact
            path="/sunday-league/team/:id"
            component={SundayLeagueTeam}
          />
          <PrivateRoute
            exact
            path="/sunday-league/fixture/:id"
            component={SundayFixture}
          />
          <PrivateRoute
            exact
            path="/sunday-league/new/create"
            component={SundayCreator}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterConfig;
