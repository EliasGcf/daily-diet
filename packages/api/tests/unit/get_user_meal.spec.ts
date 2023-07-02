import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import GetUserMealService from 'App/Services/GetUserMealService'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Get user meal', (group) => {
  const sut = new GetUserMealService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to get an user meal by id', async ({ assert }) => {
    const meal = await MealFactory.with('user').create()

    const mealFound = await sut.execute({
      mealId: meal.id,
      userId: meal.user.id,
    })

    assert.equal(mealFound.id, meal.id)
  })

  test('should not be able to get an meal if the user does not exists', async ({
    assert,
  }) => {
    const meal = await MealFactory.create()

    assert.rejects(async () =>
      sut.execute({ mealId: meal.id, userId: 'non-existing-id' }),
    )
  })

  test('should not be able to get an meal if it does not exist', async ({ assert }) => {
    const user = await UserFactory.create()

    assert.rejects(async () =>
      sut.execute({ mealId: 'non-existing-id', userId: user.id }),
    )
  })

  test('should not be able to get an meal if does not belong to the user', async ({
    assert,
  }) => {
    const user = await UserFactory.create()
    const meal = await MealFactory.with('user').create()

    assert.rejects(async () => sut.execute({ mealId: meal.id, userId: user.id }))
  })
})
