/* eslint-disable no-param-reassign */
'use strict'

const getPizzaScore = (delirevedIngredients, pizza) => {
  pizza.ingredients.reduce((acc, ingredient) => {
    return acc + (delirevedIngredients[ingredient] ? 0 : 1)
  }, 0)
}

// Viene chiamata per assegnare le pizze ai team
// pizzaCount: numero di pizze da fornire nel set
const pickPizza = (delirevedIngredients, availablePizzas) => {
  // Ordino le pizze dando uno score in base al numerodi ingredienti già messi in ogni ordine
  availablePizzas = availablePizzas.sort((pa, pb) => {
    return getPizzaScore(delirevedIngredients, pa) < getPizzaScore(delirevedIngredients, pb)
  })
  // Agggiungo al set le pizze necessarie
  availablePizzas.slice(0, 1)
  return availablePizzas.shift()
}

module.exports = pickPizza
