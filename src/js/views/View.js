import icons from 'url:../../img/icons.svg'; //Parcel 2

export default class View {
  _data;
  // public method

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false,create markup strings instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Создает как бы копию всего дома в памяти
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // choose all elems
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Обновление текста
      // Если не равен по значению узлов то...  на экране появятся только измененные элементы
      // Со вторым условие заменяется только то,что новое
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('!!!!!!!!!', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
        console.log(`Current element ${curEl}`);
      }

      // Обновление атрибутов
      if (!newEl.isEqualNode(curEl)) {
        console.log(newEl.attributes); // выведем все изменные атрибуты
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value) // устанавливает атрибуты типа disabled
        );
      }
    });
  }

  // To delete all the text we have, before we look for smth
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Spinner while rendering
  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
       <div>
         <svg>
           <use href="src/img/${icons}#icon-alert-triangle"></use>
         </svg>
       </div>
       <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
       <div>
         <svg>
           <use href="src/img/${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
