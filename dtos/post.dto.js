module.exports = class PostDto {
  id;
  title;
  body;
  picture;
  createdAt;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.body = model.body;
    this.picture = model.picture;
    this.createdAt = model.createdAt;
  }
};
