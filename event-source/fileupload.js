'use strict';

require('dotenv/config');

const multipart = require('aws-lambda-multipart-parser')

const SDK = require('@serverless/event-gateway-sdk')

// initialize event gateway
const eventGateway = new SDK({
  url: process.env.EVENT_GATEWAY_URL
});

exports.handler = async (event) => {

  const uploadedFile = multipart.parse(event, false)

  if(uploadedFile.file.contentType !== 'application/json') {
    return {
      statusCode:400,
      body: JSON.stringify({
        message: "The uploaded file must be in JSON format"
      })
    }
  }

  const {latitude, longitude} = JSON.parse(uploadedFile.file.content)
  const fileName = uploadedFile.file.filename
  const data = {
    "latitude": latitude,
    "longitude": longitude,
    "location_name": fileName.substr(0, fileName.lastIndexOf('.'))
  }

  // Emit file.uploaded event
  let emitEvent = await eventGateway
    .emit({
      eventID: '1',
      eventType: 'file.uploaded',
      cloudEventsVersion: '0.1',
      source: '/event-source',
      contentType: 'application/json',
      data: data
    })

  return {
    statusCode: emitEvent.status,
    body: JSON.stringify({
      message: emitEvent.statusText
    })
  }
}
