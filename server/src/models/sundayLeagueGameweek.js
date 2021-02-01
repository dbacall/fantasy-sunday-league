const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sundayLeagueGameweekSchema = new Schema({
  number: {
    type: Number,
    min: [1, 'The lowest number for a gameweek is 1'],
  },
  current: {
    type: Boolean,
    default: true,
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'SundayLeagueSeason',
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

// fixture ref

sundayLeagueGameweekSchema.virtual('fixtures', {
  ref: 'SundayLeagueFixture',
  localField: '_id',
  foreignField: 'gameweek',
});

sundayLeagueGameweekSchema.set('toObject', { virtuals: true });
sundayLeagueGameweekSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model(
  'SundayLeagueGameweek',
  sundayLeagueGameweekSchema
);
