import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'

import MealFactory from 'Database/factories/MealFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('meals', () => MealFactory)
  .build()
