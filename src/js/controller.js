import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeVeiw.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; // For Polifiling everything else
import 'regenerator-runtime/runtime'; // For Polifiling Async/await
import { async } from 'regenerator-runtime';

// Синтаксис парсела, не js
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    // Getting hash from the url bar
    const id = window.location.hash.slice(1); // sice 1 simbol make new copy Получаем хэш

    if (!id) return;
    recipeView.renderSpinner(); // постоянно вращается потому что выполняется не ассинхронно

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe АССИНХРОННАЯ ФУНКЦИЯ ВСЕГДА ВОЗВРАЩАЕТ Promise!! thats why await
    await model.loadRecipe(id); // this func return nothing so
    // const { recipe } = model.state;

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);

    // const recipeVeiw = new recipeView(model.state.recipe); // same way as above one
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) render NEW the initial pagination buttons
  paginationView.render(model.state.search); // _data render функция View наследованная paginationView
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe veiw
  // recipeView.render(model.state.recipe); // reload the page
  recipeView.update(model.state.recipe); // updates text and attributes in the DOM
};

const controlAddBookmark = function () {
  // 1) Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Remove bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controllBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spiner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Redner recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render Boookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back() // go to the last page

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

//SubPub model  ВОТ ЭТИ ЕБАЛЫ ВОЗВРАЩАЮТ ПРОМИС БЕЗ ДАННЫХ
// если фуллфиллд тогда лодистя страница
function init() {
  bookmarksView.addHandlerRender(controllBookmarks);
  recipeView.addHandlerRender(controlRecipe); // Main information of a recipe
  recipeView.addHandlerUpdateServings(controlServings); // Partly change info on the page
  recipeView.addHandlerAddBookmark(controlAddBookmark); //
  searchView.addHandlerSearch(controlSearchResults); // Sidebar which contains all the recipies
  paginationView.addHandlerClick(controlPagination); // Counting and putting pages onto the main page
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Hello');
}
init();

// const clearBookmarks = function () {
//   localStorage.clear('bookmarks');
// };
// clearBookmarks();
