// models/comment.js
const db = require('./db');

const commentSchema = new db.mongoose.Schema({
  comicId: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Comic', required: true },
  userId: { type: db.mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}
,
{
  collection:'Comment'
});

const Comment = db.mongoose.model('Comment', commentSchema);

module.exports = Comment;