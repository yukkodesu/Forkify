import { API_URL, TIMEOUT_SEC } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {}
}

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const loadRecipe = async function (id) {
    try {
        const data = await Promise.race([getJSON(`${API_URL}/${id}`), timeout(TIMEOUT_SEC)]);
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch (err) {
        console.error(`${err} 💣💣💣💣`);
    }
}