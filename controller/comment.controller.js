// controllers/commentController.js
const Comment = require('../models/comment');

// GET: Lấy danh sách bình luận theo ID truyện
const getCommentsByComicId = async (req, res) => {
  const comicId = req.body;
  try {
    const comments = await Comment.find({ comicId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST: Gửi bình luận
const createComment = async (req, res) => {
  const { comicId, userId, content } = req.body;
  // const currentDate = new Date(); // Lấy ngày giờ hiện tại
  const comment = new Comment({
    comicId,
    userId,
    content,
    // createdAt: currentDate, // Thêm trường createdAt với giá trị là ngày giờ hiện tại
  });
  try {
    await comment.save();
    res.json(comment);
   
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCommentsByComicId,
  createComment
};