import { PrismaD1 } from '@prisma/adapter-d1'
import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma'
import { initializePrisma } from './database/prisma'


const app = new Hono<HonoType>()

app.use('*', async (c, next) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  initializePrisma(prisma)
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
