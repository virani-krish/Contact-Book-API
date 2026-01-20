const mysql = require("mysql");
const {env} = require("./env");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

// verify DB connection at startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("MySQL connected");
  connection.release();
});

module.exports = pool;
