import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import UpdateUserService from 'App/Services/UpdateUserService'

import UserFactory from 'Database/factories/UserFactory'

test.group('Update user', (group) => {
  const sut = new UpdateUserService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to update a user', async ({ assert }) => {
    const user = await UserFactory.create()
    const fakeUser = await UserFactory.make()

    const updatedUser = await sut.execute({
      id: user.id,
      userId: user.id,
      name: fakeUser.name,
    })

    assert.equal(updatedUser.name, fakeUser.name)
  })

  test('should not be able to update a user with non-existent id', async ({ assert }) => {
    const fakeUser = await UserFactory.make()

    assert.rejects(() =>
      sut.execute({
        id: 'invalid-user-id',
        userId: 'invalid-user-id',
        name: fakeUser.name,
      }),
    )
  })

  test('should not be able to update a user from another user', async ({ assert }) => {
    const user = await UserFactory.create()
    const fakeUser = await UserFactory.make()

    assert.rejects(() =>
      sut.execute({
        id: user.id,
        userId: 'invalid-user-id',
        name: fakeUser.name,
      }),
    )
  })

  test('should be able to update user password', async ({ assert }) => {
    const user = await UserFactory.merge({ password: '123456' }).create()
    const fakeUser = await UserFactory.make()

    const updatedUser = await sut.execute({
      id: user.id,
      userId: user.id,
      name: fakeUser.name,
      currentPassword: '123456',
      newPassword: '12345678',
    })

    assert.isTrue(await updatedUser.verifyPassword('12345678'))
  })

  test('should not be able to update user password with incorrect current password', async ({
    assert,
  }) => {
    const user = await UserFactory.merge({ password: '123456' }).create()
    const fakeUser = await UserFactory.make()

    assert.rejects(() =>
      sut.execute({
        id: user.id,
        userId: user.id,
        name: fakeUser.name,
        currentPassword: 'wrong-password',
        newPassword: '12345678',
      }),
    )
  })
})
