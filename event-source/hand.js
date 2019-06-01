'use strict';

require('dotenv/config');

const multipart = require('aws-lambda-multipart-parser')

// Construct your client
const SDK = require('@serverless/event-gateway-sdk');

console.log(process.env.EVENT_GATEWAY_URL)

// initialize event gateway
const eventGateway = new SDK({
    url: process.env.EVENT_GATEWAY_URL,
    // configurationUrl: process.env.EVENT_GATEWAY_CONFIG_URL
})



module.exports.fileUpload = async (event) => {

    const uploadedFile = multipart.parse(event, false)

    if (uploadedFile.file.contentType !== 'application/json') {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "The uploaded file must be in JSON format"
            })
        }
    }

    const {
        latitude,
        longitude
    } = JSON.parse(uploadedFile.file.content)
    const fileName = uploadedFile.file.filename
    const data = {
        "id": "1",
        "latitude": latitude,
        "longitude": longitude,
        "location_name": fileName.substr(0, fileName.lastIndexOf('.'))
    }


    // Emit your event
    eventGateway
        .emit({
            eventID: '1',
            eventType: 'file.uploaded',
            cloudEventsVersion: '0.1',
            // source: 'urn:event:from:myapi/resourse/123',
            contentType: 'application/json',
            data: data
        })
        // If a sync subscription, then do something with the response.
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log('error from event emittion:', err))

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File uploaded successfully",
            data: data
        })
    }
};
