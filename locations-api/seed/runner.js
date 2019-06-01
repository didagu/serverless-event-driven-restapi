// file: ./seed/runner.js

require('dotenv/config')

const { LocationSeeder } = require('./location.seeder')
const { DynamoDB } = require('aws-sdk')
const { DocumentClient } = DynamoDB
const locationsData = require('./locations-test-data.json')

const dynamo = new DynamoDB({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const docClient = new DocumentClient({ service: dynamo })
const locationSeeder = new LocationSeeder(dynamo, docClient)

const log = (...msgs) => console.log('>>', msgs)

const seedLocations = async () => {
  log(`Checking if 'locations' table exists`)

  const exists = await locationSeeder.hasTable()

  if (exists) {
    log(`Table 'locations' exists, deleting`)
    await locationSeeder.deleteTable()
    log(`Table 'locations' deleted`)
  }

  log(`Creating 'locations' table`)
  await locationSeeder.createTable()

  log(`Seeding 'locations' table`)
  await locationSeeder.seed(locationsData)
}

seedLocations()
  .then(() => log('Done!'))
  .catch(err => console.log('error', err))
