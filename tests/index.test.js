/* eslint-disable no-sync */
'use strict'

const tap = require('tap')
const fs = require('fs')
const { getDeliveryManager, createOutputFile } = require('../index')

tap.test('index.js', t => {
  t.test('Example', async t => {
    const file = fs.readFileSync('./tests/fixtures/input/a_example', 'utf8')

    const deliveryManager = getDeliveryManager(file)

    t.test('firstLine', assert => {
      assert.equal(deliveryManager.pizzaCount, 5)
      assert.equal(deliveryManager.twoTeamCount, 1)
      assert.equal(deliveryManager.threeTeamCount, 2)
      assert.equal(deliveryManager.fourTeamCount, 1)
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

    t.test('getOrders', assert => {
      const expectedOrders = fs.readFileSync('./tests/fixtures/output/a_output')
      const actualOrders = deliveryManager.getOrders()
      createOutputFile(actualOrders, 'output-example')
      assert.strictSame(actualOrders, expectedOrders)
      assert.end()
    })
    t.end()
  })
  t.end()
})
