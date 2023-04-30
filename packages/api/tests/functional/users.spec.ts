import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('UsersController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('store', async ({ client }) => {
    const response = await client.post('/users').fields({
      name: 'John Doe',
      email: 'johnDoe@example.com',
    })

    response.assertStatus(201)
    response.hasBody()
  })

  test('index', async ({ client }) => {
    const response = await client.get('/users')

    console.log(response.body())
    response.assertStatus(200)
  })
})
