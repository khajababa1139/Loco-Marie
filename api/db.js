const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bookstore",
    password: "",
    port: 5432,
})

pool.connect()
    .then(() => {
        console.log("Database status: Connected");
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

module.exports = pool;