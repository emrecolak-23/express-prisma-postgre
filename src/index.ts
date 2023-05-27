// Import Dependencies
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import * as dotenv from 'dotenv'

dotenv.config()

import { app } from './app'

const start = async () => {

  if (!process.env.API_PORT) {
    throw new Error('API_PORT must be defined')
  }

  const API_PORT = process.env.API_PORT

  app.listen(API_PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`),
  )

}

start()