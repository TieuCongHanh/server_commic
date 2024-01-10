// routes/comicRoutes.js
const express = require('express');
const router = express.Router();
const comicController = require('../controller/comic.controller');

// GET: Xem nội dung của một chap của truyện
router.get('/comics/:comicId/list/:chapterId', comicController.readChapter);
// GET: Xem danh sách các tập của truyện
router.get('/comics/:comicId/list', comicController.getChaptersByComicId);

// POST: Thêm một tập mới cho truyện
router.post('/comics/add', comicController.createChapter);


// GET: Lấy danh sách truyện
router.get('/', comicController.getAllComics);

// GET: Xem chi tiết truyện
router.get('/:id', comicController.getComicById);

// Đọc truyện
router.get('/:id/read', comicController.readComic);

// POST: Thêm truyện
router.post('/add', comicController.createComic);

// PUT: Sửa truyện
router.put('/edit', comicController.updateComic);

// DELETE: Xóa truyện
router.delete('/delete', comicController.deleteComic);

module.exports = router;