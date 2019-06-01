'use strict';

require('dotenv/config');

const multipart = require('aws-lambda-multipart-parser')

const fdk = require('@serverless/fdk');

// set event gateway urls
const EVENT_GATEWAY_URL = 'http://localhost:4000';
const EVENT_GATEWAY_CONFIG_URL = 'http://localhost:4001';

// initialize event gateway
const eventGateway = fdk.eventGateway({
  url: EVENT_GATEWAY_URL,
  configurationUrl: EVENT_GATEWAY_CONFIG_URL
});

module.exports.fileUpload = async (event) => {

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
    "id": "1",
    "latitude": latitude,
    "longitude": longitude,
    "location_name": fileName.substr(0, fileName.lastIndexOf('.'))
  }

  // Emit your event
  // eventGateway
  //   .emit({
  //     event: 'file.uploaded',
  //     data: data
  //   })
  //   // If a sync subscription, then do something with the response.
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.log('error from event emittion:', err))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "File uploaded successfully",
      data: data
    })
  }
};
