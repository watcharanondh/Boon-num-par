const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./models");
const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

/*-------------------- DashBoard --------------------*/
/* DashBoard Route */
app.use("/dashboard", require("./routes/Dashboard"));


/*---------------------- SALE ----------------------*/
/* Customers Route */
app.use("/customers", require("./routes/Customers"));
/* Quotations Route */
app.use("/quotations", require("./routes/Quotations"));
/* Districts Route */
app.use("/districts", require("./routes/Districts"));


/*---------------------- ADMIN ----------------------*/
/* Equipment Route */
app.use("/equipments", require("./routes/Equipments"));
/* Packages Route */
app.use("/packages", require("./routes/Packages"));
/* Users Route */
app.use("/users", require("./routes/Users"));


DB.sequelize.sync().then(() => {
  app.listen(PORT, err => {
    if (err) return console.log(`Cannot lisening at port: ${PORT}`);
    console.log(`Server listening on port: ${PORT}`);
  });
});
