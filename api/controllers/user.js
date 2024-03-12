const pool = require("../db");

const getUser = async (req, res) => {
    const q = `SELECT * FROM users WHERE users.user_id = ($1)`;

    try {
        const data = await pool.query(q, [req.params.id]);
        return res.json(data.rows);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const addWishlist = async (req, res) => {

    const q = `
        INSERT INTO wishlist (user_id, book_id)
        VALUES ($1, $2)`;

    try {
        await pool.query(q, [req.body.userid, req.body.bookid]);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getWishtList = async (req, res) => {
    const q = `SELECT w.*, b.* from wishlist w JOIN books b on w.book_id = b.book_id WHERE w.user_id = ($1)`;
    try {
        const results = await pool.query(q, [req.params.id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteWishlist = async (req, res) => {
    const q = `DELETE FROM wishlist WHERE user_id = $1 AND book_id = $2`;
    console.log(req.params);
    try {
        await pool.query(q, [req.params.userid, req.params.bookid]);
        res.status(200).json("Book Successfully deleted from wishlist");
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getUser,
    addWishlist,
    getWishtList,
    deleteWishlist
};
