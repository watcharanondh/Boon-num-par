const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./models");
const app = express();
const logger = require("./middleware/logger");
const authorize = require("./middleware/authorize");

var http = require('http');

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;
const START_PART_WITH = process.env.START_PART_WITH || '';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Init MiddleWare
app.use(logger);

app.get(START_PART_WITH + "/", authorize, (req, res) => {
  res.send("Hello World");
});

/*---------------------- ADMIN ----------------------*/
/* Manage Admin */
app.use(START_PART_WITH + "/admin", require("./routes/admin/AdminManager"));
/*---------------------- STAFF ----------------------*/
/* Manage Staff */
app.use(START_PART_WITH + "/staff", require("./routes/staff/StaffManager"));

/*---------------------- SALE ----------------------*/
/* DashBoard Route */
app.use(START_PART_WITH + "/sale/dashboard", require("./routes/sales/Dashboard"));

/* Customers Route */
app.use(START_PART_WITH + "/sale/customers", require("./routes/sales/Customers"));
/* Quotations Route */
app.use(START_PART_WITH + "/sale/quotations", require("./routes/sales/Quotations"));


/* Equipment Route */
app.use(START_PART_WITH + "/sale/equipments", require("./routes/sales/Equipments"));
/* Packages Route */
app.use(START_PART_WITH + "/sale/packages", require("./routes/sales/Packages"));
/* Promotions Route */
app.use(START_PART_WITH + "/sale/promotions", require("./routes/sales/Promotions"));


/*---------------------- TEAM BNP ----------------------*/
/* Shipping Route */
app.use(START_PART_WITH + "/bnp/shipping", require("./routes/teamBNP/listShipping"));
/* CheckList Route */
app.use(START_PART_WITH + "/bnp/checklists", require("./routes/teamBNP/checklists"));
/* Survey Team Route */
app.use(START_PART_WITH + "/bnp/surveyteam", require("./routes/teamBNP/surveyTeam"));
/* Setup Team Route */
app.use(START_PART_WITH + "/bnp/setupteam", require("./routes/teamBNP/setupTeam"));
/* Progresses Route */
app.use(START_PART_WITH + "/bnp/progress", require("./routes/teamBNP/progresses"));
/* Team Manangement Route */
app.use(START_PART_WITH + "/bnp/teammanage", require("./routes/teamBNP/teamManagement"));

/*---------------------- TEAM HONG ----------------------*/
/* Shipping Route */
app.use(START_PART_WITH + "/hong/shipping", require("./routes/teamhong/listShipping"));
/* LineUpFood Team Route */
app.use(START_PART_WITH + "/hong/lineupfoodteam", require("./routes/teamhong/lineupFoodTeam"));
/* Progresses Route */
app.use(START_PART_WITH + "/hong/progress", require("./routes/teamhong/progresses"));
/* Team Manangement Route */
app.use(START_PART_WITH + "/hong/teammanage", require("./routes/teamhong/teamManagement"));
/* CheckList Route */
app.use(START_PART_WITH + "/hong/checklists", require("./routes/teamhong/checklists"));

/*---------------------- TEAM KITCHEN ----------------------*/
/* Shipping Route */
app.use(START_PART_WITH + "/kitchen/shipping", require("./routes/teamKitchen/listShipping"));

/*---------------------- DISTRICTS ----------------------*/
/* Districts Route */
app.use(START_PART_WITH + "/districts", require("./routes/districts/Districts"));


/*---------------------- USERS ----------------------*/
/* Users Route */
app.use(START_PART_WITH + "/users", require("./routes/users/Users"));


DB.sequelize.sync().then(() => {
  http.createServer(app).listen(PORT, err => {
    if (err) return console.log(`Cannot lisening at port: ${PORT}`);
    console.log(`Server listening on port: ${PORT}`);
  });
});
