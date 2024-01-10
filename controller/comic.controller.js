const Comic = require('../models/comic');

// GET: Lấy danh sách truyện
exports.getAllComics = async (req, res) => {
  try {
    const comics = await Comic.Comic.find();
    res.json(comics);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Xem chi tiết truyện
exports.getComicById = async (req, res) => {
  const comicId = req.params.id;
  try {
    const comic = await Comic.Comic.findById(comicId);
    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ error: 'Truyện không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Xem danh sách tập của truyện
exports.getChaptersByComicId = async (req, res) => {
  const comicId = req.params.id;
  try {
    const chapters = await Comic.ListChap.find({ comic: comicId });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Đọc truyện
exports.readComic = async (req, res) => {
  try {
    const comic = await Comic.Comic.findById(req.params.id);
    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }
    // Do something to read the comic
    res.json({ message: 'Reading comic' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
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

// POST: Thêm tập mới cho truyện
exports.createChapter = async (req, res) => {
  const { comicId, chapNumber, content } = req.body;

  try {
    const comic = await Comic.Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    const newChapter = new Comic.ListChap({
       comicId,
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
// GET: Xem nội dung của một chap của truyện
exports.readChapter = async (req, res) => {
  const chapterId = req.params.chapterId;
  
  try {
    const chapter = await Comic.ListChap.findById(chapterId);
    
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    
    // Trả về nội dung của chap
    res.json({ content: chapter.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// PUT: Sửa truyện
exports.updateComic = async (req, res) => {
  const { id, name, description, author, year, coverImage, images } = req.body;

  try {
    const updatedComic = await Comic.Comic.findByIdAndUpdate(
      id,
      {
        name,
        description,
        author,
        year,
        coverImage,
        images,
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

// DELETE: Xóa truyện
exports.deleteComic = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedComic = await Comic.Comic.findByIdAndRemove(id);
    if (!deletedComic) {
      return res.status(404).json({ error: 'Comic not found' });
    }
    res.json({ tt: 'xóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
