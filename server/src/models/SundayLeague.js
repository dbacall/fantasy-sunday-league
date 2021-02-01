const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sundayLeagueSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

// team ref

sundayLeagueSchema.virtual('teams', {
  ref: 'SundayLeagueTeam',
  localField: '_id',
  foreignField: 'league',
});

// season ref

sundayLeagueSchema.virtual('seasons', {
  ref: 'SundayLeagueSeason',
  localField: '_id',
  foreignField: 'league',
});

sundayLeagueSchema.set('toObject', { virtuals: true });
sundayLeagueSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SundayLeague', sundayLeagueSchema);
