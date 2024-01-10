// models/comic.js
const db = require('./db');

const comicSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    love: { type: Boolean, default: true },
    coverImage: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  {
    collection: 'Comic'
  }
);

const Comic = db.mongoose.model('Comic', comicSchema);

const listchapSchema = new db.mongoose.Schema(
  {
    comicId: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Comic' }, // Thêm mối quan hệ 
    chapNumber: { type: String, required: true },
    content: [{ type: String, required: true }]
  },
  {
    collection: 'ListChap'
  }
);

const ListChap = db.mongoose.model('ListChap', listchapSchema);

module.exports = { Comic, ListChap };
