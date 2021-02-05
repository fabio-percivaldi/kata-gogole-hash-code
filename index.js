'use strict'

const fs = require('fs')
const pickPizza = require('./pickPizza')
const readline = require('readline')

const deliverPizzaForTeam = (teamCount, availablePizzas) => {
  const order = []
  for (let j = 0; j < teamCount; j++) {
    const orderIngrMap = {}
    if (availablePizzas.length > 0 && availablePizzas.length >= (teamCount - order.length)) {
      const pizza = pickPizza(orderIngrMap, availablePizzas)
      pizza.ingredients.forEach(ingr => {
        orderIngrMap[ingr] = true
      })
      order.push(pizza)
    }
  }
  return order
}

const createOutputFile = (orders, fileName) => {
  const teamServedCount = orders.length
  const fileOutputContent = orders.reduce((acc, order) => {
    const { teamMembersCount, pizzas } = order
    const pizzaIds = pizzas.map(pizza => pizza.id).join(' ')
    return `${acc}\n${teamMembersCount} ${pizzaIds}`
  }, `${teamServedCount}`)

  fs.writeFileSync(fileName || 'subFile.out', fileOutputContent)
}

const getDeliveryManager = (path, output) => {
  const filestream = fs.createReadStream(path)
  const rl = readline.createInterface(filestream)
  let count = 0
  const deliveryManager = {
    pizzas: [],
  }

  rl.on('line', (line) => {
    // const stringifiedFile = file.toString()
    const lineValues = line.split(' ')
    if (count === 0) {
      const [pizzaCount, twoTeamCount, threeTeamCount, fourTeamCount] = lineValues
      deliveryManager.pizzaCount = parseInt(pizzaCount)
      deliveryManager.twoTeamCount = parseInt(twoTeamCount)
      deliveryManager.threeTeamCount = parseInt(threeTeamCount)
      deliveryManager.fourTeamCount = parseInt(fourTeamCount)
    } else {
      const pizza = {
        id: count - 1,
        ingredients: [],
      }
      const [ingredientsCountString] = lineValues
      pizza.ingredientsCount = parseInt(ingredientsCountString)
      for (let i = 1; i <= pizza.ingredientsCount; i += 1) {
        pizza.ingredients.push(lineValues[i])
      }
      deliveryManager.pizzas.push(pizza)
    }
    count += 1
  })

  rl.on('close', () => {
    // Ordino le pizze per numero di ingredienti desc (questo in lettuta del file ed una volta sola)
    const orders = []
    const { twoTeamCount, threeTeamCount, fourTeamCount, pizzas } = deliveryManager
    let availablePizzas = JSON.parse(JSON.stringify(pizzas))

    availablePizzas = availablePizzas.sort((pa, pb) => {
      return pa.ingredientsCount < pb.ingredientsCount
    })

    for (let i = 0; i < twoTeamCount; i++) {
      const order = {
        pizzas: deliverPizzaForTeam(2, availablePizzas),
        teamMembersCount: 2,
      }
      orders.push(order)
    }
    for (let i = 0; i < threeTeamCount; i++) {
      const order = {
        pizzas: deliverPizzaForTeam(3, availablePizzas),
        teamMembersCount: 3,
      }
      orders.push(order)
    }
    for (let i = 0; i < fourTeamCount; i++) {
      const order = {
        pizzas: deliverPizzaForTeam(4, availablePizzas),
        teamMembersCount: 4,
      }
      orders.push(order)
    }

    const orderedOrders = orders.filter(order => order.pizzas.length > 0)
    createOutputFile(orderedOrders, output)
  })
}

module.exports = { getDeliveryManager, createOutputFile }
