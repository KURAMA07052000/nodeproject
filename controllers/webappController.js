const webMenuDAO = require('../models/webappModel');
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