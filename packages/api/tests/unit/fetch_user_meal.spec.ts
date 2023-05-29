import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import FetchUserMealsService from 'App/Services/FetchUserMealsService'

import UserFactory from 'Database/factories/UserFactory'

test.group('Fetch user meals', (group) => {
  const sut = new FetchUserMealsService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to fetch user meals', async ({ assert }) => {
    const user = await UserFactory.with('meals', 23).create()

    const meals = await sut.execute({
      userId: user.id,
      page: 1,
      perPage: 10,
    })

    assert.lengthOf(meals, 10)
    assert.equal(meals.total, 23)
    assert.equal(meals.lastPage, 3)
    assert.containsSubset(meals, [{ userId: user.id }])
  })
})
