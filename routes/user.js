// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// POST: Đăng ký tài khoản
router.post('/register', userController.register);

// POST: Đăng nhập
router.post('/login', userController.login);
// Định tuyến cho API lấy tất cả người dùng
router.get('/getall', userController.getAllUsers);

// Định tuyến cho API lấy thông tin một người dùng
router.get('/getone/:id', userController.getUserById);

// Định tuyến cho API thêm người dùng
router.post('/add', userController.createUser);

// Định tuyến cho API cập nhật thông tin người dùng
router.put('/edit', userController.updateUser);

// Định tuyến cho API xóa người dùng
router.delete('/delete', userController.deleteUser);

module.exports = router;