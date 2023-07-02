import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import CreateUserService from 'App/Services/CreateUserService'

import UserFactory from 'Database/factories/UserFactory'

test.group('Create user', (group) => {
  const sut = new CreateUserService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create an user', async ({ assert }) => {
    const fakeUser = await UserFactory.make()

    const user = await sut.execute({
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
    })

    assert.isTrue(user.$isPersisted)
  })

  test('should not be able to create an user with an existing email', async ({
    assert,
  }) => {
    const user = await UserFactory.create()

    assert.rejects(async () => {
      await sut.execute({
        name: 'John Doe',
        email: user.email,
        password: '123456',
      })
    })
  })
})
