const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sundayLeagueSeasonSchema = new Schema({
  number: {
    type: Number,
  },
  yearFrom: {
    type: Number,
  },
  yearTo: {
    type: Number,
  },
  current: {
    type: Boolean,
    default: true,
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeague',
  },
});

// gameweek ref

sundayLeagueSeasonSchema.virtual('gameweeks', {
  ref: 'SundayLeagueGameweek',
  localField: '_id',
  foreignField: 'season',
});

sundayLeagueSeasonSchema.set('toObject', { virtuals: true });
sundayLeagueSeasonSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SundayLeagueSeason', sundayLeagueSeasonSchema);
