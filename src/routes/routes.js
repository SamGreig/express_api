const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.get("/collection", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/collection", async (req, res) => {
  try {
    const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
    await post.save();
    res.send(post); 
  } catch {
    res.status(400);
    res.send({ error: "400 Bad Request"})
  }
});

router.get("/collection/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Collection doesn't exist!" });
  }
});

router.patch("/collection/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Collection doesn't exist!" });
  }
});

router.delete("/collection/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Collection doesn't exist!" });
  }
});

module.exports = router;