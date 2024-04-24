const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const collection = require("./config");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists. Please choose different username.");
  } else {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (!check) {
      res.send("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("preloader");
    } else {
      res.send("Invalid password");
    }
  } catch (err) {
    res.send("Wrong details");
  }
});


app.get("/login/fourth1", function (req, res) {
  res.render("fourth1");
});
app.get("/login/login", function (req, res) {
  res.render("login");
});
app.get("/login/signup", function (req, res) {
  res.render("signup");
});
app.get("/login/about", function (req, res) {
  res.render("about");
});
app.get("/login/cart", function (req, res) {
  res.render("cart");
});
app.get("/login/contact", function (req, res) {
  res.render("contact");
});
app.get("/login/viewdetails1", function (req, res) {
  res.render("viewdetails1");
});
app.get("/login/viewdetails2", function (req, res) {
  res.render("viewdetails2");
});
app.get("/login/viewdetails3", function (req, res) {
  res.render("viewdetails3");
});
app.get("/login/viewdetails4", function (req, res) {
  res.render("viewdetails4");
});
app.get("/login/fifth", function (req, res) {
  res.render("fifth");
});
app.get("/login/payment", function (req, res) {
  res.render("payment");
});
app.get("/login/addproduct", function (req, res) {
    res.render("addproduct");
});
app.get('/home', function(req, res) {
  res.render('home');
});


const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
