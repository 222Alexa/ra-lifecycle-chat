export default class Storage {
  getUser() {
    return JSON.parse(localStorage.getItem("user")) || [];
  }

  save(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
}
