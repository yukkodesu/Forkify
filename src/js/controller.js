import * as model from './model.js';
import recipeView from './view/recipeView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipes = async function () {
  try {
    // 1) Loading recipe
    if (window.location.hash == '') return;
    const id = window.location.hash.slice(1);
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err)
  }
}

// controlRecipes();
const ev = ['hashchange', 'load'];
ev.forEach(ev => window.addEventListener(ev, controlRecipes));
