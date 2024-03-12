const pool = require("../db");

const getOrder = async (req, res) => {

    const q = 
            `SELECT *
            FROM orders
            JOIN orderdetails ON orders.order_id = orderdetails.order_id
            JOIN books ON orderdetails.book_id = books.book_id
            JOIN authors ON books.author_id = authors.author_id 
            WHERE orders.user_id = $1;
            `;

    await pool.query(q, [req.params.id], (err, data) => {
        if(err)
            return res.status(500).json("Internal Server Error");
        else
            return res.json(data.rows);
    })
}

const addOrder = async (req, res) => {
    
    const values = [
        req.body.userid,
        req.body.bookid,
        req.body.price
    ];
    const q = "SELECT create_order($1, $2, $3) AS new_order";

    const results = await pool.query(q, values, (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        else {
            return res.json(data.rows);
        }   
    });

}

const deleteOrder = async (req, res) => {

    const q = `SELECT delete_order($1)`;

    await pool.query(q, [req.params.id], (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
        }
        else 
            return res.status(200).json("Deleted order");
    })
}

const confirmOrder = async (req, res) => {
    
    const q = 
    `SELECT confirm_order($1)`;

    await pool.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err);
        else 
            return res.json("Order confirmed!");
    })

}   

module.exports = {
    getOrder,
    addOrder,
    deleteOrder,
    confirmOrder
}
