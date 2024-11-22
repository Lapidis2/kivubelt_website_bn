const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/AuthUser');
const {

    signin_post,
    signup_post,
    get_user,
    get_all_user,
    update_user,
    delete_user
} = require("../controller/userController");

// Signup routes
router.get("/get-users", get_all_user);
router.put("/updateUser/:id", authMiddleware, update_user);
router.post("/signup", signup_post); // Corrected from /sigup to /signup

// Signin routes
router.get("/get-user/:id", get_user);
router.post("/signin", signin_post);

router.delete("/deleteUser/:userId", delete_user)
module.exports = router;