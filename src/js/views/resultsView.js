import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

// сайдбар, все рецепты
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!';
  _message = '';

  // Шаблон в ПревьюВью
  // we dont act like this: previewView._generateMarkup()... потому что нужно this._data = data;
  _generateMarkup() {
    // Возвращает строку которая вставляется в render
    return this._data
      .map(result => previewView.render(result, false)) // возвращает строку всей даты
      .join('');
  }
}

export default new ResultsView(); // без дефолта так не сделаешь
