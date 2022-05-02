const webMenuDAO = require('../models/webappModel');
const userDao = require("../models/userModel.js");
const db = new webMenuDAO();
db.init();

exports.landing_page = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("menu", {
        title: "Menu",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
    
};

exports.about_page = function (req, res) {
  res.render("about", { 
  title: "About",
});
};

exports.location_page = function (req, res) {
  res.render("location", { 
  title: "Location",
});
};

exports.show_login = function (req, res) {
  res.render("user/Login");
};

exports.handle_login = function (req, res) {
  // res.redirect("/new");
  res.render("newEntry", {
    title: "WebApp",
    user: "user"
  });
};

exports.show_register_page = function (req, res) {
  res.render("user/Registration");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("adminPage", {
        title: "Admin",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};