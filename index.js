
'use strict';

const app = require('./server/index');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); // eslint-disable-line
});
