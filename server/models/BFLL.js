const { Pool } = require('pg');

const PG_URI = 'postgres://hgopngtf:H1NH-lEkGXVvn5kGbJxgKbnj0QrnBO7d@ruby.db.elephantsql.com/hgopngtf';

const pool = new Pool({
    connectionString: PG_URI
  });

  module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    }
  };