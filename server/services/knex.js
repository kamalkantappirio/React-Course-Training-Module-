const pg = require('pg');
let databaseUrl = process.env.DATABASE_URL || 'postgres://postgres@127.0.0.1:50003/d5m97v51ccc1ec';
pg.defaults.ssl = databaseUrl.indexOf('127.0.0.1') < 0;

const knex = require('knex')({
  client: 'pg',
  connection: databaseUrl,
  searchPath: 'public'
});

module.exports = knex;