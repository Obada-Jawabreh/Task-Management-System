const { Pool , Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Tasks",
  password: "obada4047",
  port: 5432,
});

module.exports = pool;
