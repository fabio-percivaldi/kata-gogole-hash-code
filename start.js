/* eslint-disable max-len */
/* eslint-disable camelcase */
'use strict'

const { getDeliveryManager } = require('./index')

// const inputFiles = ['a_example', 'b_little_bit_of_everything.in', 'c_many_ingredients.in', 'd_many_pizzas.in', 'e_many_teams.in']
const inputFiles = ['a_example', 'b_little_bit_of_everything.in', 'c_many_ingredients.in']
inputFiles.forEach(file => getDeliveryManager(`./tests/fixtures/input/${file}`, `./out/${file}`))
