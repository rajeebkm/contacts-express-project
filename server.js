// create express server
const express = require("express");
const dotenv = require("dotenv").config();

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

app.use("/api/contacts", require("./routes/contactRoutes"));

// listen on the app on the port 500
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
