import React, { useState } from 'react';
import CreateSundayLeague from '../commons/createSundayLeague/createSundayLeagueContainer'
import CreateSundayTeams from '../commons/createSundayTeams/createSundayTeamsContainer'

const SundayCreator = ({ leagueCreated, teamsAdded, seasonAdded }) => {
  const renderSteps = () => {
    if (!leagueCreated) {
      return (
        <div>
          <h2>Step 1: Create a League</h2>
          <CreateSundayLeague />
        </div>
      )
    }
    if (!teamsAdded && leagueCreated) {
      return (
        <div>
          <h2>Step 2: Add Teams</h2>
          <p>Note: Players need to be added later from the admin dashboard</p>
          <p>Note: Teams can be added to, edited and deleted from the admin dashboard</p>
          <CreateSundayTeams />
        </div>
      )
    }
    if (!seasonAdded && teamsAdded && leagueCreated) {
      return (
        <div>
          <h2>Step 3: Create First Season</h2>
        </div>
      )

    }
  }

  return (
    <section>
      {renderSteps()}
    </section>
  );
}

export default SundayCreator;