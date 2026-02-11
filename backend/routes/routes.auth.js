const express = require("express");
const router = express.Router();

// controller
const { signup, login, userInfo } = require("../controller/controller.auth.js");
// middleware
const auth = require("../middleware/middle.auth.js");

// auth routes
router.post("/signup", signup);
router.post("/login", login);

// protected routes
router.get("/dashboard", auth, userInfo);



module.exports = router;

// get is retrieve data
// post is create data
// put is update data
// delete is delete data
