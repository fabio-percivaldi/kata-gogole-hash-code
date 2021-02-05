'use strict'

const tap = require('tap')
const fs = require('fs')
const getDeliveryManager = require('../index')

tap.test('index.js', t => {
  t.test('File1', async t => {
    const file = fs.readFileSync('./tests/fixtures/a_example', 'utf8')

    const deliveryManager = await getDeliveryManager(file)

    t.test('firstLine', assert => {
      assert.equal(deliveryManager.pizzaCount, 5)
      assert.equal(deliveryManager.oneTeamCount, 1)
      assert.equal(deliveryManager.twoTeamCount, 2)
      assert.equal(deliveryManager.threeTeamCount, 1)
      assert.end()
    })

    t.test('othersLine', assert => {
      assert.equal(deliveryManager.pizzas.length, 5)
      assert.equal(deliveryManager.pizzas[0].ingredientsCount, 3)
      assert.equal(deliveryManager.pizzas[0].ingredients[0], 'onion')
      assert.equal(deliveryManager.pizzas[0].ingredients[1], 'pepper')
      assert.equal(deliveryManager.pizzas[0].ingredients[2], 'olive')
      assert.end()
    })

    t.end()
  })
  t.end()
})
