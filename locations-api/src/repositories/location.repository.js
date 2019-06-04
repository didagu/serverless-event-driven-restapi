// file: src/repositories/location.respository.js

class LocationRepository {
  constructor (documentClient) {
    this._documentClient = documentClient
  }

  get _baseParams () {
    return {
      TableName: process.env.LOCATIONS_TABLE
    }
  }

  _createParamsObject (additionalArgs = {}) {
    return Object.assign({}, this._baseParams, additionalArgs)
  }

  async list () {
    let params = this._createParamsObject()
    const response = await this._documentClient.scan(params).promise()
    return response
  }

  async get (location_name) {
    let params = this._createParamsObject({ Key: { location_name } })
    const response = await this._documentClient.get(params).promise()
    return response
  }

  async put (location) {
    let params = this._createParamsObject({ Item: location })
    await this._documentClient.put(params).promise()
    return location
  }
}

exports.LocationRepository = LocationRepository
