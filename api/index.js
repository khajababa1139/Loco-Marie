const express = require('express');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const deliveryRoutes = require('./routes/deliveries');
const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/searches');
const authorRoutes = require('./routes/authors');

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/authors", authorRoutes);

app.listen(2000, () => {
    console.log("Api status: Connected");
})
