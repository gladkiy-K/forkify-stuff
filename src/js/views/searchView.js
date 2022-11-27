class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    console.log(query); // pizza for instance
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    // Когда сабмитим форму сперва нужно Prevent default иначе страница перезагрузится
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // выполнить функцию которая задана как аргумент
    });
  }
}

export default new SearchView();
