// file : event/runner.js

require('dotenv/config')

const SDK = require('@serverless/event-gateway-sdk')

// initialize event gateway
const eventGateway = new SDK({
  url: process.env.EVENT_GATEWAY_URL
});

const log = (...msgs) => console.log('>>', msgs)

const customEventType = 'file.uploaded'
const functionId = 'upload'

const createEventTypeAndRegisterFunction = async () => {

  let eventTypes = await eventGateway.listEventTypes()
  if(eventTypes.length !== 0) {
    let exists = eventTypes.some((element) => {
      return element.name === customEventType
    })
    exists ? log(`Event type "${customEventType}" already exists`) : createEventType(customEventType)
  } else {
    createEventType(customEventType)
  }

  let registeredfunctions = await eventGateway.listFunctions()
  if(registeredfunctions.length !== 0) {
    let exists = registeredfunctions.some((element) => {
      return element.functionId === functionId
    })
    exists ? log(`Function with functionId "${functionId}" already exists`) : registerFunction(functionId)
  } else {
    registerFunction(functionId)
  }
}

createEventTypeAndRegisterFunction()
  .then(() => log('Done!'))
  .catch(err => console.log('error', err))

const createEventType = name => {
  log(`Creating event type "${name}" in event gateway`)
  eventGateway.createEventType({
    name
  })
  .then(json => console.log(json))
  .catch(err => console.log('event type creation error:', err))
}

const registerFunction = functionId => {
  log(`Registering "${functionId}" function to event gateway`)
  eventGateway.createFunction({
      functionId,
      type:'http',
      provider: {
          url: process.env.APPLICATION_URL + '/' + functionId
      }
  })
  .then(json => console.log(json))
  .catch(err => console.log('function registration error:', err))
}
