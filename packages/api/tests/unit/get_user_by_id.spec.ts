import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import GetUserByIdService from 'App/Services/GetUserByIdService'

import UserFactory from 'Database/factories/UserFactory'

test.group('Get user by id', (group) => {
  const sut = new GetUserByIdService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to get an user by id', async ({ assert }) => {
    const user = await UserFactory.create()

    const userFound = await sut.execute(user.id)

    assert.equal(userFound.id, user.id)
  })

  test('should not be able to get an user by id if it does not exist', async ({
    assert,
  }) => {
    assert.rejects(async () => {
      await sut.execute('non-existing-id')
    })
  })
})
