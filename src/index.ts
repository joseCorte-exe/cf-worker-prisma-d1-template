import { PrismaD1 } from '@prisma/adapter-d1'
import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma'
import { initializePrisma } from './database/prisma'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', async (c, next) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  initializePrisma(prisma)
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Assembleo Core MS!')
})

export default app
