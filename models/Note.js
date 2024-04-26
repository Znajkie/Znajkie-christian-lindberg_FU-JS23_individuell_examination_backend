class Note {
  constructor(userId, id, title, text, createdAt, modifiedAt) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}

module.exports = Note;
