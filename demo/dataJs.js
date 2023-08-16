const data = require("./data");
const express = require("express");

const routers = express.Router();

routers.get('/', (req, res) => {
    res.status(200).json(data);
});

module.exports = routers;