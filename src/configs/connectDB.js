// get the client
const mysql = require('mysql2/promise');

// import mysql from 'mysql2/promise';
// import pool from 'mysql2/typings/mysql/lib/Pool';

console.log("Creating connection pool...");
// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
});


module.exports = pool;
