import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('UsersController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create an user', async ({ client }) => {
    const response = await client.post('/users').fields({
      name: 'John Doe',
      email: 'johnDoe@example.com',
    })

    response.assertStatus(201)
    response.hasBody()
  })

  test('should be able to list users', async ({ client }) => {
    const response = await client.get('/users')

    response.assertStatus(200)
  })
})
