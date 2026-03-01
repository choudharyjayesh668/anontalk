const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    createGroup,
    getGroups,
    searchGroups,
    joinGroup,
    sendMessage,
    getMessages,
    deleteGroup,
} = require("../controllers/groupController");

/* ===== GROUPS ===== */

router.post("/", auth, createGroup);
router.get("/", auth, getGroups);
router.get("/search", auth, searchGroups);
router.post("/:id/join", auth, joinGroup);
router.delete("/:id", auth, deleteGroup);

/* ===== MESSAGES ===== */

router.post("/:groupId/messages", auth, sendMessage);
router.get("/:groupId/messages", auth, getMessages);

module.exports = router;