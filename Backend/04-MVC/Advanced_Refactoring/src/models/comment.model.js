const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    //multiple users can comment one user post so that is why we also need the user id
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  { timestamps: true }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
