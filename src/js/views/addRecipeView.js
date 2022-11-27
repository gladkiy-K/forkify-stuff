import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

// сайдбар, все рецепты
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // bind(this) ссылается на текущий объект, otherwise ссылка будет на родительский this._btnOpen.

  // _addHandlerShowWindow() {
  //   this._btnOpen.addEventListener('click', function () {
  //     this._overlay.classList.toggle('hidden');
  //     this._window.classList.toggle('hidden');
  //   });
  // }

  _addHandlerShowWindow() {
    // console.log(this.toggleWindow.bind(this)); // refer to itself
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //Наша Form это this потому что мы внутри addHandlerUpload() и контекст это this._parentElement
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); // Берет массив входов и конвертирует в объект
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView(); // без дефолта так не сделаешь

// undefined classList
// We are using 'this keyword' inside handler(this._btnOpen.addEventListener)
// 'This keyword' inside a handler function points on the element on which that listener is attached to
// in this case it is a this._btnOpen.addEventListener. we export whole function into another method
// then call the method with the correct 'this keyword'.
