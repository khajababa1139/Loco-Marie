const pool = require("../db");

const getBooks = async (req, res) => {
    try {
        let results;
        if(req.query.orderBy === "priceHighToLow") {
            let q = req.query.cat
            ? 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id WHERE b.book_genre = $1 ORDER BY book_price DESC;'
            : 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id ORDER BY book_price DESC;';

            if(req.query.cat) {
                results = await pool.query(q, [req.query.cat]);
            }
            else results = await pool.query(q);
        }

        else if(req.query.orderBy === "priceLowToHigh") {

            let q = req.query.cat
            ? 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id WHERE b.book_genre = $1 ORDER BY book_price ASC;'
            : 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id ORDER BY book_price ASC;';

            if(req.query.cat) {
                results = await pool.query(q, [req.query.cat]);
            }
            else results = await pool.query(q);
        }

        else if(req.query.orderBy === "ratingLowToHigh") {
            
            let q = req.query.cat
            ? 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id WHERE b.book_genre = $1 ORDER BY book_rating ASC;'
            : 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id ORDER BY book_rating ASC;';

            if(req.query.cat) {
                results = await pool.query(q, [req.query.cat]);
            }
            else results = await pool.query(q);
        }

        else if(req.query.orderBy === "ratingHighToLow") {
            
            let q = req.query.cat
            ? 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id WHERE b.book_genre = $1 ORDER BY book_rating DESC;'
            : 'SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id ORDER BY book_rating DESC;';

            if(req.query.cat) {
                results = await pool.query(q, [req.query.cat]);
            }
            else results = await pool.query(q);
        }
        
        if(results.rows.length)
            res.status(200).json(results.rows);
        else    
            res.status(404).json("No books in database.");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getBook = async (req, res) => {
    try {
        const q = "SELECT b.*, a.author_name FROM books b JOIN authors a ON b.author_id = a.author_id WHERE b.book_id = $1";
        let results = await pool.query(q, [req.params.id]);
        if(results.rows.length)
            res.json(results.rows);
        else
            res.status(404).json("Content not found.")
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addBook = async (req, res) => {
    const values = [
        req.body.title,
        req.body.author,
        req.body.isbn,
        req.body.price,
        req.body.rating,
        req.body.quantity,
        req.body.genre,
        req.body.image
    ];

    try {
        const q = `SELECT * FROM addBook($1, $2, $3, $4, $5, $6, $7, $8)`;

        const results = await pool.query(q, values);
        res.status(200).json("Successfully added book.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const q = "DELETE FROM books WHERE book_id = ($1)";
        pool.query(q, [req.params.id], (err, data) => {
            if(err) 
                return res.json(err);
            else 
                return res.json("Successfull deleted book.");
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateBook = async (req, res) => {
   
    const q = `SELECT * FROM updateBook($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    const values = [
        req.params.id,
        req.body.book_title,
        req.body.author_name,
        req.body.book_isbn,
        req.body.book_price,
        req.body.book_rating,
        req.body.book_quantity,
        req.body.book_genre,
        req.body.book_img
    ];

    try {
        
        const results = await pool.query(q, values);
        return res.json(results.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getReviews = async (req, res) => {
    res.json("Hoise");
}

const addReview = async (req, res) => {
    res.json("add rev");
}

const editReview = async (req, res) => {
    res.json("add rev");
}

const deleteReview = async (req, res) => {
    res.json("add rev");
}

module.exports = {
    getBook,
    getBooks,
    addBook,
    deleteBook,
    updateBook,
    getReviews,
    addReview,
    editReview,
    deleteReview
}