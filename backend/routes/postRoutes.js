const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  likePost,
  addComment,
  likeComment,
  deletePost,
} = require("../controllers/postController");

router.post("/posts", auth, createPost);
router.get("/posts", auth, getPosts);
router.put("/posts/:id/like", auth, likePost);
router.post("/posts/:id/comment", auth, addComment);
router.put("/posts/:postId/comment/:commentId/like", auth, likeComment);
router.delete("/posts/:id", auth, deletePost);

module.exports = router;