const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  app.use(bodyParser.json());

  // Passport middleware
  app.use(passport.initialize());

  // Passport config
  require('../config/passport')(passport);

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server up and running on port ${port}!`));
};
