export default class API {
  getSlides() {
    return fetch("data.json")
      .then((response) => response.json())
      .then((data) => data);
  }
}