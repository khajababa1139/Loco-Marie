const pool = require("../db");

const getAuthors = async (req, res) => {

    const q = 'SELECT a.author_id, a.author_name FROM authors a';

    try {
        const results = await pool.query(q, (err, data) => {
            return res.json(data.rows);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAuthors
}