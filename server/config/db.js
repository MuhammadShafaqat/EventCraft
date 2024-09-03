const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Mysql_$27890',
   port: 3307,
   database: 'eventsdb'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log('Error in DB connection:', err);
    } else {
        console.log('Database connected successfully');

        // Create the users table if it doesn't exist
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `;

        mysqlConnection.query(createUsersTableQuery, (err, result) => {
            if (err) {
                console.log('Error creating users table:', err);
            } else {
                console.log('Users table created or already exists.');
            }
        });

        // Create the events table if it doesn't exist
        const createEventsTableQuery = `
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                dateTime DATETIME NOT NULL,
                location VARCHAR(255) NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT FALSE
            )
        `;

        mysqlConnection.query(createEventsTableQuery, (err, result) => {
            if (err) {
                console.log('Error creating events table:', err);
            } else {
                console.log('Events table created or already exists.');
            }
        });
    }
});

module.exports = mysqlConnection;
