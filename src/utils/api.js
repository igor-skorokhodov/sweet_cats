export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCards() {
    //загрузили все карточки
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api({
  //создаем экземпляр класса API
  url: "https://api.thecatapi.com/v1/images/search?limit=10",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
