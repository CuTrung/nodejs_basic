// get the client
// import mysql from 'mysql2';
import mysql from 'mysql2/promise';

// create the connection to database
// Cách 1:
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsbasic'
// });

// Cách 2: 
console.log("Creating connection pool ...");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    // password: 'password',
})


// simple query
// connection.query(
//     'SELECT * FROM `users`',
//     function (err, results, fields) {
//         console.log(results); 
//         let rows = results.map((row) => {
//             return row.id;
//         });
//         console.log(rows);
//     }
// );

// export default connection;

export default pool;

