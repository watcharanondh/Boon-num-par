const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./models");
const app = express();
const logger = require("./middleware/logger");
const authorize = require("./middleware/authorize");

var http = require('http');
var https = require('https');
var fs = require('fs');

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5050;
const START_PART_WITH = process.env.START_PART_WITH || '';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Init MiddleWare
app.use(logger);

app.get(START_PART_WITH + "/", authorize, (req, res) => {
  res.send("Hello World");
});

/*-------------------- DashBoard --------------------*/
/* DashBoard Route */
app.use(START_PART_WITH + "/dashboard", require("./routes/Dashboard"));


/*---------------------- SALE ----------------------*/
/* Customers Route */
app.use(START_PART_WITH + "/customers", require("./routes/Customers"));
/* Quotations Route */
app.use(START_PART_WITH + "/quotations", require("./routes/Quotations"));
/* Districts Route */
app.use(START_PART_WITH + "/districts", require("./routes/Districts"));


/*---------------------- ADMIN ----------------------*/
/* Equipment Route */
app.use(START_PART_WITH + "/equipments", require("./routes/Equipments"));
/* EquipmentSet Route */
app.use(START_PART_WITH + "/equipmentsets", require("./routes/EquipmentSets"));
/* Packages Route */
app.use(START_PART_WITH + "/packages", require("./routes/Packages"));
/* Promotions Route */
app.use(START_PART_WITH + "/promotions", require("./routes/Promotions"));
/* Users Route */
app.use(START_PART_WITH + "/users", require("./routes/Users"));


DB.sequelize.sync().then(() => {
  http.createServer(app).listen(PORT, err => {
    if (err) return console.log(`Cannot lisening at port: ${PORT}`);
    console.log(`Server listening on port: ${PORT}`);
  });
});
