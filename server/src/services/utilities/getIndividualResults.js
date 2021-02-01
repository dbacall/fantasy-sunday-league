module.exports = (team, fixtures) => {
  let teamResults = {
    name: team.name,
    id: team.id,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }
  for (const fixture of fixtures) {
    if (fixture.winner == team.id) {
      teamResults.won += 1
      teamResults.points += 3
    } else if (fixture.draw) {
      teamResults.drawn += 1
      teamResults.points += 1
    } else teamResults.lost += 1

    if (fixture.homeTeam == team.id) {
      teamResults.goalsFor += fixture.homeTeamGoals
      teamResults.goalsAgainst += fixture.awayTeamGoals
    }
    if (fixture.awayTeam == team.id) {
      teamResults.goalsFor += fixture.awayTeamGoals
      teamResults.goalsAgainst += fixture.homeTeamGoals
    }
  };
  return teamResults;
}