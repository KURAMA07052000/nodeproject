const express = require('express');
const router = express.Router();
const controller = require('../controllers/webappController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

// router.get('/', function(req, res) {
//     res.redirect('/login.html');
// })
//  router.get('/registration', function(req, res) {
//      res.redirect('/registration.html');
//  })

router.get("/", controller.landing_page);

router.get("/about", controller.about_page);

router.get("/location", controller.location_page);

router.get('/login', controller.show_login);

router.post('/login', login, controller.handle_login);

router.get("/Registration", controller.show_register_page);

router.post('/Registration', controller.post_new_user);

router.get("/adminPage",verify, controller.loggedIn_landing);

router.get('/new',verify,controller.show_new_entries);

router.post('/new', verify, controller.post_new_entry);

router.get('/posts/:meal', controller.show_user_entries);

router.get("/logout", controller.logout);



router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

// router.use(function (err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send('Internal Server Error.');
// })
module.exports = router;