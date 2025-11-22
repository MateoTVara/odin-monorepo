class Message {
  constructor(id, text, added, userId = null) {
    this.id = id;
    this.text = text;
    this.added = added;
    this.userId = userId;
  }
}

module.exports = Message;