import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import User from 'App/Models/User'

import CreateUserService from 'App/Services/CreateUserService'

test.group('Create user', (group) => {
  const sut = new CreateUserService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create an user', async ({ assert }) => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@example.com',
    })

    assert.isTrue(user.$isPersisted)
  })

  test('should not be able to create an user with an existing email', async ({ assert }) => {
    await User.create({
      name: 'John Doe',
      email: 'johnDoe@example.com',
    })

    assert.rejects(async () => {
      await sut.execute({
        name: 'John Doe',
        email: 'johnDoe@example.com',
      })
    })
  })
})
