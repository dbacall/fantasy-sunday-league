const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sundayLeagueFixtureSchema = new Schema({
  homeTeam: {
    type: mongoose.ObjectId,
  },
  awayTeam: {
    type: mongoose.ObjectId,
  },
  homeTeamGoals: {
    type: Number,
    default: 0,
  },
  awayTeamGoals: {
    type: Number,
    default: 0,
  },
  winner: {
    type: mongoose.ObjectId,
  },
  draw: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  gameweek: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueGameweek',
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueSeason',
  },
});

// goal ref

sundayLeagueFixtureSchema.virtual('goals', {
  ref: 'SundayLeagueGoal',
  localField: '_id',
  foreignField: 'fixture',
});

sundayLeagueFixtureSchema.set('toObject', { virtuals: true });
sundayLeagueFixtureSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model(
  'SundayLeagueFixture',
  sundayLeagueFixtureSchema
);
