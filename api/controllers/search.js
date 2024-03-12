const pool = require("../db");

const getSearch = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;

    if (searchQuery === "") {
      const q = `SELECT b.*, a.* FROM books b JOIN authors a ON b.author_id = a.author_id`;
      pool.query(q, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          return res.json(data.rows);
        }
      });
    } else {

const searchQ = `
  SELECT b.*, a.*
  FROM books b
  JOIN authors a ON b.author_id = a.author_id
  WHERE LOWER(b.book_title) LIKE LOWER($1)
     OR LOWER(a.author_name) LIKE LOWER($1)
`;
const searchValues = [`%${searchQuery}%`];

      pool.query(searchQ, searchValues, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          return res.json(data.rows);
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSearch,
};
