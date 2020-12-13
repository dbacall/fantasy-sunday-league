const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

beforeEach(async () => {
  await mongoose.connection.dropDatabase(() => {});

  // await mongoose.connection.collections.users.drop(() => {});
  // await mongoose.connection.collections.sundayleagues.drop(() => {});
  // await mongoose.connection.collections.sundayleagueteams.drop(() => {});
});

// afterEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     done();
//   });
// });

after(() => {
  mongoose.connection.close(() => {
    console.log('Test database connection closed');
  });
});