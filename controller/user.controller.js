// controllers/userController.js
const User = require('../models/user');
// // Đăng ký tài khoản
exports.register = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      username,
      password,
      email,
      fullname,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Kiểm tra mật khẩu
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  let list = await User.User.find();
  res.json(list);
};

// Lấy thông tin một người dùng
exports.getUserById = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Thêm một người dùng mới
exports.createUser = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  try {
    const newUser = new User.User({ username, password, email, fullname });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  if (req.method == 'PUT') {
    try {
      const { id, username, password, email, fullname } = req.body;

      const updatedUser = await User.User.findByIdAndUpdate(id, { username, password, email, fullname }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Xóa một người dùng
exports.deleteUser = async (req, res) => {
  if (req.method == 'DELETE') {
    try {
      const { id } = req.body;

      const deletedUser = await User.User.findByIdAndRemove(id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({tt: "đã xóa"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};