import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

// сайдбар, все рецепты
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // we dont act like this: previewView._generateMarkup()... потому что нужно this._data = data;
  _generateMarkup() {
    // Возвращает строку которая вставляется в render
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false)) // возвращает строку всей даты
      .join('');
  }
}

export default new BookmarksView(); // без дефолта так не сделаешь
