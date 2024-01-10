// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller');

// GET: Lấy danh sách bình luận theo ID truyện
router.get('/',commentController.getCommentsByComicId);

// POST: Gửi bình luận
router.post('/add', commentController.createComment);

module.exports = router;