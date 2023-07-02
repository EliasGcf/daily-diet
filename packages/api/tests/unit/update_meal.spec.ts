import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

import UpdateMealService from 'App/Services/UpdateMealService'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Update meal', (group) => {
  const sut = new UpdateMealService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to update a meal', async ({ assert }) => {
    const meal = await MealFactory.with('user', 1).create()

    const fakeMeal = await MealFactory.merge({
      createdAt: DateTime.fromJSDate(new Date()),
    }).make()

    const updatedMeal = await sut.execute({
      id: meal.id,
      userId: meal.user.id,

      name: fakeMeal.name,
      date: fakeMeal.createdAt.toJSDate(),
      description: fakeMeal.description,
      isOnDiet: fakeMeal.isOnDiet,
    })

    assert.equal(updatedMeal.name, fakeMeal.name)
    assert.equal(updatedMeal.description, fakeMeal.description)
    assert.equal(updatedMeal.isOnDiet, fakeMeal.isOnDiet)
  })

  test('should not be able to update a meal with non-existent id', async ({ assert }) => {
    const user = await UserFactory.create()
    const fakeMeal = await MealFactory.merge({
      createdAt: DateTime.fromJSDate(new Date()),
    }).make()

    assert.rejects(() =>
      sut.execute({
        id: 'invalid-meal-id',
        userId: user.id,

        name: fakeMeal.name,
        date: fakeMeal.createdAt.toJSDate(),
        description: fakeMeal.description,
        isOnDiet: fakeMeal.isOnDiet,
      }),
    )
  })

  test('should not be able to update a meal from another user', async ({ assert }) => {
    const meal = await MealFactory.create()
    const fakeMeal = await MealFactory.merge({
      createdAt: DateTime.fromJSDate(new Date()),
    }).make()

    assert.rejects(() =>
      sut.execute({
        id: meal.id,
        userId: 'invalid-user-id',

        name: fakeMeal.name,
        date: fakeMeal.createdAt.toJSDate(),
        description: fakeMeal.description,
        isOnDiet: fakeMeal.isOnDiet,
      }),
    )
  })
})
