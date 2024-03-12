const pool = require("../db");

const getDelivery = async (req, res) => {
  const q = `SELECT o.*, d.*
                FROM orders o
                JOIN delivery d ON o.order_delivery_id = d.delivery_id`;

  try {
    let results = await pool.query(q);
    results = results.rows;

    let filteredResults = results.filter((result) => {
      if (
        result.delivery_man_id == req.params.id &&
        result.delivery_status === 0
      ) {
        return result;
      }
    });

    if (filteredResults.length === 0) {
      filteredResults = results.filter((result) => {
        if (result.delivery_man_id === null) {
          return result;
        }
      });
    }

    return res.json(filteredResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const acceptDelivery = async (req, res) => {
  // req.body

  const q = `UPDATE delivery SET delivery_man_id = ($1) WHERE delivery_id = ($2);`;
  await pool.query(q, [req.body[0], req.body[1]], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data.rows);
    }
  });
};

const confirmDelivery = async (req, res) => {
  const q = `SELECT confirm_delivery($1)`;
  await pool.query(q, [req.body[1]], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data.rows);
    }
  });
};

const declineDelivery = async (req, res) => {
  const q = `UPDATE delivery SET delivery_man_id = null WHERE delivery_id = ($1)`;
  await pool.query(q, [req.body[1]], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data.rows);
    }
  });
};

module.exports = {
  getDelivery,
  confirmDelivery,
  declineDelivery,
  acceptDelivery,
};
