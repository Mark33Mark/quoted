import mysql from 'mysql2/promise';

const connectionSettings = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  charset: 'utf8mb4',     // critical setting for emojis to be accepted
  connectionLimit: 2,     // do not exceed 5, for low traffic 1-2 is optimum.
  maxIdle: 1,             // default value is the same as `connectionLimit`
  idleTimeout: 30000,    // default value 60000
  enableKeepAlive: true, // proactively checks connection health
  keepAliveInitialDelay: 20000,
}

export const connection =
  mysql.createPool(connectionSettings);
