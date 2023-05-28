import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import UserFactory from 'Database/factories/UserFactory'

test.group('UsersController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create an user', async ({ client }) => {
    const response = await client.post('/users').fields({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    })

    response.assertStatus(201)
    response.hasBody()
  })

  test('should be able to get the authenticated user', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.get('/me').loginAs(user)

    response.assertStatus(200)

    assert.notProperty(response.body(), 'password')
  })
})
