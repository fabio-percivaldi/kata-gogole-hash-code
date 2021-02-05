'use strict'


const getDeliveryManager = async(file) => {
  const stringifiedFile = file.toString()
  const lines = stringifiedFile.split('\n')
  const deliveryManager = lines.reduce((acc, curr, index) => {
    const data = { }
    const pizzas = []
    const lineValues = curr.split(' ')

    if (curr.trim() === '') {
      return acc
    }
    if (index === 0) {
      const [pizzaCount, oneTeamCount, twoTeamCount, threeTeamCount] = lineValues
      data.pizzaCount = parseInt(pizzaCount)
      data.oneTeamCount = parseInt(oneTeamCount)
      data.twoTeamCount = parseInt(twoTeamCount)
      data.threeTeamCount = parseInt(threeTeamCount)
    } else {
      const pizza = {
        ingredients: [],
      }
      const [ingredientsCountString] = lineValues
      pizza.ingredientsCount = parseInt(ingredientsCountString)
      for (let i = 1; i <= pizza.ingredientsCount; i += 1) {
        pizza.ingredients.push(lineValues[i])
      }
      pizzas.push(pizza)
      acc.pizzas = acc.pizzas.concat(pizzas)
    }

    return {
      ...acc,
      ...data,
    }
  }, {
    pizzas: [],
  })
  return deliveryManager
}

module.exports = getDeliveryManager
