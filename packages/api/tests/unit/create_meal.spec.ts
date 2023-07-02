import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import CreateMealService from 'App/Services/CreateMealService'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Create meal', (group) => {
  const sut = new CreateMealService()

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create a meal', async ({ assert }) => {
    const user = await UserFactory.create()
    const fakeMeal = await MealFactory.merge({ userId: user.id }).make()

    const meal = await sut.execute({
      name: fakeMeal.name,
      description: fakeMeal.description,
      isOnDiet: fakeMeal.isOnDiet,
      date: fakeMeal.date.toJSDate()!,
      userId: user.id,
    })

    assert.isTrue(meal.$isPersisted)
  })

  test('should not be able to create a meal with an invalid user id', async ({
    assert,
  }) => {
    const fakeMeal = await MealFactory.make()

    assert.rejects(() =>
      sut.execute({
        name: fakeMeal.name,
        description: fakeMeal.description,
        isOnDiet: fakeMeal.isOnDiet,
        date: fakeMeal.date.toJSDate()!,
        userId: fakeMeal.userId,
      }),
    )
  })
})
