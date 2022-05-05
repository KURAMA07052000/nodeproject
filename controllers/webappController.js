const webMenuDAO = require('../models/webappModel');
const userDao = require("../models/userModel.js");
const db = new webMenuDAO();
db.init();

exports.landing_page = function (req, res) {
  db.getAllLunchEntries()
    .then((list) => {
      res.render("menuLunch", {
        title: "Lunch Menu",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });

};

exports.account_page = function (req, res) {

  res.render("account", {
    title: "Admin Account Page",
    user: "user"
  });
};

exports.dinner_menu_page = function (req, res) {
  db.getAllDinnerEntries()
    .then((list) => {
      res.render("menuDinner", {
        title: "Dinner Menu",
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

  res.render("account", {
    title: "Admin Page",
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
    res.status(401).send("cannot find user or password")
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
        title: "Admin page",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_new_entries = function (req, res) {
  res.render("newMeal", {
    title: "adminAddMeal",
    user: "user",
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.meal) {
    response.status(400).send("New meal must have a meal name.");
    return;
  }
  db.addEntry(req.body.meal, req.body.Ingredients, req.body.description, req.body.price, req.body.meal_time);
  res.redirect("adminPage")
};

exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("adminPage", {
        title: "Admin page",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_update_entry = function (req, res) {

   //   db.getOneEntry(req.body.id)
   //   .then((entries) => {
   //   res.render("UpdateMeal", {
   //     title: "Admin Update Meal",
   //     user: "user",
   //     entries: entries,
   //   });
   // })
   // .catch((err) => {
   //   console.log("Error: ");
   //   console.log(JSON.stringify(err));
   // });

   db.getAllEntries(req.body._id)
     .then((list) => {
       res.render("updateMeal", {
        title: "Update Meal",
         user: "user",
         entries: list,
       });
     })
     .catch((err) => {
      console.log("promise rejected", err);
     });
 };


exports.update_entry = function (req, res) {
  console.log(req.body._id, req.body.meal, req.body.Ingredients, req.body.description, req.body.price, req.body.meal_time);
  db.updateMealData(req.body._id, req.body.meal, req.body.Ingredients, req.body.description, req.body.price, req.body.meal_time);
  //db.getAllEntries()
  res.redirect("adminPage");
}

exports.delete_entry = function (req, res) {
  db.deleteMeal(req.body._id);
  db.getAllEntries()
  res.redirect("adminPage");
}

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};