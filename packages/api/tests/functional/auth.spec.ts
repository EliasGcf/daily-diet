import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import UserFactory from 'Database/factories/UserFactory'

test.group('Auth', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to authenticate', async ({ client }) => {
    const user = await UserFactory.make()

    await UserFactory.merge({ email: user.email, password: user.password }).create()

    const response = await client.post('/login').json({
      email: user.email,
      password: user.password,
    })

    response.assertStatus(200)
  })

  test('should not be able to authenticate with invalid credentials', async ({
    client,
  }) => {
    const user = await UserFactory.make()

    const response = await client.post('/login').json({
      email: user.email,
      password: user.password,
    })

    response.assertStatus(401)
  })

  test('should be able to logout', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/logout').loginAs(user)

    response.assertStatus(200)
  })
})
