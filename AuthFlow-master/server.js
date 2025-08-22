const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser")
const connectDB = require('./src/config/db');
const path = require("path");

const app = express();
app.use(express.json);
app.use(cookieParser)
app.use(session({
  secret: 'Putkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
  }
}));

app.use(express.static(path.join(__dirname,"public")))


const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
