const pg = require('pg');

const { Pool } = pg;

const connectionString = "postgres://psrjlkhv:7Aqu4tOAAS6SMSn0xEgPU9tURvlcASVz@cornelius.db.elephantsql.com/psrjlkhv";
const pool = new Pool({
  connectionString,
});

module.exports = pool;
