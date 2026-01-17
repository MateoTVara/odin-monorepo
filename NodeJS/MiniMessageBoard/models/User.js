class User {
  #name;
  constructor(id, name, password, pic) {
    this.id = id;
    this.setName(name);
    this.password = password;
    this.pic = pic;
  }
  
  get name() { return this.#name; }

  setName(name) {
    this.#name = name;
  }
}

module.exports = User;