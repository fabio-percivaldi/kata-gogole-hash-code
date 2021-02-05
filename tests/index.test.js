'use strict'

const tap = require('tap')
const fs = require('fs')
const getDeliveryManager = require('../index')

tap.test('index.js', t => {
  t.test('File1', async assert => {
    const file = fs.readFileSync('./tests/fixtures/a_example')

    const deliveryManager = getDeliveryManager(file)

    assert.equal(deliveryManager.pizzaCount, 5)
    assert.equal(deliveryManager.oneTeamCount, 1)
    assert.equal(deliveryManager.twoTeamCount, 2)
    assert.equal(deliveryManager.threeTeamCount, 1)

    assert.equal(deliveryManager.pizzas.length, 5)
    assert.equal(deliveryManager.pizzas[0].ingredientsCount, 3)
    assert.equal(deliveryManager.pizzas[0].ingredients[0], 'onion')
    assert.equal(deliveryManager.pizzas[0].ingredients[0], 'pepper')
    assert.equal(deliveryManager.pizzas[0].ingredients[0], 'olive')
    assert.end()
  })
  t.end()
})
