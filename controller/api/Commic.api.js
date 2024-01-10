// controllers/comicController.js
const Comic = require('../../models/comic');
var sock = require('../../Socket_server');

// GET: Lấy danh sách truyện
exports.getAllComics = async (req, res) => {
  try {
    const comics = await Comic.Comic.find();
    if(comics){
      return res.status(200).json(
          comics  
      );
  }else{
      return res.status(204).json( 'không có dữ liệu');
  }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Lấy danh sách truyện
exports.timkiem = async (req, res) => {
  try {
    const keyword = req.query.keyword; // Lấy từ khóa tìm kiếm từ query parameters
    let comics;

    if (keyword) {
      // Nếu có từ khóa tìm kiếm, thực hiện tìm kiếm truyện dựa trên từ khóa
      comics = await Comic.Comic.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } }, // Tìm kiếm theo tiêu đề
          { author: { $regex: keyword, $options: 'i' } }, // Tìm kiếm theo tác giả
        ],
      });
    } else {
      // Nếu không có từ khóa tìm kiếm, lấy toàn bộ danh sách truyện
      comics = await Comic.Comic.find();
    }

    if (comics.length > 0) {
      return res.status(200).json(comics);
    } else {
      return res.status(204).json('không có dữ liệu');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// POST: Thêm truyện
exports.createComic = async (req, res) => {
  const { name, description, author, year, coverImage, images } = req.body;

  try {
    const newComic = new Comic.Comic({
      name,
      description,
      author,
      year,
      love: false, 
      coverImage,
      images,
    });

    await newComic.save();
    res.status(201).json(newComic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT: Sửa truyện
exports.updateComic = async (req, res) => {
  const { name, description, author, year, coverImage, images } = req.body;

  try {
    // Truy vấn truyện gốc để lấy giá trị "love" ban đầu
    const originalComic = await Comic.Comic.findById(req.query._id);

    if (!originalComic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    // Sử dụng giá trị "love" ban đầu trong câu truy vấn cập nhật
    const updatedComic = await Comic.Comic.findByIdAndUpdate(
      { _id: req.query._id },
      {
        name,
        description,
        author,
        year,
        love: originalComic.love, // Sử dụng giá trị "love" ban đầu
        coverImage,
        images: images,
      },
      { new: true }
    );

    if (!updatedComic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    res.json(updatedComic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// PUT: Thay đổi thuộc tính "love" của truyện
exports.toggleLoveComic = async (req, res) => {
  try {
    const comicId = req.params.id; // Lấy ID của truyện từ request params
    const comic = await Comic.Comic.findById(comicId); // Tìm truyện dựa trên ID

    if (!comic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    // Đảo ngược giá trị "love"
    comic.love = !comic.love;
    await comic.save(); // Lưu trạng thái mới

    res.json({ message: 'Love status toggled successfully', love: comic.love });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// DELETE: Xóa truyện
exports.deleteComic = async (req, res) => {
 
  try {
    const deletedComic = await Comic.Comic.findByIdAndRemove({_id:req.query._id});
    if (!deletedComic) {
      return res.status(404).json({ error: 'Comic not found' });
    }
    res.json({tt : 'xóa thành công'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST: Thêm tập mới cho truyện
exports.createChapter = async (req, res) => {
  const { comicId, chapNumber, content } = req.body;

  try {
    const comic = await Comic.Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    const newChapter = new Comic.ListChap({
      comicId: comicId,
      chapNumber,
      content,
    });

    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Xem danh sách tập của truyện
exports.getChaptersByComicId = async (req, res) => {

  try {
    const chapters = await Comic.ListChap.find({ comicId: req.query.comicId });
    if (chapters && chapters.length > 0) {
      res.json(chapters);
    } else {
      res.status(404).json({ error: 'Không có chapter nào cho comicId này' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};


