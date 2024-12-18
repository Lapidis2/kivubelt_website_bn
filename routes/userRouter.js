const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/AuthUser');
const {

    signin_post,
    signup_post,
    get_user,
    get_all_user,
    update_user,
    delete_user,
    confirmEmail
} = require("../controller/userController");


router.get("/get-users", get_all_user);
router.put("/updateUser/:id", authMiddleware, update_user);
router.post("/signup", signup_post);
router.get("/get-user/:id", get_user);
router.post("/signin", signin_post);
router.put("/confirm/:token", confirmEmail);
router.delete("/deleteUser/:userId", delete_user)
module.exports = router;