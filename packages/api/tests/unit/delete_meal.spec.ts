import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import Meal from 'App/Models/Meal'

import DeleteMealService from 'App/Services/DeleteMealService'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Delete meal', (group) => {
  const sut = new DeleteMealService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to delete a meal', async ({ assert }) => {
    const meal = await MealFactory.with('user', 1).create()

    await sut.execute({ mealId: meal.id, userId: meal.user.id })

    const mealExists = await Meal.find(meal.id)

    assert.isNull(mealExists)
  })

  test('should not be able to delete a meal with non-existent id', async ({ assert }) => {
    const user = await UserFactory.create()

    assert.rejects(() =>
      sut.execute({
        mealId: 'invalid-meal-id',
        userId: user.id,
      }),
    )
  })

  test('should not be able to delete a meal from another user', async ({ assert }) => {
    const meal = await MealFactory.create()

    assert.rejects(() =>
      sut.execute({
        mealId: meal.id,
        userId: 'invalid-user-id',
      }),
    )
  })
})
