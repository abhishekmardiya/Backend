const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

//its convert json body to javascript object while posting the data
app.use(express.json());

//connect mongoose with mongoDB
const connect = () => {
  return mongoose.connect(
    'mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/express-relationship'
  );
};

//starting the server
app.listen(3000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
  console.log('listening on port 3000');
});

//USER SCHEMA
//creating a schema(step 1)
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  //versionkey will not added (like "__v": 0 is not added in documents)
  { timestamps: true, versionKey: false }
);

//creating a model(step 2)
const User = mongoose.model('user', userSchema); //"users" colllection will automatically ceated when you write "user"(it automatically converts to plural)

//POST SCHEMA
//creating a schema(step 1)
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    //id from user Schema
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);

//creating a model(step 2)
const Post = mongoose.model('post', postSchema);

//COMMENT SCHEMA
//creating a schema(step 1)
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

//creating a model(step 2)
const Comment = mongoose.model('comment', commentSchema);

//CRUD for users(browser url:http://localhost:3000/users)

//read
app.get('/users', async (req, res) => {
  try {
    //plural(its just a standard convention because there will be lot of user)
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
});
//getting a single user
app.get('/users/:id', async (req, res) => {
  try {
    // console.log(req.params);
    //singular
    const user = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
app.post('/users', async (req, res) => {
  try {
    //singular
    const user = await User.create(req.body).lean().exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//CRUD for posts(browser url:http://localhost:3000/posts)

//read
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().lean().exec();

    return res.status(200).send({ posts: posts });
  } catch (err) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
});
//getting a single post
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();

    return res.status(200).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
app.post('/posts', async (req, res) => {
  try {
    //singular
    const post = await Post.create(req.body).lean().exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
app.patch('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//CRUD for comments(browser url:http://localhost:3000/comments)

//read
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().lean().exec();

    return res.status(200).send({ comments: comments });
  } catch (err) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
});
//getting a single post
app.get('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean().exec();

    return res.status(200).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
app.post('/comments', async (req, res) => {
  try {
    //singular
    const comment = await Comment.create(req.body).lean().exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
app.patch('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
app.delete('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
