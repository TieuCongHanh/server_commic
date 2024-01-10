// controllers/commentController.js
const Comment = require('../../models/comment');
var sock = require('../../Socket_server');
// GET: Lấy danh sách bình luận theo ID truyện
exports.getCommentsByComicId = async (req, res) => {
  try {
    const comments = await Comment.find({comicId : req.query.comicId}  );
    if(comments){
    res.json(comments);
    }else {
       res.status(404).json({ error: 'truyện không tồn tại' });
      }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getallComment = async (req, res) => {
    try {
      const comments = await Comment.find( );
      if(comments){
      res.json(comments);
      }else {
          res.status(404).json({ error: 'truyện không tồn tại' });
        }
  
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// POST: Gửi bình luận
exports.createComment = async (req, res) => {
  const { comicId, userId, content } = req.body;
  // const currentDate = new Date(); // Lấy ngày giờ hiện tại
  const comment = new Comment({
    comicId,
    userId,
    content
    // createdAt: currentDate, // Thêm trường createdAt với giá trị là ngày giờ hiện tại
  });
  try {

    await comment.save();
    sock.io.emit("new msg", "Ban vua binh luan");
   
    res.json(comment);
   
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateComment = async (req, res) => {
  const { commentId } = req.params; 
  const { userId, content } = req.body;
  try {
    const comment = await Comment.findById(commentId );

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Kiểm tra xem người dùng có quyền sửa comment hay không
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ error: 'You do not have permission to update this comment' });
    }
    comment.content = content; // Cập nhật nội dung comment mới
    await comment.save();
    res.status(200).json(comment);
  
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByIdAndRemove(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Không tìm thấy bình luận' });
    }


    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};



