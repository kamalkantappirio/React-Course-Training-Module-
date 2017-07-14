
'use strict';

import winston from 'winston';

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  winston.log(`App listening on port ${PORT}!`);
});
