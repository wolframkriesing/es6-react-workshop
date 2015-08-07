export default class Kata {

  constructor(kata, group) {
    this.id = kata.id;
    this.name = kata.name;
    this.description = kata.description;
    this.path = kata.path;
    this.kataGroup = group;
    this.releaseDate = new Date(kata.publishDateUTC);
  }

  static fromRawKataData(rawKataData, kataGroup) {
    return new Kata(rawKataData, kataGroup);
  }
}
