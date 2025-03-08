const express = require("express");
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const email = body("email").isEmail();
const password = body("password").isLength({ min: 3, max: 30 });

router.post("/register", email, password, authController.register);
router.get("/activation/:id", authController.activation);
router.post("/login", email, password, authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/get-users", authMiddleware, authController.getUsers);
router.post("/forgot-password", authController.forgotPassword);
router.put("/recovery-account", authController.recoveryAccount);

module.exports = router;
