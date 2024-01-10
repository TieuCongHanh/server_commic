var express = require('express');
var router = express.Router();

var user_api=require('../controller/api/User.api');
const comicController = require('../controller/api/Commic.api');
const commentController = require('../controller/api/Comment.api');

router.get('/comics/list', comicController.getChaptersByComicId);
// POST: Thêm một tập mới cho truyện
router.post('/comics/add', comicController.createChapter);


router.get('/comment/list',commentController.getallComment);
// GET: Lấy danh sách bình luận theo ID truyện
router.get('/comment',commentController.getCommentsByComicId);
// POST: Gửi bình luận
router.post('/comment/add', commentController.createComment);
router.put('/comment/edit/:commentId', commentController.updateComment);
router.delete('/comment/delete/:commentId', commentController.deleteComment);

// GET: Lấy danh sách truyện
router.get('/commic/list', comicController.getAllComics);
// thay đổi thuộc tính love
router.put('/commic/:id/toggleLove', comicController.toggleLoveComic);
// tìm kiếm
router.get('/timkiem', comicController.timkiem);

// POST: Thêm truyện
router.post('/commic/add', comicController.createComic);
// PUT: Sửa truyện
router.put('/commic/edit', comicController.updateComic);
// DELETE: Xóa truyện
router.delete('/commic/delete', comicController.deleteComic);
 

router.get('/user/list',user_api.list);
router.post('/user/login',user_api.login);
router.post('/user/dk',user_api.register);
router.put('/user/edit',user_api.updateUser);
router.delete('/user/delete',user_api.deleteUser);
router.put('/user/doimk',user_api.changepassword);






module.exports = router;