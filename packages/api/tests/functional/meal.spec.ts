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
})
