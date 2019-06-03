// file : event/runner.js

require('dotenv/config')

const SDK = require('@serverless/event-gateway-sdk')

// initialize event gateway
const eventGateway = new SDK({
  url: process.env.EVENT_GATEWAY_URL
});

const log = (...msgs) => console.log('>>', msgs)

const functionId = 'add'
const eventtype = 'file.uploaded'

const registerAndListenToEvent = async () => {

    let registeredfunctions = await eventGateway.listFunctions()
    if(registeredfunctions.length !== 0) {
        let exists = registeredfunctions.some((element) => {
            return element.functionId === functionId
        })
        exists ? log(`Function with functionId "${functionId}" already exists`) : registerFunction(functionId)
    } else {
        registerFunction(functionId)
    }

    let subscriptions = await eventGateway.listSubscriptions()
    if(subscriptions.length !== 0) {
        let exists = subscriptions.some((element) => {
            return element.functionId === functionId
        })
        exists ? log(`subscription with functionId "${functionId}" already exists`) : subscribeToEvent(eventtype, functionId)
    } else {
        subscribeToEvent(eventtype, functionId)
    }

    

}

registerAndListenToEvent()
  .then(() => log('Done!'))
  .catch(err => console.log('error', err))

const registerFunction = functionId => {
    log(`Registering "${functionId}" function to event gateway`)
    eventGateway.createFunction({
        functionId,
        type:'http',
        provider: {
            url: process.env.APPLICATION_URL + '/locations/' + functionId 
        }
    })
    .then(json => console.log(json))
    .catch(err => console.log('function registration error:', err))
}

const subscribeToEvent = (eventtype,functionId) => {
    log(`Subscribing "${functionId}" to "${eventtype}" event in event gateway`)
    eventGateway.subscribe({
        type: 'async',
        eventtype,
        functionId
    })
    .then(json => console.log(json))
    .catch(err => console.log('event subscription error:', err))
}