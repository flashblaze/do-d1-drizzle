import { Hono } from 'hono'
import { Env } from './types'
import { createDB } from './db'
import { userTable } from './db/schema'
import { SampleObject } from './sample-durable'

const app = new Hono<Env>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
}).get('/migrate', async (c) => {
  const durableObject = c.env.DO_D1_DO.idFromName('do-d1-drizzle');
  const durableObjectStub = c.env.DO_D1_DO.get(durableObject);
  await durableObjectStub.migrate();
  return c.json({
    message: 'Migrated!',
  });
}).get('/create', async (c) => {
  const db = createDB(c.env)
  const dbUser = await db.insert(userTable).values({ name: `db-user-${new Date().toISOString()}` }).returning().get()

  const durableObject = c.env.DO_D1_DO.idFromName('do-d1-drizzle')
  const durableObjectStub = c.env.DO_D1_DO.get(durableObject)
  const doUser = await durableObjectStub.insert({ name: `do-user-${new Date().toISOString()}` })

  return c.json({ dbUser, doUser })
}).get('/users', async (c) => {
  const db = createDB(c.env)
  const dbUsers = await db.select().from(userTable)

  const durableObject = c.env.DO_D1_DO.idFromName('do-d1-drizzle');
  const durableObjectStub = c.env.DO_D1_DO.get(durableObject);
  const doUsers = await durableObjectStub.getUsers()

  return c.json({ dbUsers, doUsers })
})

export { SampleObject }

export default app
