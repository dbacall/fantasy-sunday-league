const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sundayLeagueGoalSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeaguePlayer',
  },
  minute: {
    type: Number,
    min: [0, 'Minute entered must be between 0 and 100'],
    max: [100, 'Minute entered must be between 0 and 100'],
  },
  fixture: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueFixture',
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueTeam',
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueSeason',
  },
});

module.exports = mongoose.model('SundayLeagueGoal', sundayLeagueGoalSchema);
