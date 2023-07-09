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

    const response = await client.post('/meals').json(fakeMeal.serialize()).loginAs(user)

    response.assertStatus(201)
  })

  test('should be able to get a meal', async ({ client }) => {
    const meal = await MealFactory.with('user').create()

    const response = await client.get(`/meals/${meal.id}`).loginAs(meal.user)

    response.assertStatus(200)
  })

  test('should be able to update a meal', async ({ client }) => {
    const meal = await MealFactory.with('user', 1).create()

    const response = await client.put(`/meals/${meal.id}`).loginAs(meal.user).json({
      name: 'New name',
      description: 'New description',
      isOnDiet: false,
      date: meal.date.toISO()!,
    })

    response.assertStatus(200)
  })

  test('should be able to delete a meal', async ({ client }) => {
    const meal = await MealFactory.with('user', 1).create()

    const response = await client.delete(`/meals/${meal.id}`).loginAs(meal.user)

    response.assertStatus(204)
  })

  test('should be able to get metrics', async ({ client, assert }) => {
    const user = await UserFactory.merge({}).create()

    await MealFactory.merge({ isOnDiet: true, userId: user.id }).createMany(2)
    await MealFactory.merge({ isOnDiet: false, userId: user.id }).createMany(3)

    const response = await client.get('/meals/metrics').loginAs(user)

    response.assertStatus(200)

    assert.containsSubset(response.body(), {
      total: 5,
      onDiet: 2,
      offDiet: 3,
      bestOnDietSequence: 2,
    })
  })
})
