const md = require('../../models/user');
var sock = require('../../Socket_server');


exports.register = async (req, res, next) => {
    console.log(req.body);

    try {
        const existingUser = await md.User.findOne({ username: req.body.username });
        if (existingUser) {
            console.log("Tài khoản đã tồn tại");
            sock.io.emit("new msg", "Tài khoản đã tồn tại");
        } else {
            const newUser = new md.User(req.body);

            // Kiểm tra điều kiện nhập
            const { username, password, email, fullname } = req.body;

            // Kiểm tra username có ít nhất 6 kí tự
            if (username.length < 6) {
                return res.status(500).json({ msg: "Username phải có ít nhất 6 kí tự" });
            }

            // Kiểm tra password có ít nhất 6 kí tự, 1 chữ hoa và 1 kí tự đặc biệt
            if (password.length < 6 || !password.match(/.*[A-Z].*/) || !password.match(/.*[@#$%^&+=].*/)) {
                return res.status(500).json({ msg: "Password phải có ít nhất 6 kí tự, 1 chữ hoa và 1 kí tự đặc biệt" });
            }

            // Kiểm tra định dạng email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+$/;
            if (!emailPattern.test(email)) {
                return res.status(500).json({ msg: "Email không đúng định dạng" });
            }

            await newUser.save();
            sock.io.emit("new msg", "Ban vua dang ky thanh cong");
            console.log("Đăng kí thành công");

            // Gửi sự kiện socket thông báo về việc đăng ký thành công
           // io.emit('notifyRegister', { username: req.body.username });

            //return res.status(200).json({ msg: "Đăng kí thành công" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
exports.list= async (req,res,next)=>{
    try {
        let listUser= await md.User.find();
        if(listUser){
            return res.status(200).json(
                {
                    msg:'lấy dữ liệu thành công',
                    data: listUser
                }
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'không có dữ liệu'
                }
            );
        }
    } catch (error) {
        return res.status(error.status)
                .json({
                    msg:error.message

                });
    }
}
exports.login = async (req, res, next) => {
    console.log(req.body);
  
    try {
      const user = await md.User.findOne({
        username: req.body.username,
        password: req.body.password,
      });
  
      if (!user) {
        console.log("Không tồn tại tài khoản");
        return res.status(401).json({ msg: "sai thông tin đăng nhập" });
      } else {
        console.log("Đăng nhập thành công");
        return res.status(200).json({
         
          username: user.username,
          password: user.password,
          userId: user._id,
          fullname: user.fullname,
          email: user.email
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Sai tài khoản hoặc mật khẩu" });
    }
  };
exports.updateUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const updatedUser = await md.User.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!updatedUser) {
            console.log("Người dùng không tồn tại");
            return res.status(404).json({ msg: "Người dùng không tồn tại" });
        }
        console.log("Cập nhật thành công");
        return res.status(200).json({ msg: "Cập nhật thành công", user: updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
exports.deleteUser = async (req, res, next) => {
    

    try {
        const deletedUser = await md.User.findByIdAndDelete( req.body.id);
        
        if (!deletedUser) {
            console.log("Người dùng không tồn tại");
            return res.status(404).json({ msg: "Người dùng không tồn tại" });
        }

        console.log("Xóa thành công");
        return res.status(200).json({ msg: "Xóa thành công", user: deletedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
exports.changepassword = async(req,res,next) =>{
    const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await md.User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Kiểm tra mật khẩu cũ
    if (oldPassword !== user.password) {
      return res.status(400).json({ success: false, message: 'mật khẩu cũ không đúng' });
    }
    

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    await user.save();

    return res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
}

