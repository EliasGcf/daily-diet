import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import GetUserMealsMetricsService from 'App/Services/GetUserMealsMetricsService'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Get user meals metrics', (group) => {
  const sut = new GetUserMealsMetricsService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should not be able to get any metrics if the user does not exists', async ({
    assert,
  }) => {
    assert.rejects(() => sut.execute({ userId: 'non-existing-id' }))
  })

  test('should be able to get the total of meals', async ({ assert }) => {
    const user = await UserFactory.with('meals', 2).create()

    const result = await sut.execute({ userId: user.id })

    assert.equal(result.total, 2)
  })

  test('should be able to get the total of on diet meals', async ({ assert }) => {
    const user = await UserFactory.merge({})
      .with('meals', 3, (meal) => meal.merge({ isOnDiet: true }))
      .with('meals', 2, (meal) => meal.merge({ isOnDiet: false }))
      .create()

    const result = await sut.execute({ userId: user.id })

    assert.equal(result.onDiet, 3)
  })

  test('should be able to get the total of off diet meals', async ({ assert }) => {
    const user = await UserFactory.merge({})
      .with('meals', 3, (meal) => meal.merge({ isOnDiet: true }))
      .with('meals', 2, (meal) => meal.merge({ isOnDiet: false }))
      .create()

    const result = await sut.execute({ userId: user.id })

    assert.equal(result.offDiet, 2)
  })

  test('should be able to get the best sequence of on diet meals', async ({ assert }) => {
    const user = await UserFactory.create()

    await MealFactory.merge({ isOnDiet: true, userId: user.id }).createMany(2)
    await MealFactory.merge({ isOnDiet: false, userId: user.id }).create()
    await MealFactory.merge({ isOnDiet: true, userId: user.id }).create()

    const result = await sut.execute({ userId: user.id })

    assert.equal(result.bestOnDietSequence, 2)
  })
})
