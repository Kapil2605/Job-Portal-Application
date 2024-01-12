const express = require("express");
const {
  currentUserController,
  updateUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, currentUserController);

// UPDATE USER || PUT
router.put("/update-user", authMiddleware, updateUserController);

module.exports = router;
