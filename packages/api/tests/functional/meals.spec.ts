import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

import MealFactory from 'Database/factories/MealFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('MealsController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should be able to create a meal', async ({ client }) => {
    const user = await UserFactory.create()
    const fakeMeal = await MealFactory.make()

    const response = await client.post('/meals').fields(fakeMeal.serialize()).loginAs(user)

    response.assertStatus(201)
  })

  test('should be able to delete a meal', async ({ client }) => {
    const meal = await MealFactory.with('user', 1).create()

    const response = await client.delete(`/meals/${meal.id}`).loginAs(meal.user)

    response.assertStatus(204)
  })
})