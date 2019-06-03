// file: src/handlers/locations/get.js

require('dotenv/config')

const { LocationRepository } = require('../../repositories/location.repository')
const { withStatusCode } = require('../../utils/response.util')
const { DocClientWithEnvVar } = require('../../dynamodb.factory')
const haversine = require('haversine-distance')

const docClient = DocClientWithEnvVar(process.env)
const repository = new LocationRepository(docClient)
const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

const officeCoordinates = { lat: 52.502931, lng: 13.408249 }

exports.handler = async (event) => {
  const { id } = event.pathParameters
  const location = await repository.get(id)

  if (!location) {
    return notFound()
  }

  let locationCoordinates = { lat: location.Item.latitude,lon: location.Item.longitude}
  
  //Calculated distance to the office in Km
  location.Item.caluclatedDistanceToOffice = haversine(officeCoordinates, locationCoordinates)

  return ok(location)
}
