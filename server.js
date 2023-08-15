// create express server
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

// connect db
connectDb();
// create express app
const app = express();

// define port
const port = process.env.PORT || 5000;

// HTTP client (here, used Thunder client, install extension in vs code) or can use postman api testing
// app.get("/api/contacts", (req, res) => {
//   // res.send("Hello World!");
//   res.status(200).json({
//     message: "Get all contacts",
//   });
// });

// app.use Middleware
// Also express provides a middleware which provides parser for the JSON object which can get it from client side, which
// will help us to parse the data strea, that we receive from the client on the serve side.
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// listen on the app on the port 500
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
