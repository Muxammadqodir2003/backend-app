const postService = require("../service/post.service");

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await postService.getAll();
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newPost = await postService.create(
        req.body,
        req.files.picture,
        req.user.id
      );
      return res.json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedPost = await postService.delete(req.params.id);
      return res.json(deletedPost);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const updatePost = await postService.edit(body, params.id);
      return res.json(updatePost);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await postService.getOne(req.params.id);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
