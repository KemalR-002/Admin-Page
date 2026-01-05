const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Admin Purchase System Running");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});