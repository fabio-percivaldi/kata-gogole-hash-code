'use strict'


const getDeliveryManager = async(file) => {
  const stringifiedFile = file.toString()
  const lines = stringifiedFile.split('\n')
  const deliveryManager = lines.reduce((acc, curr, index) => {
    const data = {}

    const lineValues = curr.split(' ')

    if (index === 0) {
      const [pizzaCount, oneTeamCount, twoTeamCount, threeTeamCount] = lineValues
      data.pizzaCount = parseInt(pizzaCount)
      data.oneTeamCount = parseInt(oneTeamCount)
      data.twoTeamCount = parseInt(twoTeamCount)
      data.threeTeamCount = parseInt(threeTeamCount)
    }

    return {
      ...acc,
      ...data,
    }
  }, {})
  return deliveryManager
}

module.exports = getDeliveryManager
