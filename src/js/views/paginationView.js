import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

// сайдбар, все рецепты
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // querySelector ищет вниз по DOM а target.closest  ищет вверх
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //если пицца то 59/10 = 6

    // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
         <button data-goto="${
           currPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page4 ${currPage - 1}</span>
          </button>
      `;
    }
    // Other page
    if (currPage < numPages) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
         </button>
      `;
    }
    // Page 1 and there are no others
    return '';
  }
}

export default new PaginationView();
