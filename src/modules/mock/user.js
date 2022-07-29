export default class User {
  constructor({ name, id, profession }) {
    this.id = parseInt(id);
    this.name = name;
    this.profession = profession;
  }
}
